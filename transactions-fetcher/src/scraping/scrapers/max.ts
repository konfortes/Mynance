import { Credentials, ScraperType, TransactionsScraper } from './scraper'

export class MaxScraper extends TransactionsScraper {
    constructor(startDate: Date, scraperOptions?: { [k: string]: string | boolean | Date }) {
        const credentials: Credentials = {
            username: process.env.MAX_USERNAME || '',
            password: process.env.MAX_PASSWORD || '',
        }

        // TODO: yuck. FIX
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(ScraperType.Max, credentials, startDate, scraperOptions as any)
    }
}
