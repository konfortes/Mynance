import { importTransactions } from './scraping'
;(async () => {
    const res = await importTransactions('2022-07-01')

    console.log(`Got ${res.length} transactions`)
    console.log(res)
})()
