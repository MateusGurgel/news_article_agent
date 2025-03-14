# News Article Agent with RAG/LLM

## Instalation Process

* pnpm i
* access your database and run the following sql: CREATE EXTENSION IF NOT EXISTS vector;
* run the migration: drizzle-kit push

## How to optimize the agent

* Instead of using all the raw news html, we should get only the text from important tags, like <p> <h1> etc...

## Notes

* The kafka seeks to be offline, so i load the csv on the start of the app

## TODO:

Doc the gemini_flash class
