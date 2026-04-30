import type { MovieVideo, MovieVideos } from '@/entities/movie'

const TYPE_PRIORITY: MovieVideo['type'][] = [
    'Trailer',
    'Teaser',
    'Clip',
    'Featurette',
]

const score = (video: MovieVideo): number => {
    if (video.site !== 'YouTube') return -1

    const typeIndex = TYPE_PRIORITY.indexOf(video.type)
    const typeScore = typeIndex === -1 ? 0 : TYPE_PRIORITY.length - typeIndex

    const officialScore = video.official ? 10 : 0
    const ptScore = video.iso_639_1 === 'pt' ? 5 : 0
    const enScore = video.iso_639_1 === 'en' ? 2 : 0

    return typeScore * 100 + officialScore + ptScore + enScore
}

export const pickBestTrailer = (
    videos: MovieVideos | undefined
): MovieVideo | null => {
    if (!videos?.results?.length) return null

    const sorted = [...videos.results].sort((a, b) => score(b) - score(a))
    const best = sorted[0]
    return best && score(best) > 0 ? best : null
}

export const buildYoutubeEmbedUrl = (key: string) =>
    `https://www.youtube.com/embed/${key}`
