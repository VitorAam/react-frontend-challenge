import { describe, it, expect } from 'vitest'
import { formatDate, formatRating } from './format'

describe('formatDate', () => {
    it('formata uma data no padrão pt-BR (DD/MM/AAAA)', () => {
        expect(formatDate('2002-08-30T12:00:00')).toBe('30/08/2002')
    })

    it('retorna o fallback padrão para valores nulos/indefinidos/string vazia', () => {
        expect(formatDate(null)).toBe('—')
        expect(formatDate(undefined)).toBe('—')
        expect(formatDate('')).toBe('—')
    })

    it('aceita um fallback customizado', () => {
        expect(formatDate(null, 'sem data')).toBe('sem data')
    })

    it('retorna o input original quando a data não puder ser parseada', () => {
        expect(formatDate('data-invalida')).toBe('data-invalida')
    })
})

describe('formatRating', () => {
    it('formata números com uma casa decimal', () => {
        expect(formatRating(8.567)).toBe('8,6')
        expect(formatRating(7)).toBe('7,0')
    })

    it('retorna o fallback quando o valor é nulo, indefinido ou zero', () => {
        expect(formatRating(null)).toBe('—')
        expect(formatRating(undefined)).toBe('—')
        expect(formatRating(0)).toBe('—')
    })

    it('aceita um fallback customizado', () => {
        expect(formatRating(0, 'N/D')).toBe('N/D')
    })
})
