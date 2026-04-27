const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

export type PosterSize = 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'original'

export type BackdropSize = 'w300' | 'w780' | 'w1280' | 'original'

export type ProfileSize = 'w45' | 'w185' | 'h632' | 'original'

const buildUrl = (path: string | null | undefined, size: string) =>
    path ? `${IMAGE_BASE_URL}/${size}${path}` : null

export const getPosterUrl = (
    path: string | null | undefined,
    size: PosterSize = 'w92'
) => buildUrl(path, size)

export const getBackdropUrl = (
    path: string | null | undefined,
    size: BackdropSize = 'w1280'
) => buildUrl(path, size)

export const getProfileUrl = (
    path: string | null | undefined,
    size: ProfileSize = 'w185'
) => buildUrl(path, size)
