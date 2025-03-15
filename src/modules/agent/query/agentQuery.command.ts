import {Command} from "../../../contracts/command";
import {GeminiPro} from "../../../services/gemini_pro/geminiPro";
import {AgentQueryDto, agentQueryResponseDto, AgentQueryResponseDto} from "./agentQuery.dto";

export class AgentQueryCommand implements Command<AgentQueryDto, AgentQueryResponseDto> {

    constructor(
        private readonly gemini_pro: GeminiPro,
    ) {}

    async handle(dto: AgentQueryDto){

        const base_prompt = `
        You are a news article agent, you are tasked with answering the user's query.
        
        Awnser only in JSON format, with the following schema:
        
        <schema>
            ${JSON.stringify(agentQueryResponseDto.shape, null, 2)}
        <schema>
        
        <query>
            ${dto.query}
        <query>
        `

        return await this.gemini_pro.generate_structured_text<AgentQueryResponseDto>(base_prompt)
    }
}