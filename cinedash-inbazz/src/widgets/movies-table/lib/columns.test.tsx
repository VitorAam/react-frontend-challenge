import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ColumnDefBase, Row } from '@tanstack/react-table'

import type { Movie } from '@/entities/movie'
import { buildGenreMap, buildMoviesColumns } from './columns'

const movieFixture: Movie = {
    id: 42,
    title: 'Cidade de Deus',
    original_title: 'Cidade de Deus',
    overview: '',
    poster_path: '/poster.jpg',
    backdrop_path: null,
    release_date: '2002-08-30T12:00:00',
    vote_average: 8.6,
    vote_count: 100,
    genre_ids: [80, 18],
    popularity: 100,
    adult: false,
    original_language: 'pt',
}

const GENRES_BY_ID: Record<number, string> = {
    18: 'Drama',
    28: 'Ação',
    80: 'Crime',
}

describe('buildGenreMap', () => {
    it('converte um array de gêneros em um Record { id: name }', () => {
        expect(
            buildGenreMap([
                { id: 28, name: 'Ação' },
                { id: 18, name: 'Drama' },
            ])
        ).toEqual({ 28: 'Ação', 18: 'Drama' })
    })

    it('retorna objeto vazio quando o input é undefined', () => {
        expect(buildGenreMap(undefined)).toEqual({})
    })
})

describe('buildMoviesColumns', () => {
    const columns = buildMoviesColumns(GENRES_BY_ID)

    it('expõe as colunas esperadas na ordem correta', () => {
        const ids = columns.map((column) => column.id)
        expect(ids).toEqual([
            'title',
            'genre',
            'release_date',
            'rating',
            'actions',
        ])
    })

    it('a coluna actions não permite ordenação', () => {
        const actions = columns.find((column) => column.id === 'actions')
        expect(actions?.enableSorting).toBe(false)
    })

    it('o accessorFn da coluna genre usa o nome do PRIMEIRO gênero do filme', () => {
        const genreColumn = columns.find((column) => column.id === 'genre') as
            | (ColumnDefBase<Movie> & {
                  accessorFn?: (movie: Movie, index: number) => string
              })
            | undefined

        expect(typeof genreColumn?.accessorFn).toBe('function')

        expect(genreColumn?.accessorFn?.(movieFixture, 0)).toBe('Crime')

        expect(
            genreColumn?.accessorFn?.({ ...movieFixture, genre_ids: [] }, 0)
        ).toBe('')

        expect(
            genreColumn?.accessorFn?.(
                { ...movieFixture, genre_ids: [9999] },
                0
            )
        ).toBe('')
    })
})

describe('Cells da coluna genre', () => {
    const columns = buildMoviesColumns(GENRES_BY_ID)
    const genreColumn = columns.find((column) => column.id === 'genre')

    const renderGenreCell = (movie: Movie) => {
        const cellRenderer = genreColumn?.cell
        if (typeof cellRenderer !== 'function') {
            throw new TypeError('cell renderer não definido')
        }
        const row = { original: movie } as unknown as Row<Movie>
        return render(<>{cellRenderer({ row } as never)}</>)
    }

    it('renderiza até 2 chips com os nomes dos primeiros gêneros', () => {
        renderGenreCell(movieFixture)

        expect(screen.getByText('Crime')).toBeInTheDocument()
        expect(screen.getByText('Drama')).toBeInTheDocument()
    })

    it('renderiza um traço (—) quando o filme não tem gêneros', () => {
        renderGenreCell({ ...movieFixture, genre_ids: [] })
        expect(screen.getByText('—')).toBeInTheDocument()
    })
})
