/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs'
import { stringify } from 'csv-stringify/sync'
import { getScrapers } from './scraping'
;(async () => {
    const cliArgs = process.argv.slice(2)

    let fromDate = null
    if (cliArgs.length > 0) {
        fromDate = new Date(cliArgs[0])
    } else {
        const current = new Date()
        fromDate = new Date(current.getFullYear(), current.getMonth(), 1)
    }
    const res = await importTransactions(fromDate)

    const output = stringify(res, { header: true })
    fs.writeFileSync(`./transactions_${fromDate}.csv`, output)
})()

export async function importTransactions(startDate: Date | string) {
    if (!(startDate instanceof Date)) {
        startDate = new Date(startDate)
    }

    const [beinleumiScraper, maxScraper] = getScrapers(startDate)

    const [beinleumiTransactions, maxTransactions] = await Promise.all([beinleumiScraper.scrape(), maxScraper.scrape()])

    return beinleumiTransactions.concat(maxTransactions)
}
