/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs'
import { stringify } from 'csv-stringify/sync'
import { getScrapers } from './scraping'
import { program } from 'commander'
import moment from 'moment'

const DATE_FORMAT = 'DD/MM/YYYY'

;(async () => {
    program
        .name('transactions-fetcher')
        .description('Fetch transactions from beinleumi and max')
        .version('0.1.0')
        .option(
            '--startdate <string>',
            `The date to start fetch from. Defaults to 30m ago. (expected format is ${DATE_FORMAT})`,
        )

    program.parse()

    const options = program.opts()
    console.log(options)

    let startDate = null
    if (options.startdate) {
        startDate = moment(options.startdate, DATE_FORMAT)
    } else {
        startDate = moment().subtract(3, 'years')
    }

    startDate = startDate.toDate()

    const res = await importTransactions(startDate)

    const output = stringify(res, { header: true })
    fs.writeFileSync(`./transactions_${startDate}.csv`, output)
})()

export async function importTransactions(startDate: Date) {
    const [beinleumiScraper, maxScraper, calScraper] = getScrapers(startDate)

    const [beinleumiTransactions, maxTransactions, calTransactions] = await Promise.all([
        beinleumiScraper.scrape(),
        maxScraper.scrape(),
        calScraper.scrape(),
    ])

    return beinleumiTransactions.concat(maxTransactions).concat(calTransactions)
}
