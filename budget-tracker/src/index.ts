import { importTransactions } from './scraping'
;(async () => {
    const res = await importTransactions('2020-01-01')

    console.log(`Got ${res.length} transactions`)
    console.log(res)
})()
