import { describe, it, expect } from 'vitest'
import { loginSchema } from './auth.schema'

describe('loginSchema', () => {
    it('aceita um payload válido (email + senha com mais de 6 caracteres)', () => {
        const result = loginSchema.safeParse({
            email: 'curador@cinedash.io',
            password: 'senha-forte-123',
        })

        expect(result.success).toBe(true)
        if (result.success) {
            expect(result.data).toEqual({
                email: 'curador@cinedash.io',
                password: 'senha-forte-123',
            })
        }
    })

    it('rejeita quando o email não tem formato válido', () => {
        const result = loginSchema.safeParse({
            email: 'nao-eh-email',
            password: '1234567',
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            const emailIssue = result.error.issues.find((issue) =>
                issue.path.includes('email')
            )
            expect(emailIssue?.message).toBe('Email inválido')
        }
    })

    it('rejeita quando a senha tem menos de 6 caracteres', () => {
        const result = loginSchema.safeParse({
            email: 'ok@cinedash.io',
            password: '12345',
        })

        expect(result.success).toBe(false)
        if (!result.success) {
            const passwordIssue = result.error.issues.find((issue) =>
                issue.path.includes('password')
            )
            expect(passwordIssue?.message).toBe('Senha inválida')
        }
    })

    it('reporta erros de email e senha simultaneamente quando ambos forem inválidos', () => {
        const result = loginSchema.safeParse({ email: 'foo', password: '' })

        expect(result.success).toBe(false)
        if (!result.success) {
            const fields = result.error.issues.map((issue) => issue.path[0])
            expect(fields).toContain('email')
            expect(fields).toContain('password')
        }
    })

    it('rejeita quando os campos estão ausentes', () => {
        const result = loginSchema.safeParse({})
        expect(result.success).toBe(false)
    })
})
