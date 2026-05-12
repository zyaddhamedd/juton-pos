import * as React from "react"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps } from "framer-motion"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "interactive" | "compact" | "summary"
}

const variants = {
  default: "bg-card border border-border shadow-sm",
  elevated: "bg-card border border-border shadow-lg shadow-black/20",
  interactive: "bg-card border border-border hover:border-primary/40 transition-all cursor-pointer hover:shadow-md",
  compact: "bg-card border border-border p-3",
  summary: "bg-secondary/30 border-none"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", ...props }, ref) => {
    if (variant === "interactive") {
      return (
        <motion.div
          ref={ref as any}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "rounded-2xl p-6 transition-all duration-300",
            variants[variant],
            className
          )}
          {...(props as any)}
        />
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-2xl p-6 transition-all duration-200",
          variants[variant],
          className
        )}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

export { Card }
