import { useEffect, useMemo, useState } from 'react'

import { useMovieGenres } from '@/entities/genre'
import { useDebounce } from '@/shared/lib/use-debounce'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select'

import { useMoviesFiltersStore, type SortBy } from '../model/filters.store'
import { RATING_OPTIONS, buildYearOptions } from '../lib/years'

const ANY_VALUE = '__any__'

const SORT_LABELS: Record<SortBy, string> = {
    'popularity.desc': 'Mais populares',
    'popularity.asc': 'Menos populares',
    'vote_average.desc': 'Melhor avaliados',
    'vote_average.asc': 'Pior avaliados',
    'primary_release_date.desc': 'Mais recentes',
    'primary_release_date.asc': 'Mais antigos',
}

export const MoviesFilters = () => {
    const search = useMoviesFiltersStore((s) => s.search)
    const genreId = useMoviesFiltersStore((s) => s.genreId)
    const year = useMoviesFiltersStore((s) => s.year)
    const minRating = useMoviesFiltersStore((s) => s.minRating)
    const sortBy = useMoviesFiltersStore((s) => s.sortBy)
    const setSearch = useMoviesFiltersStore((s) => s.setSearch)
    const setGenreId = useMoviesFiltersStore((s) => s.setGenreId)
    const setYear = useMoviesFiltersStore((s) => s.setYear)
    const setMinRating = useMoviesFiltersStore((s) => s.setMinRating)
    const setSortBy = useMoviesFiltersStore((s) => s.setSortBy)
    const reset = useMoviesFiltersStore((s) => s.reset)

    const [searchInput, setSearchInput] = useState(search)
    const debouncedSearch = useDebounce(searchInput, 400)

    useEffect(() => {
        if (debouncedSearch !== search) setSearch(debouncedSearch)
    }, [debouncedSearch, search, setSearch])

    const genresQuery = useMovieGenres()
    const yearOptions = useMemo(() => buildYearOptions(), [])

    const isSearchActive = searchInput.trim().length > 0

    return (
        <section className="space-y-4 rounded-lg border bg-card p-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                <div className="lg:col-span-2 space-y-2">
                    <Label htmlFor="movie-search">Buscar</Label>
                    <Input
                        id="movie-search"
                        placeholder="Ex: Matrix, Pulp Fiction..."
                        value={searchInput}
                        onChange={(event) => setSearchInput(event.target.value)}
                        autoComplete="off"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Gênero</Label>
                    <Select
                        value={genreId ? String(genreId) : ANY_VALUE}
                        onValueChange={(value) =>
                            setGenreId(
                                value === ANY_VALUE ? undefined : Number(value)
                            )
                        }
                        disabled={isSearchActive || genresQuery.isLoading}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ANY_VALUE}>Todos</SelectItem>
                            {genresQuery.data?.map((genre) => (
                                <SelectItem
                                    key={genre.id}
                                    value={String(genre.id)}
                                >
                                    {genre.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Ano</Label>
                    <Select
                        value={year ? String(year) : ANY_VALUE}
                        onValueChange={(value) =>
                            setYear(
                                value === ANY_VALUE ? undefined : Number(value)
                            )
                        }
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Todos" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ANY_VALUE}>Todos</SelectItem>
                            {yearOptions.map((option) => (
                                <SelectItem
                                    key={option}
                                    value={String(option)}
                                >
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label>Nota mínima</Label>
                    <Select
                        value={minRating ? String(minRating) : ANY_VALUE}
                        onValueChange={(value) =>
                            setMinRating(
                                value === ANY_VALUE ? undefined : Number(value)
                            )
                        }
                        disabled={isSearchActive}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Qualquer" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={ANY_VALUE}>Qualquer</SelectItem>
                            {RATING_OPTIONS.map((rating) => (
                                <SelectItem
                                    key={rating}
                                    value={String(rating)}
                                >
                                    {rating.toFixed(1)}+
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-3">
                <div className="space-y-2">
                    <Label>Ordenar por</Label>
                    <Select
                        value={sortBy}
                        onValueChange={(value) => setSortBy(value as SortBy)}
                        disabled={isSearchActive}
                    >
                        <SelectTrigger className="w-56">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {(Object.keys(SORT_LABELS) as SortBy[]).map(
                                (key) => (
                                    <SelectItem key={key} value={key}>
                                        {SORT_LABELS[key]}
                                    </SelectItem>
                                )
                            )}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    {isSearchActive && (
                        <span className="text-xs text-muted-foreground">
                            Filtros desabilitados durante a busca textual
                        </span>
                    )}
                    <Button
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => {
                            setSearchInput('')
                            reset()
                        }}
                    >
                        Limpar filtros
                    </Button>
                </div>
            </div>
        </section>
    )
}
