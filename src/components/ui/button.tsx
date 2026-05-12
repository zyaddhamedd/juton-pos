"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion"
import { Loader2 } from "lucide-react"

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<"button">>,
    HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "ghost" | "accent" | "danger" | "success" | "outline"
  size?: "sm" | "md" | "lg" | "xl" | "icon"
  isLoading?: boolean
  asChild?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const variants = {
  primary: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
  ghost: "bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground",
  accent: "bg-accent text-accent-foreground shadow-lg shadow-accent/20 hover:bg-accent/90",
  danger: "bg-danger text-white shadow-lg shadow-danger/20 hover:bg-danger/90",
  success: "bg-green-600 text-white shadow-lg shadow-green-600/20 hover:bg-green-700",
  outline: "bg-transparent border border-border text-foreground hover:bg-secondary"
}

const sizes = {
  sm: "h-9 px-4 rounded-lg text-xs",
  md: "h-11 px-6 rounded-xl text-sm font-medium",
  lg: "h-14 px-8 rounded-2xl text-base font-bold",
  xl: "h-16 px-10 rounded-2xl text-lg font-bold",
  icon: "h-11 w-11 rounded-xl flex items-center justify-center p-0"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, asChild = false, leftIcon, rightIcon, children, ...props }, ref) => {
    const Component = asChild ? motion(Slot) : motion.button
    
    if (asChild) {
      return (
        <Component
          ref={ref as any}
          whileTap={{ scale: 0.98 }}
          className={cn(
            "relative inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
            variants[variant],
            sizes[size],
            className
          )}
          {...props}
        >
          {children}
        </Component>
      )
    }

    return (
      <Component
        ref={ref as any}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading || (props as any).disabled}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Loader2 className="h-5 w-5 animate-spin" />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <span className={cn("flex items-center gap-2 transition-opacity", isLoading && "opacity-0")}>
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
          {children}
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        </span>
      </Component>
    )
  }
)
Button.displayName = "Button"

export { Button }
