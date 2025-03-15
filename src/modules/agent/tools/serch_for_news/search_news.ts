import {NewsRepository} from "../../../news/repo/news.repo";
import {GoogleEmbeddingService} from "../../../../services/google_embedding/google_embedding";
import {Tool} from "../tools";
import {SchemaType} from "@google/generative-ai";

export class SearchNewsTool extends Tool {

    constructor(
        private readonly news_repository: NewsRepository,
        private readonly google_embedding_service: GoogleEmbeddingService
    ) {
        super(
            {
                name: "searchNews",
                description: "Get news given a query",
                parameters: {
                    type: SchemaType.OBJECT,
                    properties: {
                        query: {
                            type: SchemaType.STRING,
                            description: "Embedding search for news with given news content, query with keywords like: donald trump, climate change, etc...",
                        }
                    },
                    required: ["query"],
                },
            }
        )
    }

    async handle(input : { query: string }) {
        const query_embedding = await this.google_embedding_service.generateEmbedding(input.query)
        return this.news_repository.search(query_embedding)
    }
}