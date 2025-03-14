import {FastifyTypedInstance} from "../core/types";
import {sharedRouter} from "../modules/shared/infra/shared.router";

export async function routes(app: FastifyTypedInstance) {
    sharedRouter(app)
}
