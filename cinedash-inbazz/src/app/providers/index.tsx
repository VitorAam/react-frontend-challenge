import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './router'
import { RouterProvider } from '@tanstack/react-router';
import { ThemeProvider } from './theme-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
  },
})

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}