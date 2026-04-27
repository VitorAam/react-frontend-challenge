export const buildYearOptions = (
    fromYear: number = new Date().getFullYear()
): number[] => {
    const years: number[] = []
    for (let year = fromYear; year >= 1950; year--) {
        years.push(year)
    }
    return years
}

export const RATING_OPTIONS = [9, 8, 7, 6, 5] as const
