import {serial, timestamp, varchar} from 'drizzle-orm/pg-core';
import {randomUUID} from "node:crypto";

export function baseColumns() {
    return {
        id: serial('id').primaryKey(),
        pid: varchar('pid', {length: 255})
            .notNull()
            .unique()
            .$defaultFn(() => randomUUID()),
        createdAt: timestamp('created_at', {mode: "date"})
            .notNull()
            .defaultNow(),
    };
}
