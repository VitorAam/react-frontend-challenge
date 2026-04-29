import { describe, it, expect } from 'vitest'
import type { MovieVideo } from '@/entities/movie'
import { pickBestTrailer, buildYoutubeEmbedUrl } from './pick-trailer'

const makeVideo = (overrides: Partial<MovieVideo>): MovieVideo => ({
    id: 'id',
    key: 'abc',
    name: 'Trailer',
    site: 'YouTube',
    type: 'Trailer',
    official: false,
    iso_639_1: 'en',
    published_at: '2024-01-01',
    ...overrides,
})

describe('pickBestTrailer', () => {
    it('retorna null quando não há vídeos', () => {
        expect(pickBestTrailer(undefined)).toBeNull()
        expect(pickBestTrailer({ results: [] })).toBeNull()
    })

    it('descarta vídeos que não são do YouTube', () => {
        const result = pickBestTrailer({
            results: [
                makeVideo({ id: 'vimeo', site: 'Vimeo', type: 'Trailer' }),
            ],
        })
        expect(result).toBeNull()
    })

    it('prioriza Trailer sobre Teaser/Clip/Featurette', () => {
        const teaser = makeVideo({ id: 'teaser', type: 'Teaser' })
        const trailer = makeVideo({ id: 'trailer', type: 'Trailer' })
        const clip = makeVideo({ id: 'clip', type: 'Clip' })

        const best = pickBestTrailer({ results: [teaser, clip, trailer] })
        expect(best?.id).toBe('trailer')
    })

    it('prefere o vídeo oficial em caso de empate de tipo', () => {
        const fan = makeVideo({ id: 'fan', type: 'Trailer', official: false })
        const official = makeVideo({
            id: 'official',
            type: 'Trailer',
            official: true,
        })

        const best = pickBestTrailer({ results: [fan, official] })
        expect(best?.id).toBe('official')
    })

    it('prefere idioma pt > en quando o resto empata', () => {
        const en = makeVideo({
            id: 'en',
            type: 'Trailer',
            official: true,
            iso_639_1: 'en',
        })
        const pt = makeVideo({
            id: 'pt',
            type: 'Trailer',
            official: true,
            iso_639_1: 'pt',
        })

        const best = pickBestTrailer({ results: [en, pt] })
        expect(best?.id).toBe('pt')
    })
})

describe('buildYoutubeEmbedUrl', () => {
    it('monta a URL de embed do YouTube com a key informada', () => {
        expect(buildYoutubeEmbedUrl('dQw4w9WgXcQ')).toBe(
            'https://www.youtube.com/embed/dQw4w9WgXcQ'
        )
    })
})
