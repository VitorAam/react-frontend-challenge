import { Skeleton } from '@/shared/ui/skeleton'

export const MovieDetailsSkeleton = () => {
    return (
        <div className="space-y-6">
            <section className="rounded-xl border bg-card p-6 md:p-10">
                <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-8">
                    <Skeleton className="hidden aspect-2/3 w-full md:block" />
                    <div className="space-y-4">
                        <Skeleton className="h-9 w-2/3" />
                        <Skeleton className="h-4 w-1/3" />
                        <div className="flex gap-3">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-4 w-20" />
                        </div>
                        <div className="flex gap-2 pt-2">
                            <Skeleton className="h-6 w-20 rounded-full" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-10 w-44 rounded-md" />
                    </div>
                </div>
            </section>

            <section className="space-y-3 rounded-xl border bg-card p-6">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-9/12" />
            </section>

            <section className="space-y-4 rounded-xl border bg-card p-6">
                <Skeleton className="h-6 w-24" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={'skeleton-cast-' + i}
                            className="flex flex-col items-center gap-2"
                        >
                            <Skeleton className="aspect-square w-full rounded-full" />
                            <Skeleton className="h-3 w-3/4" />
                            <Skeleton className="h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
