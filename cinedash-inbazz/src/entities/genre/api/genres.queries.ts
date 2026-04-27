import { useQuery } from '@tanstack/react-query'
import { fetchMovieGenres } from './genres.api'

export const genreKeys = {
    all: ['genres'] as const,
    movies: () => [...genreKeys.all, 'movies'] as const,
}

export const useMovieGenres = () =>
    useQuery({
        queryKey: genreKeys.movies(),
        queryFn: ({ signal }) => fetchMovieGenres(signal),
        staleTime: 1000 * 60 * 60,
        select: (data) => data.genres,
    })
