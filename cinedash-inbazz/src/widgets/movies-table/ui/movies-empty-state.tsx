type MoviesEmptyStateProps = {
    title: string
    description?: string
}

export const MoviesEmptyState = ({
    title,
    description,
}: MoviesEmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-card/40 p-10 text-center">
            <p className="text-base font-medium">{title}</p>
            {description && (
                <p className="max-w-md text-sm text-muted-foreground">
                    {description}
                </p>
            )}
        </div>
    )
}
