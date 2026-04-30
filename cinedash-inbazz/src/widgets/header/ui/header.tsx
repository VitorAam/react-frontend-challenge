import { Link } from '@tanstack/react-router'
import { Menu } from 'lucide-react'

import { useState } from 'react'
import { useAuthStore } from '@/features/auth'
import { ThemeToggle } from '@/features/theme'
import { useWatchlistCount } from '@/features/watchlist'
import { Button } from '@/shared/ui/button'

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/shared/ui/sheet'

export const Header = () => {
    const [open, setOpen] = useState(false)
    const logout = useAuthStore((state) => state.logout)
    const loggedIn = useAuthStore((state) => state.isAuthenticated)
    const watchlistCount = useWatchlistCount()

    return (
        <header className="w-full border-b bg-background sticky top-0 z-10">
            <div className="mx-auto flex h-14 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <span className="text-lg font-semibold">
                        Cinedash Inbazz
                    </span>

                    {loggedIn && (
                        <nav className="hidden md:flex items-center gap-4 text-sm">
                            <Link to="/movies">Descoberta</Link>

                            <Link to="/watchlist" className="flex items-center gap-1.5">
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
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side="right" className="w-64 p-6">
                                <SheetTitle className="sr-only">
                                    Menu de navegação
                                </SheetTitle>
                                <SheetDescription className="sr-only">
                                    Acesse as seções do CineDash e gerencie sua sessão.
                                </SheetDescription>

                                <nav className="flex flex-col gap-4 mt-6">
                                    <Link to="/movies" onClick={() => setOpen(false)}>
                                        Descoberta
                                    </Link>

                                    <Link to="/watchlist" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                                        Minha lista
                                        {watchlistCount > 0 && (
                                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-medium text-primary-foreground">
                                                {watchlistCount}
                                            </span>
                                        )}
                                    </Link>

                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setOpen(false)
                                            logout()
                                        }}
                                        className="mt-4"
                                    >
                                        Sair
                                    </Button>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    )}

                    {loggedIn && (
                        <Button
                            variant="outline"
                            onClick={logout}
                            className="hidden md:inline-flex"
                        >
                            Sair
                        </Button>
                    )}
                </div>
            </div>
        </header>
    )
}