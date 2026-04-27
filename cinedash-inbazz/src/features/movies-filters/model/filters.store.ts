import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type SortBy =
    | 'popularity.desc'
    | 'popularity.asc'
    | 'vote_average.desc'
    | 'vote_average.asc'
    | 'primary_release_date.desc'
    | 'primary_release_date.asc'

type MoviesFiltersState = {
    search: string
    genreId: number | undefined
    year: number | undefined
    minRating: number | undefined
    sortBy: SortBy
    page: number
}

type MoviesFiltersActions = {
    setSearch: (value: string) => void
    setGenreId: (value: number | undefined) => void
    setYear: (value: number | undefined) => void
    setMinRating: (value: number | undefined) => void
    setSortBy: (value: SortBy) => void
    setPage: (value: number) => void
    reset: () => void
}

const INITIAL_STATE: MoviesFiltersState = {
    search: '',
    genreId: undefined,
    year: undefined,
    minRating: undefined,
    sortBy: 'popularity.desc',
    page: 1,
}

export const useMoviesFiltersStore = create<
    MoviesFiltersState & MoviesFiltersActions
>()(
    persist(
        (set) => ({
            ...INITIAL_STATE,

            setSearch: (search) => set({ search, page: 1 }),
            setGenreId: (genreId) => set({ genreId, page: 1 }),
            setYear: (year) => set({ year, page: 1 }),
            setMinRating: (minRating) => set({ minRating, page: 1 }),
            setSortBy: (sortBy) => set({ sortBy, page: 1 }),
            setPage: (page) => set({ page }),
            reset: () => set(INITIAL_STATE),
        }),
        {
            name: 'movies-filters-storage',
        }
    )
)
