---
title: "Intro to RAG"
slug: "RAG"
description: "A deep dive into the architecture of Retrieval Augmented Generation."
tags: ["RAG", "Introductory Blogs"]
pinned: true
---


## Introduction
Back in 2022, when OpenAI released ChatGPT, the world was stunned. It could write code, explain complex concepts with human-like clarity, and return answers to day-to-day questions in mere milliseconds. 

But as the initial hype settled, developers and users ran face-first into the structural limitations of Large Language Models (LLMs):

* **Hallucinations:** Confidently generating plausible-sounding lies.
* **Knowledge Cut-offs:** Total ignorance of any data or events after their training date.
* **Context Windows:** Forgetting critical details discussed earlier in a long conversation.
* **Data Leakage:** The privacy risk of sensitive enterprise data being absorbed into public models.

Over time, researchers and AI labs came up with creative workarounds to tackle these flaws. One of the most effective ways the industry solved this was by introducing **Retrieval-Augmented Generation (RAG)**. 

Let's dive deeper into understanding what is **Retrieval-Augmented Generation (RAG)**.
##  Definition
Let's define **RAG** in 2 ways:
**1. Beginner's Introduction:**

> Imagine asking an AI to answer a question without letting it search the internet or look at your company documents. It’s forced to rely entirely on its memory, which can lead to made-up facts. **Retrieval-Augmented Generation (RAG)** is like giving the AI an open-book exam. Instead of just guessing, it searches a trusted knowledge base for the right information first, and then uses those facts to write the perfect answer.

**2. Business Introduction:**

> While Large Language Models (LLMs) are incredibly smart, they have a major flaw: their training data is static, meaning they don’t know about your proprietary company data, recent events, or specialized documents. **RAG** solves this. It is an AI architectural design pattern that connects an LLM to external data sources. By retrieving relevant context before generating a response, RAG ensures the output is factually accurate, grounded in your specific data, and up-to-date.

