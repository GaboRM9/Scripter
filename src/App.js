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
const port = process.env.PORT || 3000; // Use the port from environment variables or default to 3000

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route to accept input
app.post('/process-input', async (req, res) => {
    const inputText = req.body.input; // Access the input from the request body

    // Loads documents on knowledge
    const loader = new DirectoryLoader("Knowlegde", { ".txt": (path) => new TextLoader(path) });
    const docs = await loader.load();

    //Splits documents
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
    const splits = await textSplitter.splitDocuments(docs);

    //Transforms splits to embeddings
    const vectorStore = await MemoryVectorStore.fromDocuments(splits, new OpenAIEmbeddings());
    const retriever = vectorStore.asRetriever();

    //Create query for model
    const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-0125", temperature: 0 });   
    const prompt = ChatPromptTemplate.fromTemplate(`
        Answer the following question based only on the provided context:
        <context>{context}</context>
        You should answer the code question giving an example to the user, use concise responses dont invent stuff.
        The format of your response is:

        Consice short explanation

        <code>Code example</code>
        
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