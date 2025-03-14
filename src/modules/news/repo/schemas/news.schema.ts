import {pgTable, varchar, text, timestamp, vector, index, serial} from 'drizzle-orm/pg-core';
import {InferInsertModel} from "drizzle-orm";

const NewsSchema = pgTable('news', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    url: text('url').notNull(),
    date: timestamp('date', { mode: 'string' }).notNull(),
    embedding: vector('embedding', { dimensions: 1536 }).notNull(),
}, (table) => [
    index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
]);

type NewsSelectModel = InferInsertModel<typeof NewsSchema>
type NewsInsertModel = InferInsertModel<typeof NewsSchema>

export {
    NewsSelectModel,
    NewsInsertModel,
    NewsSchema
}