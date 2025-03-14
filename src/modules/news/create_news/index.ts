import {CreateNewsCommand} from "./create_news.command";
import {clean_raw_news_command} from "../clean_raw_news";
import googleEmbeddingService from "../../../services/google_embedding";
import {newsRepository} from "../repo";

const create_news_command = new CreateNewsCommand(clean_raw_news_command, googleEmbeddingService, newsRepository)

export {create_news_command}