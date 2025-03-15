import * as fs from "fs";
import { parse } from 'csv-parse';
import {create_news_command} from "../create_news";
import {ScraperError, UnableToFetchError} from "../../../core/errors";

export async function onNewsPublish(csv_path: string) {
    fs.readFile(csv_path, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        parse(data, { columns: true, delimiter: ',' }, async (err, records) => {
            if (err) {
                console.error('Error parsing CSV:', err);
                return;
            }

            for (const record of records) {

                const source = record.Source
                const url = record.URL

                try {
                    //await create_news_command.handle({Source: source, URL: url})
                    console.log('Remove the comment to instantiate the news on the database')
                }
                catch (error) {
                    // We should place this source and url on a queue to be scraped later.
                    if (error instanceof ScraperError) {
                        // Some fetch related error was thrown, please investigate
                        console.error('Error while scrapping, please investigate:', error.message);
                    }
                    if (error instanceof UnableToFetchError) {
                        // The web scrapper is being blocked, try to migrate to a different scrapper later
                        console.warn('The web scrapper is being blocked, please investigate:', error.message);
                    }

                    if (error instanceof Error) {
                        // Some unexpected error was thrown
                        console.error('Error while creating news:', error.message);
                    }
                }
            }
        });
    });


}