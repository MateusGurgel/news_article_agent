import {Command} from "../../../contracts/command";
import {NewsRepository} from "../../news/repo/news.repo";
import {GeminiPro} from "../../../services/gemini_pro/geminiPro";
import {AgentQueryDto, AgentQueryResponseDto} from "./agentQuery.dto";
import {SearchNewsTool} from "../tools/serch_for_news/search_news";

export class AgentQueryCommand implements Command<AgentQueryDto, AgentQueryResponseDto> {

    constructor(
        private readonly newsRepository: NewsRepository,
        private readonly gemini_pro: GeminiPro,
        private readonly searchNewsTool: SearchNewsTool
    ) {}

    async handle(dto: AgentQueryDto){

        const responseSchema = {
            type: "object",
            properties: {
                answer: {
                    type: "string",
                    description: "The answer to the agent's query"
                },
                sources: {
                    type: "array",
                    description: "List of sources that provide additional context or reference",
                    items: {
                        type: "object",
                        properties: {
                            title: {
                                type: "string",
                                description: "The title of the source article"
                            },
                            url: {
                                type: "string",
                                description: "The URL of the source article"
                            },
                            date: {
                                type: "string",
                                description: "The publication date of the source article in 'YYYY-MM-DD' format"
                            }
                        },
                        required: ["title", "url", "date"]
                    },
                    nullable: true
                }
            },
            required: ["answer"]
        };


        return await this.gemini_pro.generate_structured_text<AgentQueryResponseDto>(dto.query, responseSchema)
    }
}