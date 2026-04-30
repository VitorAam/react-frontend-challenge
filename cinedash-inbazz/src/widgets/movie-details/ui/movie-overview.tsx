type MovieOverviewProps = {
    overview: string
}

export const MovieOverview = ({ overview }: MovieOverviewProps) => {
    return (
        <section className="space-y-3 rounded-xl border bg-card p-6">
            <h2 className="font-heading text-xl font-semibold">Sinopse</h2>
            {overview ? (
                <p className="text-base leading-relaxed text-muted-foreground">
                    {overview}
                </p>
            ) : (
                <p className="text-sm italic text-muted-foreground">
                    Sinopse não disponível.
                </p>
            )}
        </section>
    )
}
