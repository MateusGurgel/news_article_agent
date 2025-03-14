import {FastifyTypedInstance} from "../../../core/types";
import {get} from "../../../core/methods";
import {healthCheckController} from "../resources/healthCheck/healthCheck.controller";
import {agentRouter} from "../../agent/infra/agent.router";

export function sharedRouter(app: FastifyTypedInstance) {
    get(app, '/', healthCheckController)
    agentRouter(app)
}