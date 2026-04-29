import { Star } from 'lucide-react'

import {
    getBackdropUrl,
    getPosterUrl,
    type MovieDetails,
} from '@/entities/movie'
import { SmartImage } from '@/shared/ui/image'
import { formatDate, formatRating } from '@/shared/lib/format'
import { WatchlistToggle } from '@/features/watchlist'

import { formatRuntime } from '../lib/format-runtime'

type MovieHeroProps = {
    movie: MovieDetails
}

export const MovieHero = ({ movie }: MovieHeroProps) => {
    const backdrop = getBackdropUrl(movie.backdrop_path, 'original')
    const poster = getPosterUrl(movie.poster_path, 'w500')

    return (
        <section className="relative min-h-90 overflow-hidden rounded-xl border bg-card md:min-h-105">
            <div className="pointer-events-none absolute inset-0 z-0">
                {backdrop && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-25 dark:opacity-30"
                        style={{ backgroundImage: `url(${backdrop})` }}
                        aria-hidden
                    />
                )}
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/85 to-background/50" />
            </div>

            <div className="relative z-10 grid gap-6 p-6 md:grid-cols-[220px_1fr] md:gap-8 md:p-10">
                <div className="hidden md:block">
                    <SmartImage
                        src={poster}
                        alt={`Pôster de ${movie.title}`}
                        loading="eager"
                        wrapperClassName="aspect-2/3 w-full rounded-lg bg-muted shadow-lg ring-1 ring-foreground/10"
                        className="object-cover"
                    />
                </div>

                <div className="flex flex-col gap-4">
                    <div className="space-y-1">
                        <h1 className="font-heading text-3xl font-semibold leading-tight md:text-4xl">
                            {movie.title}
                        </h1>
                        {movie.original_title !== movie.title && (
                            <p className="text-sm text-muted-foreground">
                                {movie.original_title}
                            </p>
                        )}
                        {movie.tagline && (
                            <p className="pt-2 text-sm italic text-muted-foreground">
                                “{movie.tagline}”
                            </p>
                        )}
                    </div>

                    <dl className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                        <div className="flex items-center gap-1.5">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <dt className="sr-only">Avaliação</dt>
                            <dd className="font-medium">
                                {formatRating(movie.vote_average)}
                            </dd>
                            <span className="text-muted-foreground">
                                ({movie.vote_count.toLocaleString('pt-BR')})
                            </span>
                        </div>
                        <div>
                            <dt className="sr-only">Lançamento</dt>
                            <dd>{formatDate(movie.release_date)}</dd>
                        </div>
                        <div>
                            <dt className="sr-only">Duração</dt>
                            <dd>{formatRuntime(movie.runtime)}</dd>
                        </div>
                    </dl>

                    {movie.genres.length > 0 && (
                        <ul className="flex flex-wrap gap-2">
                            {movie.genres.map((genre) => (
                                <li
                                    key={genre.id}
                                    className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                                >
                                    {genre.name}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                        <WatchlistToggle
                            size="lg"
                            className="cursor-pointer"
                            movie={{
                                id: movie.id,
                                title: movie.title,
                                poster_path: movie.poster_path,
                                release_date: movie.release_date,
                                vote_average: movie.vote_average,
                                genre_ids: movie.genres.map((g) => g.id),
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
