import { describe, it, expect, beforeEach } from 'vitest'
import { act, renderHook } from '@testing-library/react'

import {
    useWatchlistStore,
    useIsInWatchlist,
    useWatchlistCount,
} from './watchlist.store'

const baseMovie = {
    id: 1,
    title: 'Cidade de Deus',
    poster_path: '/poster.jpg',
    release_date: '2002-08-30',
    vote_average: 8.6,
    genre_ids: [80, 18],
}

const otherMovie = {
    id: 2,
    title: 'Tropa de Elite',
    poster_path: '/elite.jpg',
    release_date: '2007-10-12',
    vote_average: 8.0,
    genre_ids: [28, 80],
}

describe('useWatchlistStore', () => {
    beforeEach(() => {
        useWatchlistStore.setState({ items: [] })
    })

    it('adiciona um filme com timestamp e mantém o mais recente no topo', () => {
        const { add } = useWatchlistStore.getState()

        act(() => {
            add(baseMovie)
            add(otherMovie)
        })

        const items = useWatchlistStore.getState().items
        expect(items).toHaveLength(2)
        expect(items[0]?.id).toBe(otherMovie.id)
        expect(items[1]?.id).toBe(baseMovie.id)
        expect(typeof items[0]?.addedAt).toBe('number')
    })

    it('não adiciona o mesmo filme duas vezes (dedupe pelo id)', () => {
        const { add } = useWatchlistStore.getState()

        act(() => {
            add(baseMovie)
            add(baseMovie)
        })

        expect(useWatchlistStore.getState().items).toHaveLength(1)
    })

    it('remove um filme pelo id', () => {
        const { add, remove } = useWatchlistStore.getState()

        act(() => {
            add(baseMovie)
            add(otherMovie)
            remove(baseMovie.id)
        })

        const items = useWatchlistStore.getState().items
        expect(items).toHaveLength(1)
        expect(items[0]?.id).toBe(otherMovie.id)
    })

    it('alterna a presença do filme com toggle', () => {
        const { toggle } = useWatchlistStore.getState()

        act(() => {
            toggle(baseMovie)
        })
        expect(useWatchlistStore.getState().items).toHaveLength(1)

        act(() => {
            toggle(baseMovie)
        })
        expect(useWatchlistStore.getState().items).toHaveLength(0)
    })

    it('limpa toda a watchlist com clear()', () => {
        const { add, clear } = useWatchlistStore.getState()

        act(() => {
            add(baseMovie)
            add(otherMovie)
            clear()
        })

        expect(useWatchlistStore.getState().items).toEqual([])
    })

    it('persiste o estado no localStorage (middleware persist)', () => {
        const { add } = useWatchlistStore.getState()

        act(() => {
            add(baseMovie)
        })

        const raw = window.localStorage.getItem('watchlist-storage')
        expect(raw).not.toBeNull()
        const parsed = JSON.parse(raw as string)
        expect(parsed.state.items).toHaveLength(1)
        expect(parsed.state.items[0].id).toBe(baseMovie.id)
    })

    it('useIsInWatchlist retorna true após adicionar o filme', () => {
        const { result: isIn } = renderHook(() => useIsInWatchlist(baseMovie.id))
        expect(isIn.current).toBe(false)

        act(() => {
            useWatchlistStore.getState().add(baseMovie)
        })

        expect(isIn.current).toBe(true)
    })

    it('useWatchlistCount reflete a quantidade de itens', () => {
        const { result: count } = renderHook(() => useWatchlistCount())
        expect(count.current).toBe(0)

        act(() => {
            useWatchlistStore.getState().add(baseMovie)
            useWatchlistStore.getState().add(otherMovie)
        })

        expect(count.current).toBe(2)
    })
})
