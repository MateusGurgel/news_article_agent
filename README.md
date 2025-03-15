# News Article Agent with RAG/LLM

## Design Choices

- I implemented the **Command Pattern** to decouple the logic for processing news articles and interacting with the database, allowing for easier maintenance and extensibility.

- Every command was implemented with Dependency Injection, making it easier to test and maintain.

- The documentation for the api is in the /docs path.

- The agent is designed to be **stateless**, meaning it does not store any information about the conversation history or user preferences.

- I choose to don't use any library for the LLM interaction because i thought it was overkill for this project.

## Installation Process

1. Run the following to install dependencies:
   ```bash
   pnpm install
   ```
   
2.  Run the docker-compose file to start the PostgreSQL containers:
   ```bash
   docker-compose up
   ```

3. Access your database and run the following SQL to enable vector extension:
   ```sql
   CREATE EXTENSION IF NOT EXISTS vector;
   ```

4. Execute the migration to set up the database schema:
   ```bash
   drizzle-kit push
   ```

5. Run the application:
   ```bash
    pnpm dev
   ```

## Optimization Suggestions

- Instead of processing the entire raw HTML of the news articles, extract only the essential content from key tags such as `<p>`, `<h1>`, etc., to reduce unnecessary data and improve performance.

## Notes

- Kafka is set to operate in **offline mode**, meaning I preload the CSV data when the application starts to avoid real-time streaming.
- So i added the `onNewsPublish` function to the Kafka consumer to process the CSV data and create news articles in the database.

## What wold i do if i had the opportunity to do it again?

- I would chunkrize the news articles into smaller chunks before saving them to the database.
- I would use some framework like langchain for tooling and agents, because gemini api cannot use tools and respond in stuctured text at the same time (didn't know that).


## Models

- I chose the gemini-1.5-pro model to interact with the final client and use the tools. Generally Speaking, using robust models to interact with clients is a good practice.
- The gemini-2.0-flash-lite was used for cleaning the scraped data. Mainly because it is faster and, lightweight and cheaper than the pro model.


## Demo

![Demo](https://github.com/MateusGurgel/news_article_agent/blob/main/demo/demo.png)