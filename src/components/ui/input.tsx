"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Search, Info, AlertCircle } from "lucide-react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  variant?: "default" | "search" | "currency" | "quantity"
  suffix?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, leftIcon, rightIcon, variant = "default", suffix, ...props }, ref) => {
    const isSearch = variant === "search"
    
    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="text-sm font-semibold text-foreground pr-1">
            {label}
          </label>
        )}
        
        <div className="relative group">
          {isSearch && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary">
              <Search className="h-5 w-5" />
            </div>
          )}
          
          {rightIcon && !isSearch && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}

          <input
            type={type}
            className={cn(
              "flex h-12 w-full rounded-xl border border-input bg-card px-4 text-sm ring-offset-background transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
              isSearch && "pr-12",
              rightIcon && !isSearch && "pr-12",
              leftIcon && "pl-12",
              error && "border-danger focus-visible:ring-danger/20 focus-visible:border-danger",
              className
            )}
            ref={ref}
            {...props}
          />

          {leftIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          {suffix && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground bg-secondary px-2 py-1 rounded-md">
              {suffix}
            </div>
          )}
        </div>

        {error ? (
          <p className="flex items-center gap-1.5 text-xs font-medium text-danger pr-1">
            <AlertCircle className="h-3.5 w-3.5" />
            {error}
          </p>
        ) : helperText ? (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground pr-1">
            <Info className="h-3.5 w-3.5" />
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
