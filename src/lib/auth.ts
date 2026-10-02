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
