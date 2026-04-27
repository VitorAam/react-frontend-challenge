import { tmdbFetch } from '@/shared/api'
import type { MoviesQueryFilters, MoviesResponse } from '../model/movie.types'

const LANGUAGE = 'pt-BR'
const REGION = 'BR'

export const fetchMovies = (
    filters: MoviesQueryFilters,
    signal?: AbortSignal
): Promise<MoviesResponse> => {
    const { search, page, genreId, year, minRating, sortBy } = filters

    if (search && search.trim().length > 0) {
        return tmdbFetch<MoviesResponse>(
            '/search/movie',
            {
                language: LANGUAGE,
                region: REGION,
                include_adult: false,
                query: search,
                page,
                primary_release_year: year,
            },
            { signal }
        )
    }

    return tmdbFetch<MoviesResponse>(
        '/discover/movie',
        {
            language: LANGUAGE,
            region: REGION,
            include_adult: false,
            page,
            sort_by: sortBy ?? 'popularity.desc',
            with_genres: genreId,
            primary_release_year: year,
            'vote_average.gte': minRating,
            'vote_count.gte': minRating ? 50 : undefined,
        },
        { signal }
    )
}
