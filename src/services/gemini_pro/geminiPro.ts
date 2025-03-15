import {
    FunctionCallingMode,
    GoogleGenerativeAI as GenerativeAI,
    FunctionDeclaration
} from "@google/generative-ai";
import { ToolFunctionResult } from "../../modules/agent/tools/tools";
import { UnstructuredError } from "../../core/errors";

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

    async generate_structured_text<T>(prompt: string): Promise<T> {
        const model = this.genAI.getGenerativeModel({
            model: 'gemini-1.5-pro',

            tools: [{
                functionDeclarations: this.functionDeclarations,
            }],
            toolConfig: {
                functionCallingConfig: {
                    mode: FunctionCallingMode.AUTO,
                }
            }
        })

        const chat = model.startChat()

        let result = await chat.sendMessage(prompt)

        console.log(result.response.text())

        const calls = result.response.functionCalls()

        if (calls) {
            for (let i = 0; i < calls.length; i++) {
                const call = calls[i]

                const func = this.toolFunctions?.[call.name]

                if (!func)
                    throw new Error(`Tool ${call.name} not found`)

                const funcResponse = await func(call.args)

                console.log(funcResponse)

                result = await chat.sendMessage([{
                    functionResponse: {
                        name: call.name,
                        response: {funcResponse},
                    },
                }])

                console.log(result.response.text())

            }
        }

        // Gemini cannot respond with JSON when using the function calling mode, so we need to parse the response manually

        let responseText = result.response.text()
        responseText = responseText.replace('```json', '')
        responseText = responseText.replace('```', '')
        console.log(responseText)

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