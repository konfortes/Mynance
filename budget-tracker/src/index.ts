import { importTransactions } from './scraping'
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

    console.log(`Got ${res.length} transactions`)
    console.log(res)
})()
