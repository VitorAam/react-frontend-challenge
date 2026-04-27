export const formatRuntime = (minutes: number | null | undefined): string => {
    if (!minutes || minutes <= 0) return '—'
    const hours = Math.floor(minutes / 60)
    const remaining = minutes % 60
    if (hours === 0) return `${remaining}min`
    if (remaining === 0) return `${hours}h`
    return `${hours}h ${remaining}min`
}
