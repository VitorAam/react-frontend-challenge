import { tmdbFetch } from '@/shared/api'
import type { MovieDetails } from '../model/movie-details.types'

export const fetchMovieDetails = (
    movieId: number,
    signal?: AbortSignal
): Promise<MovieDetails> =>
    tmdbFetch<MovieDetails>(
        `/movie/${movieId}`,
        {
            language: 'pt-BR',
            append_to_response: 'credits,videos',
            include_image_language: 'pt,en,null',
        },
        { signal }
    )
