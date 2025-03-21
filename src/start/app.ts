import {fastify} from "fastify";
import {fastifyCors} from "@fastify/cors";
import {jsonSchemaTransform, serializerCompiler, validatorCompiler, ZodTypeProvider} from "fastify-type-provider-zod";
import {fastifySwagger} from "@fastify/swagger";
import {fastifySwaggerUi} from "@fastify/swagger-ui";
import {FastifyTypedInstance} from "../core/types";
import {routes} from "./routes";
import {fastifyRequestContext} from "@fastify/request-context";
import {fastifyWebsocket} from "@fastify/websocket";
import {onNewsPublish} from "../modules/news/events/on_start.event";

export const app: FastifyTypedInstance = fastify({
    logger: false,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
    origin: "*",
})

app.register(fastifyRequestContext)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: "Luna",
            description: "Luna API",
            version: "1.0.0",
        },
    },
    transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
})

app.register(fastifyWebsocket, {
    options: {maxPayload: 1048576, server: app.server}
})

app.register(routes)

app.listen({port: 3000}, async (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }

    // await start_kafka_router()
    await onNewsPublish("src/data/articles_dataset.csv")


    console.log(`Server listening at ${address}`)
})
