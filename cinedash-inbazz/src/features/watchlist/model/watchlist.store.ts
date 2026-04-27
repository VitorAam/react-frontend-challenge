import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WatchlistMovie } from './watchlist.types'

type WatchlistState = {
    items: WatchlistMovie[]
}

type WatchlistActions = {
    add: (movie: Omit<WatchlistMovie, 'addedAt'>) => void
    remove: (id: number) => void
    toggle: (movie: Omit<WatchlistMovie, 'addedAt'>) => void
    clear: () => void
}

export const useWatchlistStore = create<WatchlistState & WatchlistActions>()(
    persist(
        (set, get) => ({
            items: [],

            add: (movie) => {
                if (get().items.some((item) => item.id === movie.id)) return
                set((state) => ({
                    items: [{ ...movie, addedAt: Date.now() }, ...state.items],
                }))
            },

            remove: (id) =>
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                })),

            toggle: (movie) => {
                const exists = get().items.some((item) => item.id === movie.id)
                if (exists) {
                    get().remove(movie.id)
                } else {
                    get().add(movie)
                }
            },

            clear: () => set({ items: [] }),
        }),
        {
            name: 'watchlist-storage',
        }
    )
)

export const useIsInWatchlist = (movieId: number) =>
    useWatchlistStore((state) =>
        state.items.some((item) => item.id === movieId)
    )

export const useWatchlistCount = () =>
    useWatchlistStore((state) => state.items.length)
