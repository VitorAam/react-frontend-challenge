import { useMemo, useState } from 'react'
import { ChevronDown, ChevronUp, UserRound } from 'lucide-react'

import { getProfileUrl, type CastMember } from '@/entities/movie'
import { Button } from '@/shared/ui/button'

type MovieCastProps = {
    cast: CastMember[]
    initialLimit?: number
}

export const MovieCast = ({ cast, initialLimit = 12 }: MovieCastProps) => {
    const [expanded, setExpanded] = useState(false)

    const sorted = useMemo(
        () => [...cast].sort((a, b) => a.order - b.order),
        [cast]
    )

    const visible = useMemo(
        () => (expanded ? sorted : sorted.slice(0, initialLimit)),
        [sorted, expanded, initialLimit]
    )

    const hiddenCount = Math.max(sorted.length - initialLimit, 0)
    const canExpand = hiddenCount > 0

    if (sorted.length === 0) {
        return (
            <section className="space-y-3 rounded-xl border bg-card p-6">
                <h2 className="font-heading text-xl font-semibold">Elenco</h2>
                <p className="text-sm italic text-muted-foreground">
                    Elenco não disponível.
                </p>
            </section>
        )
    }

    return (
        <section className="space-y-4 rounded-xl border bg-card p-6">
            <div className="flex items-baseline justify-between gap-3">
                <h2 className="font-heading text-xl font-semibold">Elenco</h2>
                <span className="text-sm text-muted-foreground">
                    {sorted.length}{' '}
                    {sorted.length === 1 ? 'pessoa' : 'pessoas'}
                </span>
            </div>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {visible.map((member) => {
                    const profile = getProfileUrl(member.profile_path, 'w185')
                    return (
                        <li
                            key={`${member.id}-${member.order}`}
                            className="flex flex-col gap-2 text-center"
                        >
                            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-full bg-muted ring-1 ring-foreground/10">
                                {profile ? (
                                    <img
                                        src={profile}
                                        alt={member.name}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserRound className="h-8 w-8 text-muted-foreground" />
                                )}
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium leading-tight">
                                    {member.name}
                                </p>
                                {member.character && (
                                    <p className="text-xs text-muted-foreground">
                                        {member.character}
                                    </p>
                                )}
                            </div>
                        </li>
                    )
                })}
            </ul>

            {canExpand && (
                <div className="flex justify-center pt-2">
                    <Button
                        variant="outline"
                        size="sm"
                        className="cursor-pointer"
                        onClick={() => setExpanded((prev) => !prev)}
                        aria-expanded={expanded}
                    >
                        {expanded ? (
                            <span className="flex items-center gap-2">
                                <ChevronUp className="h-4 w-4" />
                                Ver menos
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <ChevronDown className="h-4 w-4" />
                                Ver mais ({hiddenCount})
                            </span>
                        )}
                    </Button>
                </div>
            )}
        </section>
    )
}
