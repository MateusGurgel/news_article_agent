import {controller} from "../../../core/controller";
import {agentQueryDto, agentQueryResponseDto} from "./agentQuery.dto";
import {agentQueryCommand} from "./index";



export const AgentQueryController = controller(
    {
        description: "Use this route to ask questions and make queries with the agent",
        tags: ["Agent"],
        body: agentQueryDto,
        response: {
            200: agentQueryResponseDto,
        }
    },
    async (request, reply) => {
        const answer = await agentQueryCommand.handle({
            query: request.body.query
        })

        return reply.status(200).send(answer)
    },
)