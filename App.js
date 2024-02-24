import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import dotenv from 'dotenv';

//Load env vars
dotenv.config();

const loader = new DirectoryLoader("Knowlegde",{".txt": (path) => new TextLoader(path),}); 
  
  const docs = await loader.load();

  console.log(docs.length);
  console.log(docs[0].pageContent.length);
  console.log("-- Docs loaded --");
  
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const splits = await textSplitter.splitDocuments(docs);
  console.log(splits.length);
  console.log(splits[0].pageContent.length);


  const vectorStore = await MemoryVectorStore.fromDocuments(splits, new OpenAIEmbeddings());
  console.log(vectorStore);
  console.log("-- Vectorized context --");
  
  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever();
  const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo-0125", temperature: 0 });
  const prompt =
      ChatPromptTemplate.fromTemplate(`
      
    Answer the following question based only on the provided context:
    <context>
    {context}
    </context>

    You should answer the code question giving an example to the user, use concise responses dont invent sutff
    Question: {input}`);

    const documentChain = await createStuffDocumentsChain({
      llm,
      prompt,
    });
      const retrievalChain = await createRetrievalChain({
        combineDocsChain: documentChain,
        retriever,
      });
    

      const result = await retrievalChain.invoke({
        input: "HIDE OPTIONS 1,2,3,4 OF Q3 IF THE RESPONDENT SELECTED OPTION 2 ON Q2", //TODO / API ENDPOINT FOR MESSAGE
      });
      
      console.log(result.answer);
