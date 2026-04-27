import { Link } from '@tanstack/react-router'

import { useAuthStore } from '@/features/auth'
import { ThemeToggle } from '@/features/theme/ui/theme-toggle'
import { Button } from '@/shared/ui/button'

export const Header = () => {
    const logout = useAuthStore((state) => state.logout)
    const loggedIn = useAuthStore((state) => state.isAuthenticated)

    return (
        <header className="w-full border-b bg-background sticky top-0 z-10">
            <div className="mx-auto flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <span className="text-lg font-semibold">Cinedash Inbazz</span>
                    {loggedIn && (
                        <nav className="flex items-center gap-4 text-sm">
                            <Link
                                to="/dashboard"
                                className="text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
                            >
                                Descoberta
                            </Link>
                        </nav>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    {loggedIn && (
                        <Button variant="outline" onClick={logout} className='cursor-pointer'>
                            Sair
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}
