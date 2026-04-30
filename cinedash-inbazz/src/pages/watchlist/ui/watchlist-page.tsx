import { Link } from '@tanstack/react-router'

import { useWatchlistActions, useWatchlistStore } from '@/features/watchlist'
import { Button } from '@/shared/ui/button'
import { MoviesEmptyState } from '@/widgets/movies-table'
import { WatchlistTable } from '@/widgets/watchlist-table'

export const WatchlistPage = () => {
    const items = useWatchlistStore((state) => state.items)
    const { clear } = useWatchlistActions()
    const moviesText = items.length > 1 ? 'filmes salvos' : 'filme salvo'

    return (
        <div className="mx-auto flex min-h-full w-full max-w-7xl flex-col gap-6 p-6 pb-12">
            <header className="flex flex-wrap items-end justify-between gap-3">
                <div className="space-y-1">
                    <h1 className="font-heading text-3xl font-semibold">
                        Minha lista
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        {items.length === 0
                            ? 'Você ainda não tem filmes salvos.'
                            : `${items.length} ${moviesText}.`}
                    </p>
                </div>

                {items.length > 0 && (
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={clear}
                    >
                        Limpar lista
                    </Button>
                )}
            </header>

            {items.length === 0 ? (
                <MoviesEmptyState
                    title="Nada por aqui ainda"
                    description="Use o botão 'Adicionar à lista' nos detalhes de um filme para começar a montar sua curadoria."
                >
                    <Button asChild className="mt-3">
                        <Link to="/movies">Ir para a descoberta</Link>
                    </Button>
                </MoviesEmptyState>
            ) : (
                <WatchlistTable data={items} />
            )}
        </div>
    )
}
