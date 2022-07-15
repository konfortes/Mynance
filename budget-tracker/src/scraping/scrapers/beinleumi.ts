import { Credentials, ScraperType, TransactionsScraper } from './scraper'

export class BeinleumiScraper extends TransactionsScraper {
    constructor(startDate: Date, scraperOptions?: { [k: string]: string | boolean | Date }) {
        const credentials: Credentials = {
            username: process.env.BANK_USERNAME || '',
            password: process.env.BANK_PASSWORD || '',
        }

        // TODO: yuck. FIX
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        super(ScraperType.Beinleumi, credentials, startDate, scraperOptions as any)
    }
}
