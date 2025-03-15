import {AgentQueryCommand} from "./agentQuery.command";
import {gemini_pro} from "../../../services/gemini_pro";

const agentQueryCommand = new AgentQueryCommand(gemini_pro)

export {agentQueryCommand}