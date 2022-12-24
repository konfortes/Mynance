import { Credentials, ScraperType, TransactionsScraper } from './scraper'

export class CalScraper extends TransactionsScraper {
    constructor(startDate: Date, scraperOptions?: { [k: string]: string | boolean | Date }) {
        const credentials: Credentials = {
            username: process.env.CAL_USERNAME || '',
            password: process.env.CAL_PASSWORD || '',
        }

        // TODO: yuck. FIX
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(ScraperType.Cal, credentials, startDate, scraperOptions as any)
    }
}
