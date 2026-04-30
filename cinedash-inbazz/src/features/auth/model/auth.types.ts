export type User = {
  email: string
}

export type AuthState = {
  user: User | null
  token: string | null
  isAuthenticated: boolean

  login: (email: string) => void
  logout: () => void
}