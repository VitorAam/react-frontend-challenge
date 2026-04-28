import { Link, useParams } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'

import { useMovieDetails } from '@/entities/movie'
import { Button } from '@/shared/ui/button'
import { MoviesEmptyState } from '@/widgets/movies-table'
import {
    MovieCast,
    MovieDetailsSkeleton,
    MovieHero,
    MovieOverview,
    MovieTrailer,
} from '@/widgets/movie-details'

export const MovieDetailsPage = () => {
    const { movieId } = useParams({ strict: false }) as { movieId?: string }
    const numericId = Number(movieId)
    const isValidId = Number.isFinite(numericId) && numericId > 0

    const detailsQuery = useMovieDetails(numericId)
    const data = detailsQuery.data

    return (
        <div className="mx-auto flex h-full w-full max-w-6xl flex-col gap-6 p-6">
            <div className="flex items-center gap-3">
                <Button asChild variant="outline" size="sm">
                    <Link to="/movies">
                        <span className="flex items-center gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para a descoberta
                        </span>
                    </Link>
                </Button>
            </div>

            {!isValidId && (
                <MoviesEmptyState
                    title="Filme inválido"
                    description="O identificador informado na URL não é um número válido."
                />
            )}

            {isValidId && detailsQuery.isLoading && <MovieDetailsSkeleton />}

            {isValidId && detailsQuery.isError && (
                <MoviesEmptyState
                    title="Não foi possível carregar este filme"
                    description={
                        detailsQuery.error instanceof Error
                            ? detailsQuery.error.message
                            : 'Tente novamente em instantes.'
                    }
                />
            )}

            {isValidId && data && (
                <>
                    <MovieHero movie={data} />
                    <MovieOverview overview={data.overview} />
                    <MovieTrailer
                        videos={data.videos}
                        title={data.title}
                    />
                    <MovieCast cast={data.credits.cast} />
                </>
            )}
        </div>
    )
}
