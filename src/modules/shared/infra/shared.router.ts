import {FastifyTypedInstance} from "../../../core/types";
import {get} from "../../../core/methods";
import {healthCheckController} from "../resources/healthCheck/healthCheck.controller";

export function sharedRouter(app: FastifyTypedInstance) {
    get(app, '/', healthCheckController)
}