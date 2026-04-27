const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'original'

export const getPosterUrl = (
    path: string | null | undefined,
    size: PosterSize = 'w92'
): string | null => (path ? `${IMAGE_BASE_URL}/${size}${path}` : null)
