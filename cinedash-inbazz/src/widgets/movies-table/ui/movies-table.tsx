'use no memo'

import { useMemo, useState } from 'react'
import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    type SortingState,
} from '@tanstack/react-table'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/table'
import { cn } from '@/shared/lib/utils'
import { useMovieGenres } from '@/entities/genre'
import type { Movie } from '@/entities/movie'

import { buildGenreMap, buildMoviesColumns } from '../lib/columns'

type MoviesTableProps = {
    data: Movie[]
}

const SortIcon = ({
    direction,
}: {
    direction: false | 'asc' | 'desc'
}) => {
    if (direction === 'asc') return <ArrowUp className="h-3.5 w-3.5" />
    if (direction === 'desc') return <ArrowDown className="h-3.5 w-3.5" />
    return <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
}

export const MoviesTable = ({ data }: MoviesTableProps) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const genresQuery = useMovieGenres()

    const genreMap = useMemo(
        () => buildGenreMap(genresQuery.data),
        [genresQuery.data]
    )

    const columns = useMemo(() => buildMoviesColumns(genreMap), [genreMap])

   const table = useReactTable({
        data,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                const canSort = header.column.getCanSort()
                                const sorted = header.column.getIsSorted()
                                return (
                                    <TableHead
                                        key={header.id}
                                        className={cn(
                                            canSort &&
                                            'cursor-pointer select-none'
                                        )}
                                        onClick={
                                            canSort
                                                ? header.column.getToggleSortingHandler()
                                                : undefined
                                        }
                                    >
                                        {header.isPlaceholder ? null : (
                                            <span className="inline-flex items-center gap-1.5">
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {canSort && (
                                                    <SortIcon
                                                        direction={sorted}
                                                    />
                                                )}
                                            </span>
                                        )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
