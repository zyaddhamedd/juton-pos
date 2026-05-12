"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface FilterGroupProps {
  options: { id: string; label: string }[]
  selectedId: string
  onChange: (id: string) => void
  className?: string
}

export function FilterGroup({ options, selectedId, onChange, className }: FilterGroupProps) {
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-visible">
        {options.map((option) => {
          const isSelected = selectedId === option.id
          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={cn(
                "px-5 py-2.5 rounded-xl text-[10px] font-black whitespace-nowrap transition-all border shrink-0 relative group",
                isSelected
                  ? "text-white border-primary"
                  : "bg-secondary/30 text-muted-foreground border-border/40 hover:bg-secondary/50 active:scale-95"
              )}
            >
              {isSelected && (
                <motion.div 
                  layoutId="active-filter"
                  className="absolute inset-0 bg-primary rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{option.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
