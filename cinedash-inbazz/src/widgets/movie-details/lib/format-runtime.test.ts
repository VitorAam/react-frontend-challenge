import { describe, it, expect } from 'vitest'
import { formatRuntime } from './format-runtime'

describe('formatRuntime', () => {
    it('retorna fallback para valores ausentes ou inválidos', () => {
        expect(formatRuntime(null)).toBe('—')
        expect(formatRuntime(undefined)).toBe('—')
        expect(formatRuntime(0)).toBe('—')
        expect(formatRuntime(-15)).toBe('—')
    })

    it('formata duração menor que uma hora apenas em minutos', () => {
        expect(formatRuntime(45)).toBe('45min')
    })

    it('formata duração inteira em horas quando não há minutos extras', () => {
        expect(formatRuntime(120)).toBe('2h')
    })

    it('formata duração combinando horas e minutos', () => {
        expect(formatRuntime(150)).toBe('2h 30min')
        expect(formatRuntime(95)).toBe('1h 35min')
    })
})
