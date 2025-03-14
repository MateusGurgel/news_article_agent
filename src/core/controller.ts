import {FastifySchema} from "fastify";
import {Controller, Handler, WSController, WSHandler} from "./types";

export function controller<S extends FastifySchema>(
    schema: S,
    handler: Handler<S>,
    ...preHandler: Handler<S>[] | []
): Controller<S> {
    return {
        schema,
        handler,
        preHandler,
    }
}

export function wsController<S extends FastifySchema>(
    schema: S,
    handler: WSHandler<S>,
    ...preHandler: Handler<S>[] | []
): WSController<S> {
    return {
        schema,
        handler,
        preHandler,
    }
}