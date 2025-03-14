import {NewsInsertModel, NewsSchema} from "./schemas/news.schema";
import {db} from "../../../start/database";

export class NewsRepository{

    create(news: NewsInsertModel){
        return db.insert(NewsSchema).values(news)
    }

}