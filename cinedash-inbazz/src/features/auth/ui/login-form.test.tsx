import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { LoginForm } from './login-form'
import { useAuthStore } from '../model/auth.store'

const navigateMock = vi.fn()

vi.mock('@tanstack/react-router', () => ({
    useNavigate: () => navigateMock,
}))

describe('<LoginForm />', () => {
    beforeEach(() => {
        navigateMock.mockReset()
        useAuthStore.setState({
            user: null,
            token: null,
            isAuthenticated: false,
        })
    })

    it('renderiza os campos de email/senha e o botão de submit', () => {
        render(<LoginForm />)

        expect(screen.getByLabelText("email")).toBeInTheDocument()
        expect(screen.getByLabelText("senha")).toBeInTheDocument()
        expect(
            screen.getByRole('button', { name: "entrar" })
        ).toBeInTheDocument()
    })

    it('exibe mensagens de erro quando o form é enviado vazio', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)

        await user.click(screen.getByRole('button', { name: "entrar" }))

        expect(await screen.findByText('Email inválido')).toBeInTheDocument()
        expect(screen.getByText('Senha inválida')).toBeInTheDocument()

        expect(useAuthStore.getState().isAuthenticated).toBe(false)
        expect(navigateMock).not.toHaveBeenCalled()
    })

    it('mostra erro de senha curta quando o usuário digita menos de 6 caracteres', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)

        await user.type(screen.getByLabelText("email"), 'curador@cine.io')
        await user.type(screen.getByLabelText("senha"), '123')
        await user.click(screen.getByRole('button', { name: "entrar" }))

        expect(await screen.findByText('Senha inválida')).toBeInTheDocument()
        expect(screen.queryByText('Email inválido')).not.toBeInTheDocument()
        expect(navigateMock).not.toHaveBeenCalled()
    })

    it('autentica e navega para /movies quando o payload é válido', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)

        await user.type(screen.getByLabelText("email"), 'curador@cine.io')
        await user.type(screen.getByLabelText("senha"), 'senha-segura')
        await user.click(screen.getByRole('button', { name: "entrar" }))

        await vi.waitFor(() => {
            expect(useAuthStore.getState().isAuthenticated).toBe(true)
        })
        expect(useAuthStore.getState().user).toEqual({
            email: 'curador@cine.io',
        })
        expect(useAuthStore.getState().token).toBe('fake-jwt-token')

        expect(navigateMock).toHaveBeenCalledTimes(1)
        expect(navigateMock).toHaveBeenCalledWith({ to: '/movies' })
    })
})
