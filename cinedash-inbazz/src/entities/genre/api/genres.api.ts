import { tmdbFetch } from '@/shared/api'
import type { GenresResponse } from '../model/genre.types'

export const fetchMovieGenres = (signal?: AbortSignal) =>
    tmdbFetch<GenresResponse>(
        '/genre/movie/list',
        { language: 'pt-BR' },
        { signal }
    )
