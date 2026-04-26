import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { router } from './router'
import { RouterProvider } from '@tanstack/react-router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, // 1 min
    },
  },
})

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}