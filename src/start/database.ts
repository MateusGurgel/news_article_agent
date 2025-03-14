import {drizzle} from "drizzle-orm/node-postgres";
import {Pool} from "pg";
import {DATABASE_URL} from "../utils/env";

export const db = drizzle({
    client: new Pool({
        connectionString: DATABASE_URL,
    })
});