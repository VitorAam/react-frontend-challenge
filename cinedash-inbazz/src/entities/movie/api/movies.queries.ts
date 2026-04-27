import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { fetchMovies } from './movies.api'
import type { MoviesQueryFilters } from '../model/movie.types'

export const movieKeys = {
    all: ['movies'] as const,
    lists: () => [...movieKeys.all, 'list'] as const,
    list: (filters: MoviesQueryFilters) =>
        [...movieKeys.lists(), filters] as const,
}

export const useMoviesQuery = (filters: MoviesQueryFilters) =>
    useQuery({
        queryKey: movieKeys.list(filters),
        queryFn: ({ signal }) => fetchMovies(filters, signal),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60,
    })
