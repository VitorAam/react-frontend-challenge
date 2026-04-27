import { Bookmark, BookmarkCheck } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
    useIsInWatchlist,
    useWatchlistStore,
} from '../model/watchlist.store'
import type { WatchlistMovie } from '../model/watchlist.types'

type WatchlistToggleProps = {
    movie: Omit<WatchlistMovie, 'addedAt'>
    size?: 'default' | 'sm' | 'lg'
    className?: string
}

export const WatchlistToggle = ({
    movie,
    size = 'default',
    className,
}: WatchlistToggleProps) => {
    const isInWatchlist = useIsInWatchlist(movie.id)
    const toggle = useWatchlistStore((state) => state.toggle)

    return (
        <Button
            variant={isInWatchlist ? 'secondary' : 'default'}
            size={size}
            onClick={() => toggle(movie)}
            aria-pressed={isInWatchlist}
            className={className}
        >
            {isInWatchlist ? (
                <span className="flex items-center gap-2">
                    <BookmarkCheck className="h-4 w-4" />
                    Na minha lista
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    <Bookmark className="h-4 w-4" />
                    Adicionar à lista
                </span>
            )}
        </Button>
    )
}
