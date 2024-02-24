# Scripter Documentation

Scripter is custom LLM trained to support users when creating JS logic scripts for surveys on QuestionPro.

Scripter is built using Express.js and integrates various libraries from LangChain for processing natural language queries. It is designed to take input text from a user, process it through a retrieval and generation pipeline, and return a concise, contextually relevant answer.

## Overview

The application leverages Express.js for its web server framework, allowing it to handle HTTP requests efficiently. It uses the body-parser middleware to parse JSON request bodies, facilitating easy access to request data. The core functionality revolves around LangChain, a toolkit for building language models and processing text. This application specifically uses components for text splitting, document loading, vector storage, and integration with OpenAI's models.

## Key Components

- **Express.js:** Web server framework for handling HTTP requests.
- **body-parser:** Middleware for parsing JSON request bodies.
- **LangChain:** A collection of utilities and abstractions for working with language models and text data.
- **RecursiveCharacterTextSplitter:** Splits large text documents into smaller chunks for processing.
- **MemoryVectorStore:** Stores document vectors in memory for efficient retrieval.
- **OpenAIEmbeddings:** Generates embeddings for text using OpenAI models.
- **ChatOpenAI:** Interface for interacting with OpenAI's chat models.
- **ChatPromptTemplate:** Utility for generating prompts for language models.
- **DirectoryLoader and TextLoader:** Load documents from the filesystem for processing.
- **Retrieval and Combine Documents Chains:** Orchestrates the retrieval of relevant documents and their combination to generate responses.

## Setup and Configuration

- **Environment Setup:** Ensure Node.js and npm are installed on your system.
- **Dependencies:** Install all required dependencies by running `npm install`.
- **Environment Variables:** The application uses `.env` for configuration. Ensure you have a `.env` file at the root of your project with the necessary variables, such as `PORT`.

## Running the Application

- **Start the Server:** Run `npm start` or `node <app-file-name>.js` to start the Express server.
- **Accessing the Endpoint:** The application exposes a POST endpoint at `/process-input` where users can send their input text in JSON format (`{ "input": "Your question here" }`).
- **Response:** The application processes the input, retrieves relevant information, and generates a response, which is then returned in JSON format (`{ "answer": "Generated response here" }`).

## Development and Extension

This application is structured for modularity and easy extension. Developers can add new routes, integrate additional LangChain components, or modify the existing processing pipeline to suit different use cases. The application's use of environment variables and external document loading makes it adaptable to various deployment environments and data sources.

## Contributing

Contributions are welcome! Whether it's bug fixes, feature additions, or improvements to the documentation, feel free to fork the repository and submit a pull request.

## License

QuestionPro

https://www.questionpro.com

## Contact and Contributors

gabriel.rodriguez@questionpro.com



