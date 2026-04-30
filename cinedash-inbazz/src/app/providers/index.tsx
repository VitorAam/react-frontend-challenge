import {
    MutationCache,
    QueryCache,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { Toaster } from 'sonner'

import { useThemeStore } from '@/features/theme'
import { getErrorMessage, toast } from '@/shared/lib/toast'

import { router } from './router'
import { ThemeProvider } from './theme-provider'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60,
        },
    },
    queryCache: new QueryCache({
        onError: (error) => {
            toast.error('Erro na requisição', getErrorMessage(error))
        },
    }),
    mutationCache: new MutationCache({
        onError: (error) => {
            toast.error('Erro na operação', getErrorMessage(error))
        },
    }),
})

export const Providers = () => {
    const theme = useThemeStore((state) => state.theme)

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider />
            <RouterProvider router={router} />
            <Toaster
                richColors
                closeButton
                position="bottom-right"
                theme={theme}
            />
        </QueryClientProvider>
    )
}
