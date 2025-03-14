import {FunctionDeclaration} from "@google/generative-ai";


export type ToolFunctionResult<T extends {} = {}> = T

export type ToolConfig = FunctionDeclaration

export abstract class Tool {
    protected constructor(
        private readonly _config: ToolConfig
    ) {
    }

    get config() {
        return this._config
    }

    get name() {
        return this._config.name
    }

    abstract handle(input: any): Promise<ToolFunctionResult> | ToolFunctionResult
}