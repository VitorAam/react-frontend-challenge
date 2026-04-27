import { useThemeStore } from '../model/theme.store'
import { Button } from '@/shared/ui/button'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <Button variant="outline" onClick={toggleTheme} className='cursor-pointer'>
      {theme === 'dark' ? '🌙' : '☀️'}
    </Button>
  )
}