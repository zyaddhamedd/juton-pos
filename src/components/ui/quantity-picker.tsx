"use client"

import * as React from "react"
import { Minus, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

interface QuantityPickerProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  className?: string
  size?: "sm" | "md"
}

export function QuantityPicker({ 
  value, 
  onChange, 
  min = 0, 
  max = 999, 
  className,
  size = "md"
}: QuantityPickerProps) {
  const increment = () => value < max && onChange(value + 1)
  const decrement = () => value > min && onChange(value - 1)

  const isSm = size === "sm"

  return (
    <div className={cn(
      "flex items-center bg-secondary/50 rounded-xl border border-border w-fit",
      isSm ? "gap-1 p-0.5" : "gap-2 p-1",
      className
    )}>
      <button
        onClick={decrement}
        disabled={value <= min}
        className={cn(
          "flex items-center justify-center bg-card rounded-lg border border-border hover:border-accent/40 hover:text-accent disabled:opacity-30 transition-all active:scale-95 group",
          isSm ? "h-6 w-6" : "h-10 w-10"
        )}
      >
        <Minus className={cn("transition-transform group-active:scale-90", isSm ? "h-3 w-3" : "h-4 w-4")} />
      </button>
      
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={cn(
          "text-center bg-transparent border-none font-bold outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:text-accent transition-colors",
          isSm ? "w-6 text-[10px]" : "w-12 text-sm"
        )}
      />

      <button
        onClick={increment}
        disabled={value >= max}
        className={cn(
          "flex items-center justify-center bg-card rounded-lg border border-border hover:border-accent/40 hover:text-accent disabled:opacity-30 transition-all active:scale-95 group",
          isSm ? "h-6 w-6" : "h-10 w-10"
        )}
      >
        <Plus className={cn("transition-transform group-active:scale-90", isSm ? "h-3 w-3" : "h-4 w-4")} />
      </button>
    </div>
  )
}
