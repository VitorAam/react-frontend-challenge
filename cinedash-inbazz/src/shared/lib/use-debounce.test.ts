import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './use-debounce'

describe('useDebounce', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('retorna o valor inicial imediatamente', () => {
        const { result } = renderHook(() => useDebounce('matrix', 400))
        expect(result.current).toBe('matrix')
    })

    it('aguarda o delay antes de propagar o novo valor', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 400),
            { initialProps: { value: 'matrix' } }
        )

        rerender({ value: 'matri' })
        rerender({ value: 'matr' })
        expect(result.current).toBe('matrix')

        act(() => {
            vi.advanceTimersByTime(399)
        })
        expect(result.current).toBe('matrix')

        act(() => {
            vi.advanceTimersByTime(1)
        })
        expect(result.current).toBe('matr')
    })

    it('reseta o timer quando o valor muda dentro do delay (debounce real)', () => {
        const { result, rerender } = renderHook(
            ({ value }) => useDebounce(value, 300),
            { initialProps: { value: 'a' } }
        )

        rerender({ value: 'ab' })
        act(() => {
            vi.advanceTimersByTime(200)
        })
        rerender({ value: 'abc' })
        act(() => {
            vi.advanceTimersByTime(200)
        })

        expect(result.current).toBe('a')

        act(() => {
            vi.advanceTimersByTime(100)
        })
        expect(result.current).toBe('abc')
    })
})
