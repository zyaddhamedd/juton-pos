"use client"

import { cn } from "@/lib/utils"

export function PlaceholderContent({ title }: { title: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-32 bg-secondary/50 rounded-2xl animate-pulse border border-border/50" />
      ))}
      <div className="md:col-span-2 lg:col-span-3 h-[400px] bg-secondary/30 rounded-2xl border border-border/50 flex items-center justify-center">
        <p className="text-muted-foreground font-medium">مساحة عمل {title}</p>
      </div>
      <div className="h-[400px] bg-secondary/30 rounded-2xl border border-border/50" />
    </div>
  )
}
