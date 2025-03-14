import {FastifyTypedInstance} from "../../../core/types";
import {AgentQueryController} from "../query/agentQuery.controller";
import {post} from "../../../core/methods";

export function agentRouter(app: FastifyTypedInstance) {
    post(app, '/agent', AgentQueryController)
}
