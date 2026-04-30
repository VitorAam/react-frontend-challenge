const PT_BR = 'pt-BR'

const dateFormatter = new Intl.DateTimeFormat(PT_BR, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
})

export const formatDate = (
    raw: string | null | undefined,
    fallback = '—'
): string => {
    if (!raw) return fallback
    const date = new Date(raw)
    if (Number.isNaN(date.getTime())) return raw
    return dateFormatter.format(date)
}

const numberFormatter = new Intl.NumberFormat(PT_BR, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
})

export const formatRating = (
    value: number | null | undefined,
    fallback = '—'
): string => {
    if (value === null || value === undefined || value === 0) return fallback
    return numberFormatter.format(value)
}
