import {NewsInsertModel, NewsSchema} from "./schemas/news.schema";
import {db} from "../../../start/database";
import {cosineDistance, desc, gt, sql} from "drizzle-orm";

export class NewsRepository{

     create(news: NewsInsertModel){
        return db.insert(NewsSchema).values(news)
    }

    search(query_embedding: number[], limit: number = 4, similarity_threshold: number = 0.5){

        const similarity = sql<number>`1 - (${cosineDistance(NewsSchema.embedding, query_embedding)})`;

        return db
            .select({title: NewsSchema.title, url: NewsSchema.url, date: NewsSchema.date, similarity})
            .from(NewsSchema)
            .where(gt(similarity, similarity_threshold))
            .orderBy((t) => desc(t.similarity))
            .limit(limit);
    }

}