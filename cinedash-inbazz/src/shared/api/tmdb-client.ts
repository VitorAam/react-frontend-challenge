const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL as string | undefined
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string | undefined

if (!TMDB_BASE_URL || !TMDB_API_KEY) {
    console.warn(
        '[tmdb-client] VITE_TMDB_BASE_URL ou VITE_TMDB_API_KEY ausentes. Verifique seu .env.'
    )
}

export class TmdbApiError extends Error {
    public readonly status: number
    public readonly url: string

    constructor(message: string, status: number, url: string) {
        super(message)
        this.name = 'TmdbApiError'
        this.status = status
        this.url = url
    }
}

type QueryValue = string | number | boolean | undefined | null

export type TmdbQueryParams = Record<string, QueryValue>

const buildUrl = (path: string, params?: TmdbQueryParams): string => {
    const url = new URL(`${TMDB_BASE_URL ?? ''}${path}`)

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') return
            url.searchParams.append(key, String(value))
        })
    }

    return url.toString()
}

export const tmdbFetch = async <T>(
    path: string,
    params?: TmdbQueryParams,
    init?: RequestInit
): Promise<T> => {
    const url = buildUrl(path, params)

    const response = await fetch(url, {
        ...init,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${TMDB_API_KEY ?? ''}`,
            ...(init?.headers),
        },
    })

    if (!response.ok) {
        throw new TmdbApiError(
            `TMDB request failed: ${response.statusText}`,
            response.status,
            url
        )
    }

    return (await response.json()) as T
}
