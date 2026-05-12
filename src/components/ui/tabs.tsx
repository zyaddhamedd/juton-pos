"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface TabOption {
  id: string
  label: string
  icon?: React.ElementType
}

interface TabsProps {
  options: TabOption[]
  activeId: string
  onChange: (id: string) => void
  className?: string
  variant?: "segmented" | "underline"
}

export function Tabs({ options, activeId, onChange, className, variant = "segmented" }: TabsProps) {
  return (
    <div className={cn(
      "flex p-1 gap-1 overflow-x-auto no-scrollbar",
      variant === "segmented" ? "bg-secondary/50 rounded-xl" : "border-b border-border",
      className
    )}>
      {options.map((option) => {
        const isActive = activeId === option.id
        
        return (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative flex items-center gap-2 px-6 py-2.5 text-sm font-semibold transition-all duration-300 min-w-fit",
              isActive 
                ? "text-primary-foreground" 
                : "text-muted-foreground hover:text-foreground",
              variant === "underline" && "rounded-none"
            )}
          >
            {isActive && variant === "segmented" && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-primary rounded-lg shadow-sm"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            
            {isActive && variant === "underline" && (
              <motion.div
                layoutId="active-tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {option.icon && <option.icon className="h-4 w-4" />}
              {option.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
