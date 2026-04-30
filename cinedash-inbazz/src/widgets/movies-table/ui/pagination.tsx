import { Button } from '@/shared/ui/button'

type PaginationProps = {
    page: number
    totalPages: number
    onChange: (page: number) => void
}

const TMDB_MAX_PAGE = 500

export const Pagination = ({
    page,
    totalPages,
    onChange,
}: PaginationProps) => {
    const safeTotal = Math.min(totalPages, TMDB_MAX_PAGE)
    const isFirst = page <= 1
    const isLast = page >= safeTotal

    return (
        <div className="flex items-center justify-between gap-2 pt-2 text-sm">
            <span className="text-muted-foreground">
                Página{' '}
                <strong className="text-foreground">{page}</strong> de{' '}
                <strong className="text-foreground">{safeTotal || 1}</strong>
            </span>

            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => onChange(1)}
                    disabled={isFirst}
                    aria-label="Primeira página"
                >
                    {'<<'}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => onChange(page - 1)}
                    disabled={isFirst}
                    aria-label="Página anterior"
                >
                    {'<'}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => onChange(page + 1)}
                    disabled={isLast}
                    aria-label="Próxima página"
                >
                    {'>'}
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={() => onChange(safeTotal)}
                    disabled={isLast}
                    aria-label="Última página"
                >
                    {'>>'}
                </Button>
            </div>
        </div>
    )
}
