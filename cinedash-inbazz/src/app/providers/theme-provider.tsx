import { useEffect } from 'react'
import { useThemeStore } from '@/features/theme/model/theme.store'

export const ThemeProvider = () => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    const root = document.documentElement

    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  return null
}