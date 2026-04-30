import { Skeleton } from '@/shared/ui/skeleton'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/ui/table'

const HEADERS = ['Título', 'Gênero', 'Lançamento', 'Rating', '']

type Props = {
    rows?: number
    cards?: number
}

export const MoviesTableSkeleton = ({ rows = 8, cards = 5 }: Props) => {
    return (
        <>
            <ul className="flex flex-col gap-3 md:hidden">
                {Array.from({ length: cards }).map((_, index) => (
                    <li
                        key={'card-' + index}
                        className="flex gap-3 rounded-lg border bg-card p-3"
                    >
                        <Skeleton className="h-24 w-16 shrink-0 rounded-sm" />
                        <div className="flex flex-1 flex-col gap-2">
                            <Skeleton className="h-4 w-3/4" />
                            <div className="flex gap-1">
                                <Skeleton className="h-5 w-14 rounded-full" />
                                <Skeleton className="h-5 w-14 rounded-full" />
                            </div>
                            <div className="flex items-center justify-between pt-1">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-8 w-20" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="hidden rounded-lg border bg-card md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {HEADERS.map((label, index) => (
                                <TableHead key={'label-' + index}>
                                    {label}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <TableRow key={'row-' + rowIndex}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Skeleton className="h-14 w-10 rounded-sm" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-10" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="ml-auto h-8 w-20" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}
