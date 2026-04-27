import { Link } from '@tanstack/react-router'
import type { ColumnDef } from '@tanstack/react-table'

import type { Movie } from '@/entities/movie'
import { getPosterUrl } from '@/entities/movie'
import type { Genre } from '@/entities/genre'
import { Button } from '@/shared/ui/button'
import { formatDate, formatRating } from '@/shared/lib/format'

export const buildMoviesColumns = (
    genresById: Record<number, string>
): ColumnDef<Movie>[] => [
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
                    <div className="flex flex-col">
                        <span className="font-medium leading-tight">
                            {movie.title}
                        </span>
                        {movie.original_title !== movie.title && (
                            <span className="text-xs text-muted-foreground">
                                {movie.original_title}
                            </span>
                        )}
                    </div>
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
        enableSorting: true,
        cell: ({ getValue }) => formatDate(getValue<string>()),
    },
    {
        id: 'rating',
        accessorKey: 'vote_average',
        header: 'Rating',
        enableSorting: true,
        cell: ({ getValue }) => (
            <span className="font-mono">{formatRating(getValue<number>())}</span>
        ),
    },
    {
        id: 'actions',
        header: () => <span className="sr-only">Ações</span>,
        enableSorting: false,
        cell: ({ row }) => (
            <div className="flex justify-end">
                <Button asChild variant="outline" size="sm" className="cursor-pointer">
                    <Link
                        to="/movie/$movieId"
                        params={{ movieId: String(row.original.id) }}
                    >
                        Detalhes
                    </Link>
                </Button>
            </div>
        ),
    },
]

export const buildGenreMap = (genres: Genre[] | undefined) => {
    if (!genres) return {}
    return genres.reduce<Record<number, string>>((acc, genre) => {
        acc[genre.id] = genre.name
        return acc
    }, {})
}
