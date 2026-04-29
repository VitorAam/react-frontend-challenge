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

export const MoviesTableSkeleton = ({ rows = 20 }: { rows?: number }) => {
    return (
        <div className="rounded-lg border bg-card">
            <Table>
                <TableHeader>
                    <TableRow>
                        {HEADERS.map((label, index) => (
                            <TableHead key={'label-' + index}>{label}</TableHead>
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
    )
}
