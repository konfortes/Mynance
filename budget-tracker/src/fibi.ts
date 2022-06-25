import * as dotenv from 'dotenv'
dotenv.config()

import { CompanyTypes, createScraper, ScraperOptions } from 'israeli-bank-scrapers'
;(async function () {
    try {
        const options: ScraperOptions = {
            companyId: CompanyTypes.beinleumi,
            startDate: new Date('2022-01-01'),
            combineInstallments: false,
            showBrowser: false,
            verbose: true,
        }

        const credentials = {
            username: process.env.BANK_USERNAME || '',
            password: process.env.BANK_PASSWORD || '',
        }

        const scraper = createScraper(options)
        const scrapeResult = await scraper.scrape(credentials)

        if (!scrapeResult || !scrapeResult.success) {
            console.log(`Scrape failed: ${scrapeResult.errorType}`)
            throw new Error('Scrape failed')
        }

        const accounts = scrapeResult.accounts || []
        accounts.forEach(account => {
            console.log(`found ${account.txns.length} transactions for account number ${account.accountNumber}`)
        })
    } catch (e: any) {
        console.error(`scraping failed for the following reason: ${e.message}`)
    }
})()
