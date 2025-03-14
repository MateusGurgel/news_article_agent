import {CreateNewsCommand} from "./create_news.command";
import {clean_raw_news_command} from "../clean_raw_news";

const create_news_command = new CreateNewsCommand(clean_raw_news_command)

export {create_news_command}