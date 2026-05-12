"use client"

import { cn } from "@/lib/utils"

export type StockLevel = "available" | "low" | "out" | "missing"

export function getStockLevel(stock: number): StockLevel {
  if (stock === 0) return "out"
  if (stock <= 10) return "low"
  return "available"
}

export function StockStatus({ level }: { level: StockLevel }) {
  const configs = {
    available: { label: "متوفر", classes: "bg-success/10 text-success border-success/20" },
    low: { label: "قرب يخلص", classes: "bg-warning/10 text-warning border-warning/20" },
    out: { label: "خلصان", classes: "bg-destructive/10 text-destructive border-destructive/20" },
    missing: { label: "ناقص", classes: "bg-danger/10 text-danger border-danger/20" },
  }

  const config = configs[level]

  return (
    <span className={cn(
      "px-2 py-1 rounded-full text-[10px] font-black uppercase border whitespace-nowrap",
      config.classes
    )}>
      {config.label}
    </span>
  )
}
