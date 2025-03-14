import {GEMINI_FLASH_API_KEY} from "../../../utils/env";
import {GeminiFlash} from "./geminiFlash";


const gemini_flash = new GeminiFlash(GEMINI_FLASH_API_KEY)

export {gemini_flash}