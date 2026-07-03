---
title: "Comparative RAG Lab - Project Overview & Evaluation Dataset"
slug: "RAG"
description: "Before writing a single line of pipeline code, here's how I designed the evaluation dataset that every comparison in this series will be scored against."
tags: ["RAG", "Introductory Blogs", "Comparative RAG Lab", "Project Based Learning" ]
pinned: true
---
## Introduction
We understood the architecture of RAG, but to build a enterprise grade system, there are many more mechanics involved which play a very important role to keep your system reliable and safe, because RAG isn't a single thing you build — it's a series of design decisions you make.

I am building Comparative RAG Lab to showcase the system design of an Enterprise RAG system and the design decisions taken by experimentation rather than guessing if some strategy works. 
## Problem Statement
The problem statement is to build a "Financial Q&A Bot". The system used for answering questions over three public annual reports: **[Apple's FY2025 10-K](https://s2.q4cdn.com/470004039/files/doc_financials/2025/ar/_10-K-2025-As-Filed.pdf), [Tesla's FY2025 10-K](https://www.sec.gov/Archives/edgar/data/1318605/000162828026003952/tsla-20251231.htm#i39f9a11fdbe840828cbaefa2e098ffa8_178), and [Infosys's Integrated Annual Report 2024-25](https://www.infosys.com/investors/reports-filings/annual-report/annual/documents/infosys-ar-25.pdf).**

The reason behind picking these 3 documents are: 
 1. Apple gives us a clean, well-structured SEC filing.
 2. Tesla gives us a messier, narrative-heavy one.
 3. Infosys gives us a completely different regulatory format altogether with a lot of image, tabular, text over image data.

This way I can showcase how am I handling 3 different  documents with different structures. The project is structured around 2 pipelines:

 1. **Ingestion pipeline:** Document Loading & Parsing, Splitting and Chunking, Embedding models & Vectors and Vector stores, **Ingestion Guardrails** _(PII redaction from source, content moderation, data filtering etc.)_
 2. **Inference pipeline:** UI, Client, Query Processing, LLM, Retrieval, **Inference Guardrails** _(input validation, output grounding, escalation etc.)_

For each stage in both pipelines, I will be implementing multiple valid strategies, run them against the same corpus and the same set of test questions, to measure and compare the efficiencies of the strategies using quantifiable metrics for the given data and use case. And not just quality metrics. Every comparison reports both a **quality metric** (is the answer right?) and a **systems metric** (is it viable in production?). 

I want to showcase the tradeoff between a system getting a good evaluation score and a system that works optimally in production with highest efficiency. The series will cover every stage in order: starting with the **evaluation dataset (this post)**, then **document parsing, chunking, vectorization, retrieval, guardrails, observability**, and finally **a best pipeline post** that assembles the winning strategy from each stage and benchmarks it against a naive baseline.

There will also be a **live demo** where you can pick your own combination of strategies and test it yourself.
## STEP - 1: Creating an Evaluation Dataset for the RAG System
The best practice in **AI Evaluation** is to have a **golden dataset for the domain** that the sytem is being built for. This golden dataset helps in debugging and understanding the accuracy and efficiency of the AI system. It is always preferred to build this dataset in the **beginning stage of the developement phase** to test and compare with the system till the end of the phase. 

The traditional method to build this dataset is to sit with the **SMEs (*Subject Matter Experts*)** and discuss the **potential questions** that users can ask and the **expected answers** for them. This way, the dataset has credibility and authenticity. But, as it is not a viable strategy for me, I used AI as my SME. 

> ##  The prompt I used:
Act as a Subject Matter Expert in the domain of Finance. I have attached three public annual reports as source documents: Apple's FY2025 10-K, Tesla's FY2025 10-K, and Infosys's Integrated Annual Report 2024-25.

Your task is to generate a golden evaluation dataset of 25-30 questions that will be used to benchmark a RAG (Retrieval-Augmented Generation) system built on these documents. These questions must span the following 6 categories:

-   **simple_lookup** — a single, directly stated fact retrievable from one location
-   **table_dependent** — requires reading and interpreting a financial table (e.g. revenue figures, YoY comparisons)
-   **narrative_qualitative** — requires understanding management commentary or strategic narrative, not just numbers
-   **cross_section_reasoning** — requires combining information from two different sections of the same document to derive an answer
-   **cross_document** — requires pulling information from more than one of the three attached documents
-   **no_answer_trap** — a plausible-sounding question whose answer is genuinely not disclosed anywhere in the documents, used to test whether the system hallucinates or correctly says "I don't know"

For every question, provide the output strictly in the following schema as a table:

**| id | query_text | category | target_document(s) | expected_answer | source_location | source_excerpt | difficulty |**

**Requirements:**

-   For every answer, quote the exact source excerpt and the section/page it came from so I can verify it directly against the PDF.
-   Be extra careful with table-derived numbers — flag any figure you are not fully confident about rather than guessing.
-   For cross_document questions, provide a source excerpt from each relevant document separately.
-   Do NOT generate the no_answer_trap questions — leave that category empty. I will author those manually.
-   Distribute questions across all three documents. Do not concentrate questions on a single table or section within any one document.
> ##  My experience with this method:
I gave all 3 documents and the prompt to Gemini. I hoped it would fit all 3 documents in its context window, but it couldn't. It could retrieve and generate well on the Apple and Tesla documents but couldn't retrieve more than 2 questions from the infosys document, likely a context window limitation given the Infosys report runs well over 300 pages. On top of that, several source locations in the Tesla questions were cited incorrectly, pointing to the wrong section entirely.

I manually verified every question, its expected answer, and source location against the actual PDF pages. Where I found discrepancies, I corrected them. For questions I couldn't confidently verify, I flagged and dropped them rather than keeping a questionable entry in a dataset that everything else will be scored against.

For Infosys coverage, I ran a second pass with the same prompt, new chat, Infosys and Apple documents only, which gave me the additional questions needed to bring Infosys representation up to a reasonable level.

The final dataset has **30 questions** distributed as follows:
| Category | Count | What it tests |
|---|---|---|
| `table_dependent` | 8 | Reading and interpreting financial tables, YoY comparisons |
| `simple_lookup` | 7 | Direct fact retrieval from a single location |
| `narrative_qualitative` | 6 | Understanding management commentary and strategic narrative |
| `cross_section_reasoning` | 4 | Combining information from two sections of the same document |
| `no_answer_trap` | 3 | Whether the system hallucinates or correctly says "I don't know" |
| `cross_document` | 2 | Pulling and comparing information across multiple documents |
| **Total** | **30** | |

I wrote the `no_answer_trap` questions by myself instead of using the LLM. I chose these by looking for things that people would naturally expect to find in the documents even though they are not actually there.

For example, the documents mention the Vision Pro revenue breakdown, the Tesla Optimus production forecast, and the exact grant amount Infosys gave to the Prakash Padukone Badminton Academy. However, they never actually give the specific numbers a user might ask for.

That is exactly what makes this a real test for hallucinations. Because the topics are mentioned but not quantified, it forces the system to show if it can catch a subtle trap, rather than just passing a simple test where the topic is completely missing from the document.

Looking at the documents, we have 13 questions for Apple, 11 for Tesla, and 8 for Infosys. It leans a bit more toward Apple and Tesla because Gemini did not pull as much data for Infosys during the first run. Still, the mix is solid enough to really push the pipeline and see how it handles all three different document formats.

For difficulty, the breakdown is 9 easy, 15 medium, and 6 hard questions. I purposely focused more on the medium ones. Easy questions are good for catching retrieval issues, and hard ones are great for testing reasoning flaws. But medium questions are the sweet spot because that is where most real production systems secretly struggle.

## A Peek at the Dataset

Here are a few representative questions from the dataset, one from each category:

![Golden Dataset Sample](https://res.cloudinary.com/e8iyiotf/image/upload/f_auto,q_auto/Screenshot_2026-07-03_161857_egng6g)

The questions range from straightforward financial lookups like Apple's total net sales, to harder reasoning tasks like calculating what percentage of revenue Apple's operating income represents, to trap questions designed to catch hallucinations, like asking about an Infosys share buyback that never happened in FY2025.

The full dataset is available in the [GitHub repository](https://github.com/TheUsefulNerd/Comparative-RAG-Lab/tree/main/data).

## What's Next

With the evaluation dataset in place, every pipeline decision from here onwards has something concrete to be measured against. The next post covers the first stage of the ingestion pipeline: document loading and parsing. It is the step most RAG tutorials skip entirely, and it silently determines the quality of everything that comes after it.
