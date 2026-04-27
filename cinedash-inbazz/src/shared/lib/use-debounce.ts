import { useEffect, useState } from 'react'

export const useDebounce = <T>(value: T, delay = 400): T => {
    const [debounced, setDebounced] = useState(value)

    useEffect(() => {
        const timer = globalThis.window.setTimeout(() => setDebounced(value), delay)
        return () => globalThis.window.clearTimeout(timer)
    }, [value, delay])

    return debounced
}
