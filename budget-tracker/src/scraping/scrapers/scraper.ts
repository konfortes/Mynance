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
        // TODO: yuck. FIX

        console.log(`Scraper ${this.scraperType} - start scraping`)
        // TODO: make it nicer with map
        const result: any[] = []
        const response = await this.scraper.scrape(this.credentials as any)

        console.log(`Scraper ${this.scraperType} got result: ${JSON.stringify(response, null, 4)}`)
        for (const a of response.accounts || []) {
            result.concat(a.txns)
        }
        return result
    }
}
