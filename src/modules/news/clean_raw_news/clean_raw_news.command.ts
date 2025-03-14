import {Command} from "../../../contracts/command";
import {GeminiFlash} from "../../../services/gemini_flash/geminiFlash";
import dedent from "ts-dedent";
import {CommandError} from "../../../core/errors";

interface CleanRawNewsCommandResponseDTO {
    title: string
    content: string
    date: string
}

export class CleanRawNewsCommand implements Command<string, CleanRawNewsCommandResponseDTO> {

    constructor(private readonly gemini_flash: GeminiFlash) {
    }

    handle(raw_news: string): Promise<CleanRawNewsCommandResponseDTO> {

        const responseSchema = {
            type: "object",
            properties: {
                title: {
                    type: "string",
                    description: "The title of the article"
                },
                content: {
                    type: "string",
                    description: "The article content in full length and in plain text"
                },
                date: {
                    type: "string",
                    description: "The date that the article was published. use the format 'YYYY-MM-DD' Ex: 2024-12-01"
                }
            },
            required: ["title", "content", "date"]
        };

        // I am using dedent to remove the indentation from the prompt. And the persona technique to improve accuracy on the response
        const prompt = dedent`
                You are a powerful news article scrapper, you are tasked with cleaning the raw news provided by the user.
                <raw_news>
                    ${raw_news}
                <raw_news>
            `

        try {
            return this.gemini_flash.generate_structured_text<CleanRawNewsCommandResponseDTO>(prompt, responseSchema)
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            throw new CommandError(`Error generating structured text: ${errorMsg}`);
        }
    }
}