At its core, **RAG (Retrieval-Augmented Generation)** is a three-step pipeline:
1.  **Retrieve:** The system searches your external documents for information relevant to the user's query.
2.  **Augment:** It attaches these relevant facts to the user’s original prompt, giving the AI the necessary context.
3.  **Generate:** The LLM combines its language skills with your specific data to create an intelligent, grounded response
### Visualizing the Pipeline
To see how these three steps connect in practice, it helps to map them to an architectural diagram: ![RAG Pipeline Flow Architecture](https://miro.medium.com/v2/resize:fit:1400/1*MI9WDgzoOGAH4bOnAwBKEw.jpeg) *Image source: [GOpenAI / Saurabh Bhardwaj](https://blog.gopenai.com/retrieval-augmented-generation-rag-585aa903d6bd)*

 This diagram highlights how data moves through the pipeline in real-time, shifting from a simple "Prompt → LLM" interaction to a structured retrieval loop. Here is exactly what happens behind the scenes when a query is made:
 1. **The Query Phase (Input):** A user asks a question (e.g., *"What were our Q3 sales figures?"*). This prompt acts as the catalyst for the entire architecture. 
 2. **The Retrieval Loop (External Knowledge Base):** Instead of hitting the LLM directly, the prompt goes to a specialized document store or vector database holding your proprietary files. The system looks for semantic overlap, identifying and extracting only the specific text blocks or document chunks that contain relevant facts. 
3. **The Augmentation Phase (The Smart Prompt):** The system packages the raw user question along with those retrieved text chunks. It builds an expanded prompt that essentially instructs the model: *"Answer this question using only the verified context provided below."* 
4. **The Generation Phase (Output):** This expanded, context-rich payload is handed over to the Language Model (LLM). Because the model is looking at the actual source documents, it drops the guesswork and synthesizes a direct, factually accurate response.

## Now let's dive deeper into the architecture:
To build a production-ready RAG application, you have to design two completely separate pipelines. The easiest way to think about them is by using a classic software engineering analogy: **Frontend vs. Backend**.

*   **The Ingestion Pipeline (The "Backend"):** Think of this as your database setup, schema migration, and seed scripts. It runs entirely offline, away from the user's view. Its sole job is to process your raw documentation, turn it into vectors, and store it securely in a vector database so it’s ready to be queried later. 
*   **The Inference Pipeline (The "Frontend"):** This is your live runtime application logic. It sits right in front of the user and triggers only when someone submits a prompt. It manages the real-time flow: taking the user's input, querying the "backend" database for matching facts, merging them together, and serving the final response.

To see exactly how these two pipelines interact, look at this architectural blueprint:

![Data Pipeline for RAG](https://images.prismic.io/amazeeio/Zz3v2q8jQArT1E2w_Data-Pipeline-for-RAG-Graph.jpg?auto=format,compress)
*Image source: [amazee.io](https://www.amazee.io/)*

---
Let's understand every core component shown in the pipeline diagram above, starting with how data is prepared, and ending with how an answer is generated.

### Stage 1: The Ingestion Pipeline

#### 1. Document Loading
The entry point of the pipeline. Document loaders are utility scripts or connectors that ingest raw, unstructured data from various sources such as PDFs, markdown files, Notion pages, or corporate databases, and convert them into a unified text format that the system can process.

#### 2. Text Splitting / Chunking
Large Language Models have finite context windows and operate better on specific, dense information. Text splitting is the algorithmic process of breaking down long documents into smaller, logical segments known as chunks. This ensures that related sentences stay together while keeping the character count manageable.

#### 3. Text Chunks
The discrete, isolated fragments of text produced by the splitter. These are the actual units of information that will be searched against later and eventually injected into the prompt as the LLM's reference context.

#### 4. Embedding Model & Embedding Generation
Computers don't understand words; they understand math. An embedding model is a specialized neural network that takes a text chunk and converts it into an **Embedding** - a high-dimensional vector (a long string of numbers). This vector mathematically represents the deep semantic meaning of the text, allowing the system to know that "king" and "queen" or "generate" and "create" are contextually related.

#### 5. Vector Database & Indexing
Unlike traditional relational databases that query tables using exact keywords, a vector database is built to store and search high-dimensional vectors. **Indexing** is the organization process the database uses to cluster similar vectors close together, enabling sub-millisecond mathematical searches across millions of documents.

---

### Stage 2: The Inference Pipeline

#### 1. User Query
The live natural language input provided by the end-user (e.g., *"How do I configure our API client?"*). This acts as the trigger for the entire real-time pipeline.

#### 2. Query Embedding
Before the system can search the vector database for answers, the user's raw query must speak the exact same mathematical language as the stored text chunks. The system passes the user query through the same embedding model used during ingestion to generate a temporary vector.

#### 3. Similarity Search & Top-K Retrieval
The core search mechanism. The system compares the query embedding against all the document embeddings stored in the vector database using vector math (like cosine similarity). It instantly isolates and extracts the **Top-K Retrieval** matches—meaning the top *K* (usually 3 to 5) text chunks that have the highest contextual relevance to the user's question.

#### 4. Context Injection
The formatting layer. The system takes the retrieved text chunks and programmatically grafts them directly into a pre-defined LLM system prompt alongside the original user query. This builds an updated, context-rich payload that essentially tells the model: *"Use the following verified documents to answer the user's request."*

#### 5. Large Language Model (LLM) & Answer Generation
The final step. The structured, context-injected prompt is passed to the LLM. Because the model has been given the exact source documents right inside its context window, it switches roles from a standard text predictor to a precise synthesizer, outputting a grounded, factually accurate **Answer** free of hallucinations.


## What's Next

That covers the core idea: RAG turns a static, hallucination-prone LLM into a system that answers questions grounded in your actual data — by retrieving relevant context before generating a response.

But this is just the foundation. The real complexity shows up when you try to build RAG that actually works in production - chunking strategies, embedding models, vector DB tradeoffs, retrieval failures. There's a lot more to unpack, and I'll be getting into all of it in the posts ahead.

If you want them in your inbox as they drop, hit the widget in the bottom-right corner and leave your email - takes 5 seconds.

Have a question about something I covered here, or something I didn't? Use the same widget to ask. I read every single one, and your question might become the next post.