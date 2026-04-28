import type { ReactNode } from 'react'

type MoviesEmptyStateProps = {
    title: string
    description?: string
    children?: ReactNode
}

export const MoviesEmptyState = ({
    title,
    description,
    children,
}: MoviesEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-card/40 p-10 text-center">
            <p className="text-base font-medium">{title}</p>
            {description && (
                <p className="max-w-md text-sm text-muted-foreground">
                    {description}
                </p>
            )}
            {children}
        </div>
    )
}
