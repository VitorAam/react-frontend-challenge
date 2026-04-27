import { useMemo } from 'react'

import type { MovieVideos } from '@/entities/movie'
import { buildYoutubeEmbedUrl, pickBestTrailer } from '../lib/pick-trailer'

type MovieTrailerProps = {
    videos: MovieVideos
    title: string
}

export const MovieTrailer = ({ videos, title }: MovieTrailerProps) => {
    const trailer = useMemo(() => pickBestTrailer(videos), [videos])

    if (!trailer) return null

    return (
        <section className="space-y-3 rounded-xl border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold">Trailer</h2>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black">
                <iframe
                    src={buildYoutubeEmbedUrl(trailer.key)}
                    title={`Trailer: ${title}`}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            </div>
        </section>
    )
}
