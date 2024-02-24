import "cheerio";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { pull } from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { formatDocumentsAsString } from "langchain/util/document";
import { RunnableSequence, RunnablePassthrough, RunnableMap } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";


require('dotenv').config(); // Load environment variables


const loader = new DirectoryLoader("Knowlegde",
    {
        ".txt": (path) => new TextLoader(path),
    }
  );
  
  const docs = await loader.load();
  console.log(docs);
  
  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
  const splits = await textSplitter.splitDocuments(docs);
  const vectorStore = await MemoryVectorStore.fromDocuments(splits, new OpenAIEmbeddings());
  
  // Retrieve and generate using the relevant snippets of the blog.
  const retriever = vectorStore.asRetriever();
  const prompt = await pull<ChatPromptTemplate>("rlm/rag-prompt");
  const llm = new ChatOpenAI({ modelName: "gpt-3.5-turbo", temperature: 0 });
  
  const ragChainFromDocs = RunnableSequence.from([
    RunnablePassthrough.assign({ context: (input) => formatDocumentsAsString(input.context) }),
    prompt,
    llm,
    new StringOutputParser()
  ]);
  
  let ragChainWithSource = new RunnableMap({ steps: { context: retriever, question: new RunnablePassthrough() }})
  ragChainWithSource = ragChainWithSource.assign({ answer: ragChainFromDocs });
  
  await ragChainWithSource.invoke("How can I make a branch logic on QuestionPro")