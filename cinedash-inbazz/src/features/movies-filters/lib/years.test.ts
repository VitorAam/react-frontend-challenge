import { describe, it, expect } from 'vitest'
import { buildYearOptions } from './years'

describe('buildYearOptions', () => {
    it('retorna anos em ordem decrescente até 1950', () => {
        const years = buildYearOptions(2026)
        expect(years[0]).toBe(2026)
        expect(years.at(-1)).toBe(1950)
        expect(years).toHaveLength(2026 - 1950 + 1)
    })

    it('mantém estritamente decrescente', () => {
        const years = buildYearOptions(2010)
        for (let index = 1; index < years.length; index++) {
            expect(years[index]).toBeLessThan(years[index - 1] as number)
        }
    })

    it('usa o ano atual quando nenhum argumento é passado', () => {
        const currentYear = new Date().getFullYear()
        expect(buildYearOptions()[0]).toBe(currentYear)
    })
})
