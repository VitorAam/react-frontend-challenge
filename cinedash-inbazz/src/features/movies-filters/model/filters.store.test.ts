import { describe, it, expect, beforeEach } from 'vitest'
import { useMoviesFiltersStore } from './filters.store'

const INITIAL = {
    search: '',
    genreId: undefined as number | undefined,
    year: undefined as number | undefined,
    minRating: undefined as number | undefined,
    sortBy: 'popularity.desc' as const,
    page: 1,
}

describe('useMoviesFiltersStore', () => {
    beforeEach(() => {
        useMoviesFiltersStore.setState(INITIAL)
    })

    it('expõe valores iniciais previsíveis', () => {
        const state = useMoviesFiltersStore.getState()
        expect(state.search).toBe('')
        expect(state.genreId).toBeUndefined()
        expect(state.year).toBeUndefined()
        expect(state.minRating).toBeUndefined()
        expect(state.sortBy).toBe('popularity.desc')
        expect(state.page).toBe(1)
    })

    it('reseta a paginação para 1 ao alterar a busca', () => {
        useMoviesFiltersStore.setState({ page: 4 })
        useMoviesFiltersStore.getState().setSearch('matrix')

        expect(useMoviesFiltersStore.getState().search).toBe('matrix')
        expect(useMoviesFiltersStore.getState().page).toBe(1)
    })

    it('reseta a paginação para 1 ao alterar o gênero', () => {
        useMoviesFiltersStore.setState({ page: 3 })
        useMoviesFiltersStore.getState().setGenreId(28)

        expect(useMoviesFiltersStore.getState().genreId).toBe(28)
        expect(useMoviesFiltersStore.getState().page).toBe(1)
    })

    it('reseta a paginação para 1 ao alterar o ano e a nota mínima', () => {
        useMoviesFiltersStore.setState({ page: 5 })
        useMoviesFiltersStore.getState().setYear(2023)
        expect(useMoviesFiltersStore.getState().page).toBe(1)
        expect(useMoviesFiltersStore.getState().year).toBe(2023)

        useMoviesFiltersStore.setState({ page: 7 })
        useMoviesFiltersStore.getState().setMinRating(8)
        expect(useMoviesFiltersStore.getState().page).toBe(1)
        expect(useMoviesFiltersStore.getState().minRating).toBe(8)
    })

    it('atualiza apenas a página quando setPage é chamado', () => {
        useMoviesFiltersStore.getState().setSearch('matrix')
        useMoviesFiltersStore.getState().setPage(3)

        const state = useMoviesFiltersStore.getState()
        expect(state.page).toBe(3)
        expect(state.search).toBe('matrix')
    })

    it('reseta o estado completo via reset()', () => {
        useMoviesFiltersStore.getState().setSearch('matrix')
        useMoviesFiltersStore.getState().setGenreId(28)
        useMoviesFiltersStore.getState().setYear(2024)
        useMoviesFiltersStore.getState().setMinRating(7)
        useMoviesFiltersStore.getState().setPage(5)

        useMoviesFiltersStore.getState().reset()

        expect(useMoviesFiltersStore.getState()).toMatchObject(INITIAL)
    })
})
