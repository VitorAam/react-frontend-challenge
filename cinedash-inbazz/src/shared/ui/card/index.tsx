import type { ComponentProps } from "react"

import { cn } from "@/shared/lib/utils"

export const Card = ({
  className,
  size = "default",
  ...props
}: ComponentProps<"div"> & { size?: "default" | "sm" }) => {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        "group/card flex flex-col gap-8 overflow-hidden bg-card py-8 text-sm text-card-foreground shadow-sm ring-1 ring-foreground/5 has-[>img:first-child]:pt-0 data-[size=sm]:gap-5 data-[size=sm]:py-5 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
        className
      )}
      {...props}
    />
  )
}

export const CardHeader = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-none px-8 group-data-[size=sm]/card:px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-8 group-data-[size=sm]/card:[.border-b]:pb-5",
        className
      )}
      {...props}
    />
  )
}

export const CardTitle = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "text-lg font-semibold tracking-wider uppercase",
        className
      )}
      {...props}
    />
  )
}

export const CardDescription = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

export const CardAction = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

export const CardContent = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-content"
      className={cn("px-8 group-data-[size=sm]/card:px-5", className)}
      {...props}
    />
  )
}

export const CardFooter = ({ className, ...props }: ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-8 group-data-[size=sm]/card:px-5 [.border-t]:pt-8 group-data-[size=sm]/card:[.border-t]:pt-5",
        className
      )}
      {...props}
    />
  )
}