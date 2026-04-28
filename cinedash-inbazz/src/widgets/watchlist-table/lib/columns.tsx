import { Link } from '@tanstack/react-router'
import { Trash2 } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'

import { getPosterUrl } from '@/entities/movie'
import type { Genre } from '@/entities/genre'
import type { WatchlistMovie } from '@/features/watchlist'
import { Button } from '@/shared/ui/button'
import { formatDate, formatRating } from '@/shared/lib/format'

type BuildOptions = {
    genresById: Record<number, string>
    onRemove: (id: number) => void
}

export const buildWatchlistColumns = ({
    genresById,
    onRemove,
}: BuildOptions): ColumnDef<WatchlistMovie>[] => [
    {
        id: 'title',
        accessorKey: 'title',
        header: 'Título',
        enableSorting: true,
        cell: ({ row }) => {
            const movie = row.original
            const poster = getPosterUrl(movie.poster_path, 'w92')

            return (
                <div className="flex items-center gap-3">
                    <div className="h-14 w-10 shrink-0 overflow-hidden rounded-sm bg-muted">
                        {poster ? (
                            <img
                                src={poster}
                                alt={movie.title}
                                loading="lazy"
                                className="h-full w-full object-cover"
                            />
                        ) : null}
                    </div>
                    <span className="font-medium leading-tight">
                        {movie.title}
                    </span>
                </div>
            )
        },
    },
    {
        id: 'genre',
        header: 'Gênero',
        enableSorting: true,
        accessorFn: (movie) => {
            const first = movie.genre_ids[0]
            return first ? genresById[first] ?? '' : ''
        },
        cell: ({ row }) => {
            const ids = row.original.genre_ids
            if (!ids?.length) {
                return <span className="text-muted-foreground">—</span>
            }
            const names = ids
                .slice(0, 2)
                .map((id) => genresById[id])
                .filter(Boolean)
            return (
                <div className="flex flex-wrap gap-1">
                    {names.map((name) => (
                        <span
                            key={name}
                            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            )
        },
    },
    {
        id: 'release_date',
        accessorKey: 'release_date',
        header: 'Lançamento',
        enableSorting: false,
        cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    {
        id: 'rating',
        accessorKey: 'vote_average',
        header: 'Rating',
        enableSorting: true,
        cell: ({ getValue }) => (
            <span className="font-mono">
                {formatRating(getValue<number>())}
            </span>
        ),
    },
    {
        id: 'actions',
        header: () => <span className="sr-only">Ações</span>,
        enableSorting: false,
        cell: ({ row }) => {
            const movie = row.original
            return (
                <div className="flex justify-end gap-2">
                    <Button asChild variant="outline" size="sm" className="cursor-pointer">
                        <Link
                            to="/movie/$movieId"
                            params={{ movieId: String(movie.id) }}
                        >
                            Detalhes
                        </Link>
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => onRemove(movie.id)}
                        aria-label={`Remover ${movie.title} da lista`}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            )
        },
    },
]

export const buildGenreMap = (genres: Genre[] | undefined) => {
    if (!genres) return {}
    return genres.reduce<Record<number, string>>((acc, genre) => {
        acc[genre.id] = genre.name
        return acc
    }, {})
}
