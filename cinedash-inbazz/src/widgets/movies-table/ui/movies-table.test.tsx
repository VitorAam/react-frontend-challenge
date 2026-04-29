import { describe, it, expect, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import type { Movie } from '@/entities/movie'

vi.mock('@/entities/genre', () => ({
    useMovieGenres: () => ({
        data: [
            { id: 18, name: 'Drama' },
            { id: 28, name: 'Ação' },
            { id: 80, name: 'Crime' },
        ],
        isLoading: false,
    }),
}))

vi.mock('@tanstack/react-router', () => ({
    Link: ({
        to,
        params,
        children,
        ...rest
    }: {
        to: string
        params?: Record<string, string>
        children: React.ReactNode
    }) => {
        const href = Object.entries(params ?? {}).reduce(
            (acc, [key, value]) => acc.replace(`$${key}`, value),
            to
        )
        return (
            <a href={href} {...rest}>
                {children}
            </a>
        )
    },
}))

import { MoviesTable } from './movies-table'

const movies: Movie[] = [
    {
        id: 1,
        title: 'Cidade de Deus',
        original_title: 'Cidade de Deus',
        overview: '',
        poster_path: '/poster1.jpg',
        backdrop_path: null,
        release_date: '2002-08-30T12:00:00',
        vote_average: 8.6,
        vote_count: 100,
        genre_ids: [80, 18],
        popularity: 100,
        adult: false,
        original_language: 'pt',
    },
    {
        id: 2,
        title: 'Tropa de Elite',
        original_title: 'Tropa de Elite',
        overview: '',
        poster_path: '/poster2.jpg',
        backdrop_path: null,
        release_date: '2007-10-12T12:00:00',
        vote_average: 8,
        vote_count: 80,
        genre_ids: [28, 80],
        popularity: 90,
        adult: false,
        original_language: 'pt',
    },
    {
        id: 3,
        title: 'Bacurau',
        original_title: 'Bacurau',
        overview: '',
        poster_path: null,
        backdrop_path: null,
        release_date: '2019-08-29T12:00:00',
        vote_average: 7.4,
        vote_count: 50,
        genre_ids: [],
        popularity: 75,
        adult: false,
        original_language: 'pt',
    },
]

const getRowTitles = () =>
    screen
        .getAllByRole('row')
        .slice(1)
        .map((row) => row.querySelector('td')?.textContent ?? '')

describe('<MoviesTable />', () => {
    it('renderiza os headers e a quantidade correta de linhas', () => {
        render(<MoviesTable data={movies} />)

        expect(
            screen.getByRole('columnheader', { name: "título" })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('columnheader', { name: "gênero" })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('columnheader', { name: "lançamento" })
        ).toBeInTheDocument()
        expect(
            screen.getByRole('columnheader', { name: "rating" })
        ).toBeInTheDocument()

        expect(screen.getAllByRole('row')).toHaveLength(1 + movies.length)
    })

    it('renderiza os títulos dos filmes nas linhas', () => {
        render(<MoviesTable data={movies} />)

        expect(screen.getByText('Cidade de Deus')).toBeInTheDocument()
        expect(screen.getByText('Tropa de Elite')).toBeInTheDocument()
        expect(screen.getByText('Bacurau')).toBeInTheDocument()
    })

    it('mostra os primeiros gêneros como chips usando o map vindo do hook', () => {
        render(<MoviesTable data={movies} />)

        expect(screen.getAllByText('Crime')).toHaveLength(2)
        expect(screen.getByText('Drama')).toBeInTheDocument()
        expect(screen.getByText('Ação')).toBeInTheDocument()
    })

    it('exibe "—" na coluna de gênero quando o filme não tem genre_ids', () => {
        render(<MoviesTable data={movies} />)

        const bacurauRow = screen.getByText('Bacurau').closest('tr')
        expect(bacurauRow).not.toBeNull()
        expect(
            within(bacurauRow as HTMLElement).getByText('—')
        ).toBeInTheDocument()
    })

    it('renderiza um link "Detalhes" apontando para /movie/:id em cada linha', () => {
        render(<MoviesTable data={movies} />)

        const detailsLinks = screen.getAllByRole('link', { name: "detalhes" })
        expect(detailsLinks).toHaveLength(movies.length)
        expect(detailsLinks[0]).toHaveAttribute('href', '/movie/1')
        expect(detailsLinks[1]).toHaveAttribute('href', '/movie/2')
    })

    it('alterna a ordenação por Rating ao clicar no header', async () => {
        const user = userEvent.setup()
        render(<MoviesTable data={movies} />)

        const ratingHeader = screen.getByRole('columnheader', {
            name: "rating",
        })

        await user.click(ratingHeader)
        let titles = getRowTitles()
        expect(titles[0]).toMatch("Cidade de Deus")
        expect(titles[2]).toMatch("Bacurau")

        await user.click(ratingHeader)
        titles = getRowTitles()
        expect(titles[0]).toMatch("Bacurau")
        expect(titles[2]).toMatch("Cidade de Deus")
    })

    it('ordena por Título com 2 cliques (asc -> desc)', async () => {
        const user = userEvent.setup()
        render(<MoviesTable data={movies} />)

        const titleHeader = screen.getByRole('columnheader', {
            name: "título",
        })

        await user.click(titleHeader)
        let titles = getRowTitles()
        expect(titles[0]).toMatch("Bacurau")
        expect(titles[1]).toMatch("Cidade de Deus")
        expect(titles[2]).toMatch("Tropa de Elite")

        await user.click(titleHeader)
        titles = getRowTitles()
        expect(titles[0]).toMatch("Tropa de Elite")
        expect(titles[2]).toMatch("Bacurau")
    })
})
