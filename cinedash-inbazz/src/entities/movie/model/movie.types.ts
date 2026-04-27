export type Movie = {
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    vote_average: number
    vote_count: number
    genre_ids: number[]
    popularity: number
    adult: boolean
    original_language: string
}

export type PaginatedResponse<T> = {
    page: number
    results: T[]
    total_pages: number
    total_results: number
}

export type MoviesResponse = PaginatedResponse<Movie>

export type MoviesQueryFilters = {
    search?: string
    genreId?: number
    year?: number
    minRating?: number
    sortBy?: string
    page: number
}
