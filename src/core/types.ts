import {
    ContextConfigDefault,
    FastifyBaseLogger,
    FastifyInstance,
    FastifyRequest,
    FastifySchema,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RouteGenericInterface,
    RouteHandlerMethod
} from "fastify";
import {ZodTypeProvider} from "fastify-type-provider-zod";
import {WebSocket} from "ws";

export type FastifyTypedInstance = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger,
    ZodTypeProvider
>

export type Handler<S extends FastifySchema> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    RouteGenericInterface,
    ContextConfigDefault,
    S,
    ZodTypeProvider
>

export type WSHandler<S extends FastifySchema> = (
    socket: WebSocket,
    request: FastifyRequest<RouteGenericInterface, RawServerDefault, RawRequestDefaultExpression, S, ZodTypeProvider, ContextConfigDefault, FastifyBaseLogger>
) => void

export interface Controller<S extends FastifySchema> {
    schema: S
    handler: Handler<S>
    preHandler: Handler<S>[]
}

export interface WSController<S extends FastifySchema> {
    schema: S
    handler: WSHandler<S>
    preHandler: Handler<S>[]
}
