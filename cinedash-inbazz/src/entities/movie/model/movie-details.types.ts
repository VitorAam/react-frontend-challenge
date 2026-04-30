export type MovieDetailsGenre = {
    id: number
    name: string
}

export type CastMember = {
    id: number
    name: string
    character: string
    profile_path: string | null
    order: number
}

export type CrewMember = {
    id: number
    name: string
    job: string
    department: string
    profile_path: string | null
}

export type MovieCredits = {
    cast: CastMember[]
    crew: CrewMember[]
}

export type MovieVideoSite = 'YouTube' | 'Vimeo'

export type MovieVideoType =
    | 'Trailer'
    | 'Teaser'
    | 'Clip'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Bloopers'

export type MovieVideo = {
    id: string
    key: string
    name: string
    site: MovieVideoSite
    type: MovieVideoType
    official: boolean
    iso_639_1: string
    published_at: string
}

export type MovieVideos = {
    results: MovieVideo[]
}

export type ProductionCompany = {
    id: number
    name: string
    logo_path: string | null
    origin_country: string
}

export type MovieDetails = {
    id: number
    title: string
    original_title: string
    overview: string
    tagline: string
    poster_path: string | null
    backdrop_path: string | null
    release_date: string
    runtime: number | null
    status: string
    homepage: string
    vote_average: number
    vote_count: number
    popularity: number
    genres: MovieDetailsGenre[]
    production_companies: ProductionCompany[]
    spoken_languages: { iso_639_1: string; name: string }[]
    credits: MovieCredits
    videos: MovieVideos
}
