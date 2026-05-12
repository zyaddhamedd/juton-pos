import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "primary"
  size?: "sm" | "md"
}

const variants = {
  success: "bg-green-500/10 text-green-500 border-green-500/20",
  warning: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  error: "bg-danger/10 text-danger border-danger/20",
  info: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  neutral: "bg-secondary text-muted-foreground border-border",
  primary: "bg-primary/10 text-primary border-primary/20"
}

const sizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-2.5 py-1 text-xs"
}

function Badge({ className, variant = "neutral", size = "md", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border font-bold uppercase tracking-wider transition-colors",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
