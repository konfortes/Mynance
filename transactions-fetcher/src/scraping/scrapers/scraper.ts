// TODO: Fix Types!
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createScraper, ScraperOptions } from 'israeli-bank-scrapers'
// import { CompanyTypes, createScraper, ScraperOptions } from 'israeli-bank-scrapers'

export enum ScraperType {
    Beinleumi = 'beinleumi',
    Max = 'max',
}

export interface Credentials {
    username: string
    password: string
}

// TODO: FIX types
export abstract class TransactionsScraper {
    private scraper
    constructor(
        private scraperType: ScraperType,
        private credentials: Credentials,
        startDate: Date,
        scraperOptions: ScraperOptions,
    ) {
        // TODO: yuck
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        scraperOptions.companyId = scraperType as any
        scraperOptions.startDate = startDate

        this.scraper = createScraper(scraperOptions)

        console.log(`Creating a scraper with options: ${JSON.stringify(scraperOptions, null, 4)}`)
    }

    // TODO: Yuck. FIX
    async scrape(): Promise<any[]> {
        // TODO: handle success/error

        console.log(`Scraper ${this.scraperType} - start scraping`)
        const response = (await this.scraper.scrape(this.credentials as any)) as any

        console.log(`Scraper ${this.scraperType} ${response.success ? 'Succeeded' : 'Failed'}`)

        const result = []

        for (const account of response.accounts || []) {
            for (const txn of account.txns || []) {
                txn.accountNumber = account.accountNumber
                result.push(txn)
            }
        }

        console.log(`${this.scraperType} scraper - got ${result.length} transactions`)

        return result
    }
}
