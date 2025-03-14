import { GoogleGenerativeAI } from '@google/generative-ai';
import { UnstructuredError } from '../../core/errors';

export class GoogleEmbeddingService {
    private genAI: GoogleGenerativeAI;

    constructor(apiKey: string) {
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async generateEmbedding(text: string): Promise<number[]> {
        const model = this.genAI.getGenerativeModel({
            model: 'text-embedding-004',
        });

        try {
            const result = await model.embedContent(text);
            return result.embedding.values;
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            throw new UnstructuredError(
                `Erro ao gerar o embedding: ${errorMsg}. Texto fornecido: ${text}`
            );
        }
    }
}
