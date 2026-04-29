import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

const setup = (
    props: Partial<React.ComponentProps<typeof Pagination>> = {}
) => {
    const onChange = vi.fn()
    const utils = render(
        <Pagination
            page={2}
            totalPages={10}
            onChange={onChange}
            {...props}
        />
    )
    return { ...utils, onChange }
}

const matchPaginaXdeY =
    (current: number, total: number) =>
        (_text: string, element: Element | null) => {
            if (!element) return false
            const normalized = element.textContent
                ?.replaceAll(/\s+/g, ' ')
                .trim()
            return normalized === `Página ${current} de ${total}`
        }

describe('<Pagination />', () => {
    it('mostra "Página X de Y" com o total ajustado', () => {
        setup({ page: 3, totalPages: 25 })
        expect(screen.getByText(matchPaginaXdeY(3, 25))).toBeInTheDocument()
    })

    it('limita o total de páginas em TMDB_MAX_PAGE (500)', () => {
        setup({ page: 1, totalPages: 9999 })
        expect(screen.getByText(matchPaginaXdeY(1, 500))).toBeInTheDocument()
    })

    it('exibe "1" quando o total é 0 (fallback)', () => {
        setup({ page: 1, totalPages: 0 })
        expect(screen.getByText(matchPaginaXdeY(1, 1))).toBeInTheDocument()
    })

    it('desabilita "Primeira"/"Anterior" na primeira página', () => {
        setup({ page: 1, totalPages: 10 })
        expect(screen.getByRole('button', { name: /primeira/i })).toBeDisabled()
        expect(screen.getByRole('button', { name: /anterior/i })).toBeDisabled()
        expect(
            screen.getByRole('button', { name: /próxima/i })
        ).not.toBeDisabled()
    })

    it('desabilita "Próxima"/"Última" na última página', () => {
        setup({ page: 10, totalPages: 10 })
        expect(screen.getByRole('button', { name: /próxima/i })).toBeDisabled()
        expect(screen.getByRole('button', { name: /última/i })).toBeDisabled()
        expect(
            screen.getByRole('button', { name: /anterior/i })
        ).not.toBeDisabled()
    })

    it('chama onChange com page+1 ao clicar em "Próxima"', async () => {
        const user = userEvent.setup()
        const { onChange } = setup({ page: 2, totalPages: 10 })

        await user.click(screen.getByRole('button', { name: /próxima/i }))

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(3)
    })

    it('chama onChange com page-1 ao clicar em "Anterior"', async () => {
        const user = userEvent.setup()
        const { onChange } = setup({ page: 4, totalPages: 10 })

        await user.click(screen.getByRole('button', { name: /anterior/i }))

        expect(onChange).toHaveBeenCalledWith(3)
    })

    it('chama onChange com 1 em "Primeira" e com o total em "Última"', async () => {
        const user = userEvent.setup()
        const { onChange } = setup({ page: 5, totalPages: 12 })

        await user.click(screen.getByRole('button', { name: /primeira/i }))
        expect(onChange).toHaveBeenLastCalledWith(1)

        await user.click(screen.getByRole('button', { name: /última/i }))
        expect(onChange).toHaveBeenLastCalledWith(12)
    })

    it('exibe "atualizando…" quando isFetching for true', () => {
        setup({ page: 1, totalPages: 10, isFetching: true })
        expect(screen.getByText(/atualizando/i)).toBeInTheDocument()
    })

    it('não exibe "atualizando…" por padrão', () => {
        setup({ page: 1, totalPages: 10 })
        expect(screen.queryByText(/atualizando/i)).not.toBeInTheDocument()
    })
})
