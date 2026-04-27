import { useEffect } from 'react'
import { useAuthStore } from '@/features/auth'
import { useNavigate } from '@tanstack/react-router'

export const AuthWatcher = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/' })
    }
  }, [isAuthenticated, navigate])

  return null
}