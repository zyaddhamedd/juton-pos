"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CurrencyProps {
  amount: number
  currency?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function Currency({ amount, currency = "ج.م", className, size = "md" }: CurrencyProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const safeAmount = amount ?? 0
  const formatted = new Intl.NumberFormat("ar-EG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safeAmount)

  const sizes = {
    sm: "text-sm",
    md: "text-base font-bold",
    lg: "text-2xl font-bold tracking-tight",
    xl: "text-4xl font-black tracking-tighter"
  }

  // Prevent hydration mismatch by suppressing warning or rendering empty/placeholder initially
  return (
    <div className={cn("inline-flex items-baseline gap-1.5 font-sans", sizes[size], className)}>
      <span className="text-foreground" suppressHydrationWarning>
        {mounted ? formatted : safeAmount.toFixed(2)}
      </span>
      <span className="text-[0.7em] font-bold text-muted-foreground uppercase opacity-80">{currency}</span>
    </div>
  )
}
