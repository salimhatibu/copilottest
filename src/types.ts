import type { ReactNode } from 'react'

export type AuthUser = {
  id: string
  email: string
  role?: 'admin' | 'user'
}

export function isLocalAdmin(): boolean {
  return import.meta.env.DEV || !import.meta.env.PROD
}

export function canAccessDesk(user: AuthUser | null): boolean {
  if (!user) return false
  return user.role === 'admin' || isLocalAdmin()
}

export function formatCurrency(cents: number, symbol = 'KES'): string {
  return `${symbol} ${((cents / 100) || 0).toFixed(2)}`
}

export function formatDateEAT(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'long', timeZone: 'Africa/Nairobi' }).format(date)
}

export function getTodayEAT(): string {
  const now = new Date()
  const eatTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }))
  return eatTime.toISOString().split('T')[0]
}

export function getMonthStartEAT(): string {
  const now = new Date()
  const eatTime = new Date(now.toLocaleString('en-US', { timeZone: 'Africa/Nairobi' }))
  return new Date(eatTime.getFullYear(), eatTime.getMonth(), 1).toISOString().split('T')[0]
}

export interface DeskShellProps {
  children: ReactNode
}
