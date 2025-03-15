import {GenerationConfig, GoogleGenerativeAI} from '@google/generative-ai';
import {UnstructuredError} from "../../core/errors";

export class GeminiFlash {

    genAI: GoogleGenerativeAI

    constructor(api_key: string, ) {
        this.genAI = new GoogleGenerativeAI(api_key)
    }

    async generate_structured_text<T>(prompt: string, responseSchema: object) : Promise<T> {
        const model = this.genAI.getGenerativeModel({
            model: "gemini-2.0-flash-lite",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema
            } as GenerationConfig,
        });

        const result = await model.generateContent([prompt])

        // Making sure the response is valid JSON

        const responseText = result.response.text();

        try {
            return JSON.parse(responseText) as T;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            throw new UnstructuredError(
                `Erro ao fazer o parse da resposta JSON do Gemini: ${errorMsg}. Resposta completa: ${responseText}`
            );
        }
    }
}