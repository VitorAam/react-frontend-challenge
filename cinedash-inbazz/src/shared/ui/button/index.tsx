import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/shared/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground hover:bg-primary/90",
                outline: "border border-input hover:bg-muted",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                ghost: "hover:bg-muted",
                destructive: "bg-destructive text-white hover:bg-destructive/90",
            },
            size: {
                default: "h-9 px-4 py-2",
                sm: "h-8 px-3",
                lg: "h-10 px-6",
                icon: "h-9 w-9",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
        isLoading?: boolean
        isLoadingText?: string
    }

export const Button = ({
    className,
    variant,
    size,
    isLoading = false,
    isLoadingText = "Carregando...",
    asChild = false,
    children,
    disabled,
    ...props
}: ButtonProps) => {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            className={cn(buttonVariants({ variant, size }), className, "hover:cursor-pointer")}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>{isLoadingText}</span>
                </span>
            ) : (
                children
            )}
        </Comp>
    )
}
