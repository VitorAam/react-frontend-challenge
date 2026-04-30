import { useMoviesQuery } from '@/entities/movie'
import {
    MoviesFilters,
    useMoviesFiltersStore,
} from '@/features/movies-filters'
import {
    MoviesEmptyState,
    MoviesTable,
    MoviesTableSkeleton,
    Pagination,
} from '@/widgets/movies-table'

export const DashboardPage = () => {
    const search = useMoviesFiltersStore((s) => s.search)
    const genreId = useMoviesFiltersStore((s) => s.genreId)
    const year = useMoviesFiltersStore((s) => s.year)
    const minRating = useMoviesFiltersStore((s) => s.minRating)
    const sortBy = useMoviesFiltersStore((s) => s.sortBy)
    const page = useMoviesFiltersStore((s) => s.page)
    const setPage = useMoviesFiltersStore((s) => s.setPage)

    const moviesQuery = useMoviesQuery({
        search,
        genreId,
        year,
        minRating,
        sortBy,
        page,
    })

    const isInitialLoading = moviesQuery.isLoading
    const hasError = moviesQuery.isError
    const data = moviesQuery.data

    return (
        <div className="mx-auto flex min-h-full max-w-7xl flex-col gap-6 p-6 pb-12">
            <header className="flex flex-col gap-1">
                <h1 className="font-heading text-3xl font-semibold">
                    Todos os filmes
                </h1>
            </header>

            <MoviesFilters />

            {isInitialLoading && <MoviesTableSkeleton />}

            {hasError && (
                <MoviesEmptyState
                    title="Não foi possível carregar os filmes"
                    description={
                        moviesQuery.error instanceof Error
                            ? moviesQuery.error.message
                            : 'Tente novamente em instantes.'
                    }
                />
            )}

            {!isInitialLoading && !hasError && data && (
                <>
                    {data.results.length === 0 ? (
                        <MoviesEmptyState
                            title="Nenhum filme encontrado"
                            description="Ajuste os filtros ou tente outra busca."
                        />
                    ) : (
                        <MoviesTable data={data.results} />
                    )}
                </>
            )}

            <Pagination
                page={page}
                totalPages={data?.total_pages ?? 1}
                onChange={setPage}
            />
        </div>
    )
}
