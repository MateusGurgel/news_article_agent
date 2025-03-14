import {Redis} from "../infra/redis";
import {REDIS_URL} from "../utils/env";

export const cache = new Redis(REDIS_URL)