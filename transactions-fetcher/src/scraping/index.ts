import { BeinleumiScraper } from './scrapers/beinleumi'
import { MaxScraper } from './scrapers/max'
import { TransactionsScraper } from './scrapers/scraper'

export function getScrapers(startDate: Date): TransactionsScraper[] {
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
