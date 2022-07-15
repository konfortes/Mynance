export interface Transaction {
    identifier?: string
    date: string
    processedDate: string
    originalAmount: number
    originalCurrency: string
    chargedAmount: number
    chargedCurrency?: string
    description: string
    category: string
}
