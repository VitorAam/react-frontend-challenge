import { Link } from '@tanstack/react-router'
import { Star } from 'lucide-react'

import type { Movie } from '@/entities/movie'
import { getPosterUrl } from '@/entities/movie'
import { Button } from '@/shared/ui/button'
import { SmartImage } from '@/shared/ui/image'
import { formatDate, formatRating } from '@/shared/lib/format'

type MoviesCardListProps = {
    data: Movie[]
    genresById: Record<number, string>
}

export const MoviesCardList = ({ data, genresById }: MoviesCardListProps) => {
    return (
        <ul className="flex flex-col gap-3">
            {data.map((movie) => {
                const poster = getPosterUrl(movie.poster_path, 'w185')
                const genres = movie.genre_ids
                    .slice(0, 2)
                    .map((id) => genresById[id])
                    .filter(Boolean)

                return (
                    <li
                        key={movie.id}
                        className="flex gap-3 rounded-lg border bg-card p-3"
                    >
                        <SmartImage
                            src={poster}
                            alt={movie.title}
                            loading="lazy"
                            wrapperClassName="h-24 w-16 shrink-0 rounded-sm bg-muted"
                            className="object-cover"
                        />

                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="space-y-0.5">
                                <p className="truncate font-medium leading-tight">
                                    {movie.title}
                                </p>
                                {movie.original_title !== movie.title && (
                                    <p className="truncate text-xs text-muted-foreground">
                                        {movie.original_title}
                                    </p>
                                )}
                            </div>

                            {genres.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {genres.map((name) => (
                                        <span
                                            key={name}
                                            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                                        >
                                            {name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-center justify-between gap-2 pt-1">
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                        <span className="font-mono text-foreground">
                                            {formatRating(movie.vote_average)}
                                        </span>
                                    </span>
                                    <span>{formatDate(movie.release_date)}</span>
                                </div>

                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="cursor-pointer"
                                >
                                    <Link
                                        to="/movie/$movieId"
                                        params={{ movieId: String(movie.id) }}
                                    >
                                        Detalhes
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
