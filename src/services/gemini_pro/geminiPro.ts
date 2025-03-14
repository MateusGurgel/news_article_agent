import {
    FunctionCallingMode, GenerationConfig,
    GoogleGenerativeAI as GenerativeAI,
    FunctionDeclaration
} from "@google/generative-ai";
import {ToolFunctionResult} from "../../modules/agent/tools/tools";
import {UnstructuredError} from "../../core/errors";

export type ToolFunctions = Record<string, (...args: any[]) => Promise<ToolFunctionResult> | ToolFunctionResult>

export class GeminiPro {
    private readonly genAI: GenerativeAI

    constructor(
        apiKey: string,
        private readonly functionDeclarations: FunctionDeclaration[] = [],
        private readonly toolFunctions: ToolFunctions = {}
    ) {
        this.genAI = new GenerativeAI(apiKey)
    }

    async generate_structured_text<T>(prompt: string, responseSchema: object) {
        const model = this.genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',

            tools: [{
                functionDeclarations: this.functionDeclarations,
            }],
            toolConfig: {
                functionCallingConfig: {
                    mode: FunctionCallingMode.ANY,
                }
            }
        })

        let result = await model.generateContent(prompt)

        const calls = result.response.functionCalls()



        if (calls)
            for (let i = 0; i < calls.length; i++) {
                const call = calls[i]

                const func = this.toolFunctions?.[call.name]

                if (!func)
                    throw new Error(`Tool ${call.name} not found`)

                const funcResponse = await func(call.args)

                model.generationConfig = {
                    responseMimeType: "application/json",
                        responseSchema
                } as GenerationConfig

                result = await model.generateContent([{
                    text: funcResponse,
                    functionResponse: {
                        name: call.name,
                        response: funcResponse
                    },

                }])
            }

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