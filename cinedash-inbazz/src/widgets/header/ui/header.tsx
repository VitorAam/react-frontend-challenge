import { Link } from '@tanstack/react-router'

import { useAuthStore } from '@/features/auth'
import { ThemeToggle } from '@/features/theme'
import { useWatchlistCount } from '@/features/watchlist'
import { Button } from '@/shared/ui/button'

export const Header = () => {
    const logout = useAuthStore((state) => state.logout)
    const loggedIn = useAuthStore((state) => state.isAuthenticated)
    const watchlistCount = useWatchlistCount()

    return (
        <header className="w-full border-b bg-background sticky top-0 z-10">
            <div className="mx-auto flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <span className="text-lg font-semibold">Cinedash Inbazz</span>
                    {loggedIn && (
                        <nav className="flex items-center gap-4 text-sm">
                            <Link
                                to="/movies"
                                className="text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
                            >
                                Descoberta
                            </Link>
                            <Link
                                to="/watchlist"
                                className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
                            >
                                Minha lista
                                {watchlistCount > 0 && (
                                    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                                        {watchlistCount}
                                    </span>
                                )}
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
