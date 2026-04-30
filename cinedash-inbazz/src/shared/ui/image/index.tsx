import {
    useState,
    type ComponentProps,
    type ReactNode,
    type SyntheticEvent,
} from 'react'

import { cn } from '@/shared/lib/utils'
import { Skeleton } from '@/shared/ui/skeleton'

type ImgProps = ComponentProps<'img'>

type SmartImageProps = Omit<ImgProps, 'src' | 'onLoad' | 'onError'> & {
    src: string | null | undefined
    fallback?: ReactNode
    wrapperClassName?: string
    skeletonClassName?: string
    onLoad?: (event: SyntheticEvent<HTMLImageElement, Event>) => void
    onError?: (event: SyntheticEvent<HTMLImageElement, Event>) => void
}

type Status = 'loading' | 'loaded' | 'error'

const initialStatus = (src: string | null | undefined): Status =>
    src ? 'loading' : 'error'

export const SmartImage = ({
    src,
    alt,
    fallback = null,
    wrapperClassName,
    skeletonClassName,
    className,
    onLoad,
    onError,
    ...imgProps
}: SmartImageProps) => {
    const [status, setStatus] = useState<Status>(() => initialStatus(src))
    const [trackedSrc, setTrackedSrc] = useState(src)

    if (src !== trackedSrc) {
        setTrackedSrc(src)
        setStatus(initialStatus(src))
    }

    const showSkeleton = status === 'loading' && Boolean(src)
    const showFallback = status === 'error' || !src

    return (
        <div
            className={cn(
                'relative h-full w-full overflow-hidden',
                wrapperClassName
            )}
        >
            {showSkeleton && (
                <Skeleton
                    aria-hidden
                    className={cn(
                        'absolute inset-0 h-full w-full rounded-none',
                        skeletonClassName
                    )}
                />
            )}

            {showFallback && fallback}

            {src && (
                <img
                    {...imgProps}
                    src={src}
                    alt={alt}
                    onLoad={(event) => {
                        setStatus('loaded')
                        onLoad?.(event)
                    }}
                    onError={(event) => {
                        setStatus('error')
                        onError?.(event)
                    }}
                    className={cn(
                        'h-full w-full transition-opacity duration-300',
                        status === 'loaded' ? 'opacity-100' : 'opacity-0',
                        className
                    )}
                />
            )}
        </div>
    )
}
