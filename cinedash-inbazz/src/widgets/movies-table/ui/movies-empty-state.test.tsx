import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import { MoviesEmptyState } from './movies-empty-state'

describe('<MoviesEmptyState />', () => {
    it('renderiza apenas o título quando não há descrição/children', () => {
        render(<MoviesEmptyState title="Nenhum filme encontrado" />)

        expect(screen.getByText('Nenhum filme encontrado')).toBeInTheDocument()
        expect(
            screen.queryByText('Tente alterar os filtros aplicados')
        ).not.toBeInTheDocument()
    })

    it('renderiza a descrição quando informada', () => {
        render(
            <MoviesEmptyState
                title="Nenhum resultado"
                description="Tente alterar os filtros aplicados."
            />
        )

        expect(screen.getByText('Tente alterar os filtros aplicados.')).toBeInTheDocument()
    })

    it('renderiza children quando passados (ex.: botão de reset)', () => {
        render(
            <MoviesEmptyState title="Nenhum resultado">
                <button type="button">Limpar filtros</button>
            </MoviesEmptyState>
        )

        expect(screen.getByRole('button', { name: /limpar filtros/i })).toBeInTheDocument()
    })
})
