import {AgentQueryCommand} from "./agentQuery.command";
import {newsRepository} from "../../news/repo";
import {gemini_pro} from "../../../services/gemini_pro";
import {searchNewsTool} from "../tools/serch_for_news";

const agentQueryCommand = new AgentQueryCommand(newsRepository, gemini_pro, searchNewsTool)

export {agentQueryCommand}