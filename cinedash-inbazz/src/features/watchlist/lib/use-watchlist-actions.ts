import { useCallback } from 'react'

import { getErrorMessage, toast } from '@/shared/lib/toast'

import { useWatchlistStore } from '../model/watchlist.store'
import type { WatchlistMovie } from '../model/watchlist.types'

type AddInput = Omit<WatchlistMovie, 'addedAt'>

export const useWatchlistActions = () => {
    const add = useWatchlistStore((state) => state.add)
    const remove = useWatchlistStore((state) => state.remove)
    const clear = useWatchlistStore((state) => state.clear)

    const addWithFeedback = useCallback(
        (movie: AddInput) => {
            try {
                add(movie)
                toast.success(
                    'Adicionado à sua lista',
                    `"${movie.title}" agora está na watchlist.`
                )
            } catch (error) {
                toast.error(
                    'Não foi possível adicionar à lista',
                    getErrorMessage(error)
                )
            }
        },
        [add]
    )

    const removeWithFeedback = useCallback(
        (movie: { id: number; title: string }) => {
            try {
                remove(movie.id)
                toast.success(
                    'Removido da sua lista',
                    `"${movie.title}" não está mais na watchlist.`
                )
            } catch (error) {
                toast.error(
                    'Não foi possível remover da lista',
                    getErrorMessage(error)
                )
            }
        },
        [remove]
    )

    const clearWithFeedback = useCallback(() => {
        try {
            clear()
            toast.success('Lista limpa', 'Todos os filmes foram removidos.')
        } catch (error) {
            toast.error('Não foi possível limpar a lista', getErrorMessage(error))
        }
    }, [clear])

    return {
        add: addWithFeedback,
        remove: removeWithFeedback,
        clear: clearWithFeedback,
    }
}
