import * as fs from "fs";
import { parse } from 'csv-parse';
import {create_news_command} from "../create_news";
import {ScraperError} from "../../../core/errors";

export async function onNewsPublish(csv_path: string) {
    fs.readFile(csv_path, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return;
        }

        parse(data, { columns: true, delimiter: ',' }, (err, records) => {
            if (err) {
                console.error('Error parsing CSV:', err);
                return;
            }

            for (const record of records) {

                const source = record.Source
                const url = record.URL

                try {
                    create_news_command.handle({Source: source, URL: url})
                }
                catch (error) {
                    if (error instanceof ScraperError) {
                        // We should place this source and url on a queue to be scraped later, and log it to further investigation
                        console.error('Error creating news:', error.message);
                    }
                }
            }
        });
    });


}