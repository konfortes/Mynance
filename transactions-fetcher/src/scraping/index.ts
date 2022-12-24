import { BeinleumiScraper } from './scrapers/beinleumi'
import { CalScraper } from './scrapers/cal'
import { MaxScraper } from './scrapers/max'
import { TransactionsScraper } from './scrapers/scraper'

export function getScrapers(startDate: Date): TransactionsScraper[] {
    const commonScraperOptions = {
        startDate: startDate,
        combineInstallments: false,
        showBrowser: false,
        verbose: false,
    }

    const beinleumiScraper = new BeinleumiScraper(startDate, commonScraperOptions)
    const maxScraper = new MaxScraper(startDate, commonScraperOptions)
    const calScraper = new CalScraper(startDate, commonScraperOptions)

    return [beinleumiScraper, maxScraper, calScraper]
}
