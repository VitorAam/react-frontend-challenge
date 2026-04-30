import { toast as sonnerToast } from 'sonner'

const DEFAULT_DURATION = 3500

export const toast = {
    success: (message: string, description?: string) =>
        sonnerToast.success(message, {
            description,
            duration: DEFAULT_DURATION,
        }),
    error: (message: string, description?: string) =>
        sonnerToast.error(message, {
            description,
            duration: DEFAULT_DURATION + 1500,
        }),
}

export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) return error.message
    if (typeof error === 'string') return error
    return 'Algo deu errado. Tente novamente em instantes.'
}
