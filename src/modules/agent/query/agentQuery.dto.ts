import {z} from "zod";

const agentQueryDto = z.object({
    query: z.string(),
})

const agentQueryResponseDto = z.object({
    answer: z.string(),
    sources: z.array(z.object({
            title: z.string(),
            url: z.string(),
            date: z.string()
        })
    ).optional()
})

type AgentQueryDto = z.infer<typeof agentQueryDto>
type AgentQueryResponseDto = z.infer<typeof agentQueryResponseDto>

export {agentQueryDto, agentQueryResponseDto, AgentQueryResponseDto, AgentQueryDto}