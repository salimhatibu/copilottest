export function formatCurrency(cents: number, symbol = 'KES'): string {
  return `${symbol} ${((cents / 100) || 0).toFixed(2)}`
}

export function parseCurrency(value: string): number {
  const cleaned = value.replace(/[^\d.]/g, '')
  const parsed = Number.parseFloat(cleaned)
  return Number.isFinite(parsed) ? Math.round(parsed * 100) : 0
}

export function formatDateEAT(value: string): string {
  const date = new Date(value)
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'Africa/Nairobi' }).format(date)
}

export function getTodayEAT(): string {
  const now = new Date()
  return new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' })).toISOString().split('T')[0]
}

export function getMonthStartEAT(): string {
  const now = new Date()
  const eatNow = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }))
  return new Date(eatNow.getFullYear(), eatNow.getMonth(), 1).toISOString().split('T')[0]
}
