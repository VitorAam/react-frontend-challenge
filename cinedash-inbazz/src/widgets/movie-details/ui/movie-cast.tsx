import { useMemo } from 'react'
import { UserRound } from 'lucide-react'

import { getProfileUrl, type CastMember } from '@/entities/movie'

type MovieCastProps = {
    cast: CastMember[]
    limit?: number
}

export const MovieCast = ({ cast, limit = 12 }: MovieCastProps) => {
    const top = useMemo(
        () => [...cast].sort((a, b) => a.order - b.order).slice(0, limit),
        [cast, limit]
    )

    if (top.length === 0) {
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
            <h2 className="font-heading text-xl font-semibold">Elenco</h2>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {top.map((member) => {
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
        </section>
    )
}
