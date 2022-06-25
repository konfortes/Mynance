import * as dotenv from 'dotenv'
dotenv.config()
import { ScraperType, TransactionsScraper } from './transactions/scraper'
;(async function () {
    const [beinleumiScraper, maxScraper] = getScrapers('2022-01-01')

    const [beinleumiTransactions, maxTransactions] = await Promise.all([beinleumiScraper.scrape(), maxScraper.scrape()])

    console.log(beinleumiTransactions)
    console.log(maxTransactions)
})()

function getScrapers(startDate: string): TransactionsScraper[] {
    const commonScraperOptions = {
        startDate: new Date(startDate),
        combineInstallments: false,
        showBrowser: false,
        verbose: false,
    }

    const beinleumiCredentials = {
        username: process.env.BANK_USERNAME || '',
        password: process.env.BANK_PASSWORD || '',
    }
    const beinleumiScraper = new TransactionsScraper(ScraperType.Beinleumi, beinleumiCredentials, commonScraperOptions)

    const maxCredentials = {
        username: process.env.MAX_USERNAME || '',
        password: process.env.MAX_PASSWORD || '',
    }
    const maxScraper = new TransactionsScraper(ScraperType.Max, maxCredentials, commonScraperOptions)

    return [beinleumiScraper, maxScraper]
}
