import {SearchNewsTool} from "./search_news";
import {newsRepository} from "../../../news/repo";
import googleEmbeddingService from "../../../../services/google_embedding";

const searchNewsTool = new SearchNewsTool(newsRepository, googleEmbeddingService)

export {searchNewsTool}