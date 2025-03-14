import {Controller, FastifyTypedInstance, WSController} from "./types";

export function ws(app: FastifyTypedInstance, path: string, controller: WSController<any>) {
    return app.get(path, {
        schema: controller.schema,
        preHandler: controller.preHandler,
        websocket: true
    }, controller.handler)
}

export function route(
    app: FastifyTypedInstance,
    method: "get" | "post",
    path: string,
    controller: Controller<any>,
) {
    return app[method](path, {
        schema: controller.schema,
        preHandler: controller.preHandler,
    }, controller.handler)
}

export function post(app: FastifyTypedInstance, path: string, controller: Controller<any>) {
    return route(app, "post", path, controller)
}

export function get(app: FastifyTypedInstance, path: string, controller: Controller<any>) {
    return route(app, "get", path, controller)
}
