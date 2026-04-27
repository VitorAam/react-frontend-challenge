import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState } from './auth.types'

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (email) => {
        const fakeToken = 'fake-jwt-token'

        set({
          user: { email },
          token: fakeToken,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)