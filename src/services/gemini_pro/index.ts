import {GEMINI_FLASH_API_KEY} from "../../utils/env";
import {searchNewsTool} from "../../modules/agent/tools/serch_for_news";
import {GeminiPro} from "./geminiPro";


const gemini_pro = new GeminiPro(
    GEMINI_FLASH_API_KEY,
    [searchNewsTool.config],
    {
        [searchNewsTool.name]: searchNewsTool.handle.bind(searchNewsTool)
    }
    )

export {gemini_pro}