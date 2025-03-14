import {Command} from "../../../contracts/command";
import {ScraperError, UnableToFetchError} from "../../../core/errors";
import {CleanRawNewsCommand} from "../clean_raw_news/clean_raw_news.command";
import {GoogleEmbeddingService} from "../../../services/google_embedding/google_embedding";
import {NewsRepository} from "../repo/news.repo";

interface CreateNewsCommandDTO {
    Source: string
    URL: string
}

export class CreateNewsCommand implements Command<CreateNewsCommandDTO, void> {

    constructor(private readonly clean_raw_news_command: CleanRawNewsCommand,
                private readonly geminiEmbeddingService: GoogleEmbeddingService,
                private readonly newsRepository: NewsRepository
    ) {}

    async handle(dto: CreateNewsCommandDTO) {

        console.info(`Fetching and cleaning raw news from ${dto.URL}`);

        let response: Response;

        try {
            response = await fetch(dto.URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json, text/html, */*",
                    "Cache-Control": "no-cache",
                    "Pragma": "no-cache",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
                }
            });
        }
        catch (error) {
            const errorMsg = error instanceof Error ? error.message : String(error);
            throw new ScraperError(`Error fetching and cleaning raw news: ${errorMsg}`);
        }

        if (!response.ok) {
            const response_text = await response.text();
            throw new UnableToFetchError(`The response was not ok, the news was not fetched, further investigation is required: ${response.status}, ${response_text}`);
        }

        const response_text = await response.text();
        const raw_news = await this.clean_raw_news_command.handle(response_text);

        const raw_news_embedding = await this.geminiEmbeddingService.generateEmbedding(raw_news.content);

        await this.newsRepository.create({
            content: raw_news.content,
            date: raw_news.date,
            embedding: raw_news_embedding,
            title: raw_news.title,
            url: dto.URL
        })

        console.info(`The news ${raw_news.title} was created successfully`)
    }
}