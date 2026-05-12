import { cn } from "@/lib/utils"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function ContentGrid({ children, className }: LayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6", className)}>
      {children}
    </div>
  )
}

export function ResponsiveStack({ children, className }: LayoutProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center gap-4", className)}>
      {children}
    </div>
  )
}

export function FullscreenLayout({ children, className }: LayoutProps) {
  return (
    <div className={cn("fixed inset-0 z-[100] bg-background flex flex-col", className)}>
      {children}
    </div>
  )
}
