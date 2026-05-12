import { cn } from "@/lib/utils"

interface StatusDotProps {
  status: "success" | "warning" | "error" | "info" | "neutral"
  animate?: boolean
  className?: string
}

const colors = {
  success: "bg-green-500",
  warning: "bg-yellow-500",
  error: "bg-danger",
  info: "bg-blue-500",
  neutral: "bg-muted-foreground"
}

export function StatusDot({ status, animate = true, className }: StatusDotProps) {
  return (
    <div className={cn("relative flex h-2.5 w-2.5", className)}>
      {animate && status !== "neutral" && (
        <span className={cn(
          "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
          colors[status]
        )} />
      )}
      <span className={cn(
        "relative inline-flex h-2.5 w-2.5 rounded-full",
        colors[status]
      )} />
    </div>
  )
}
