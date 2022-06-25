export interface Transaction {
    identifier?: string
    date: string
    processedDate: string
    originalAmount: number
    originalCurrency: string
    chargedAmount: number
    chargedCurrency?: string
    description: string
    category: string
}

export enum ScraperType {
    Beinleumi = 'beinleumi',
    Max = 'max',
}

interface Credentials {
    username: string
    password: string
}

export class TransactionsScraper {
    constructor(
        scraperType: ScraperType,
        public credentials: Credentials,
        scraperOptions?: { [k: string]: string | boolean | Date },
    ) {
        if (!Object.values(ScraperType).includes(scraperType)) {
            throw new Error('Invalid scraper type')
        }

        console.log(scraperOptions)
    }

    async scrape(): Promise<object> {
        return {}
    }
}
