import {CleanRawNewsCommand} from "./clean_raw_news.command";
import {gemini_flash} from "../../llms/gemini_flash";

const clean_raw_news_command = new CleanRawNewsCommand(gemini_flash)

export {clean_raw_news_command}