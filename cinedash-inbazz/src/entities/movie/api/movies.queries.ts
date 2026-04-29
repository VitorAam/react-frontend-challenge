import { useQuery } from '@tanstack/react-query'
import { fetchMovies } from './movies.api'
import type { MoviesQueryFilters, MoviesResponse } from '../model/movie.types'

export const movieKeys = {
    all: ['movies'] as const,
    lists: () => [...movieKeys.all, 'list'] as const,
    list: (filters: MoviesQueryFilters) =>
        [...movieKeys.lists(), filters] as const,
}

const haveSameFilters = (
    a: MoviesQueryFilters,
    b: MoviesQueryFilters
): boolean =>
    a.search === b.search &&
    a.genreId === b.genreId &&
    a.year === b.year &&
    a.minRating === b.minRating &&
    a.sortBy === b.sortBy &&
    a.page === b.page

export const useMoviesQuery = (filters: MoviesQueryFilters) =>
    useQuery({
        queryKey: movieKeys.list(filters),
        queryFn: ({ signal }) => fetchMovies(filters, signal),
        placeholderData: (previousData: MoviesResponse | undefined, previousQuery) => {
            if (!previousData || !previousQuery) return undefined
            const previousFilters = previousQuery.queryKey[2]
            return haveSameFilters(previousFilters, filters)
                ? previousData
                : undefined
        },
        staleTime: 1000 * 60,
    })
