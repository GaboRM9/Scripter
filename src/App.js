import express from 'express';
import bodyParser from 'body-parser';
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import dotenv from 'dotenv';

// Load env config
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000; // load port from .env or default to 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Change "*" to a specific origin to be more secure in production
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-api-key");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});



/* API auth handler - Enable on production.
// Middleware to check for API key in request headers
const apiKeyMiddleware = (req, res, next) => {
    const apiKey = req.headers['x-api-key']; // Assuming the API key is passed in the 'x-api-key' header

    if (!apiKey) {
        return res.status(401).json({ error: 'Please provide a valid API Key' });
    }

    if (apiKey !== process.env.API_KEY) { // Assuming your valid API key is stored in an environment variable
        return res.status(403).json({ error: 'Invalid API key' });
    }

    next(); // Proceed to the next middleware/function if the API key is valid
};

*/

// POST route to accept input
app.post('/CreateScripter', async (req, res) => {
    const inputText = req.body.input; // Access the input from the request body

    // Loads documents from knowledge folder
    const loader = new DirectoryLoader("Knowlegde", { ".txt": (path) => new TextLoader(path) });
    const docs = await loader.load();

    //Splits documents
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splits = await textSplitter.splitDocuments(docs);

    //Transforms splits to embeddings and stores on vectorStore
    const vectorStore = await MemoryVectorStore.fromDocuments(splits, new OpenAIEmbeddings());
    const retriever = vectorStore.asRetriever();

    //Create query for model
    const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-0125", temperature: 0 });   //You can replace the modelName with any model of OpenAI, for the best performance use fine-tuned models.
    const prompt = ChatPromptTemplate.fromTemplate(`
        Answer the following question based only on the provided context:
        <context>{context}</context>
        You should answer the code question giving an example to the user, use concise responses dont invent stuff.
        The format of your response is:
        Consice short explanation, no line breaks.
        <code>Code example</code>
        If the question is not related to QuestionProJs logics, kindly remind the user that you can help only on QuestionPro Javascript logics questions at the moment & invite the user to our help center: https://www.questionpro.com/help/ "
        Question: {input}`);

    //RAG    
    const documentChain = await createStuffDocumentsChain({ llm, prompt });
    const retrievalChain = await createRetrievalChain({ combineDocsChain: documentChain, retriever });

    // Invoke the chain with the input from the POST request
    const result = await retrievalChain.invoke({ input: inputText });
    
    // Respond with the result
    res.json({ answer: result.answer });
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the app instance as a default export
export default app;
