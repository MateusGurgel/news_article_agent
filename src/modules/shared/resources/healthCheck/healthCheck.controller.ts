import {z} from "zod";
import {controller} from "../../../../core/controller";

export const healthCheckController = controller({
        description: "Health check",
        tags: ["Utils"],
        response: {
            200: z.object({
                message: z.string(),
                uptime: z.number(),
            }),
        }
    },
    async (_, reply) => {
        return reply.status(200).send({
            message: "ok",
            uptime: process.uptime()
        })
    }
)
