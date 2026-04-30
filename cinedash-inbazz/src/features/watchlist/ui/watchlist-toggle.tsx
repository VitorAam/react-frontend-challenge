import { Bookmark, BookmarkCheck } from 'lucide-react'

import { Button } from '@/shared/ui/button'

import { useWatchlistActions } from '../lib/use-watchlist-actions'
import { useIsInWatchlist } from '../model/watchlist.store'
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
    const { add, remove } = useWatchlistActions()

    const handleClick = () => {
        if (isInWatchlist) {
            remove({ id: movie.id, title: movie.title })
        } else {
            add(movie)
        }
    }

    return (
        <Button
            variant={isInWatchlist ? 'secondary' : 'default'}
            size={size}
            onClick={handleClick}
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
