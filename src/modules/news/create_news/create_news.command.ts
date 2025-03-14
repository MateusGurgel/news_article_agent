import {Command} from "../../../contracts/command";
import {ScraperError} from "../../../core/errors";

interface CreateNewsCommandDTO {
    Source: string
    URL: string
}

export class CreateNewsCommand implements Command<CreateNewsCommandDTO, void> {
    async handle(dto: CreateNewsCommandDTO) {
        const response = await fetch(dto.URL);
        if (!response.ok) {
            throw new ScraperError('Network response was not ok');
        }

        console.log(await response.text());
        console.log(response.status);
    }
}