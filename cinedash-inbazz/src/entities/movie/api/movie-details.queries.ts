import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './movies.queries'
import { fetchMovieDetails } from './movie-details.api'

export const movieDetailsKeys = {
    all: [...movieKeys.all, 'details'] as const,
    detail: (movieId: number) =>
        [...movieDetailsKeys.all, movieId] as const,
}

export const useMovieDetails = (movieId: number) =>
    useQuery({
        queryKey: movieDetailsKeys.detail(movieId),
        queryFn: ({ signal }) => fetchMovieDetails(movieId, signal),
        staleTime: 1000 * 60 * 10,
        enabled: Number.isFinite(movieId) && movieId > 0,
    })
