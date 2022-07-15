import * as dotenv from 'dotenv'
import { BeinleumiScraper } from './scrapers/beinleumi'
import { MaxScraper } from './scrapers/max'
dotenv.config()
import { TransactionsScraper } from './scrapers/scraper'

export async function importTransactions(startDate: Date | string) {
    if (!(startDate instanceof Date)) {
        startDate = new Date(startDate)
    }

    const [beinleumiScraper, maxScraper] = getScrapers(startDate)

    const [beinleumiTransactions, maxTransactions] = await Promise.all([beinleumiScraper.scrape(), maxScraper.scrape()])

    return beinleumiTransactions.concat(maxTransactions)
}

function getScrapers(startDate: Date): TransactionsScraper[] {
    const commonScraperOptions = {
        startDate: new Date(startDate),
        combineInstallments: false,
        showBrowser: false,
        verbose: false,
    }

    const beinleumiScraper = new BeinleumiScraper(startDate, commonScraperOptions)
    const maxScraper = new MaxScraper(startDate, commonScraperOptions)

    return [beinleumiScraper, maxScraper]
}
