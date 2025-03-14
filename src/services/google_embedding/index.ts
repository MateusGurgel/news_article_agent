import {GeminiEmbeddingService} from "./google_embedding";
import {GEMINI_FLASH_API_KEY} from "../../utils/env";

const googleEmbeddingService = new GeminiEmbeddingService(GEMINI_FLASH_API_KEY)

export default googleEmbeddingService