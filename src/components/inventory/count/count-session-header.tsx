"use client"

import * as React from "react"
import { ClipboardList, Clock, CheckCircle2, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CountSessionHeaderProps {
  totalItems: number
  countedItems: number
  startTime: string
}

export function CountSessionHeader({ totalItems, countedItems, startTime }: CountSessionHeaderProps) {
  const progress = Math.round((countedItems / totalItems) * 100) || 0

  return (
    <div className="bg-card border border-border/40 rounded-3xl p-4 lg:p-6 shadow-xl relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
        <ClipboardList className="h-32 w-32 rotate-12" />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link 
              href="/inventory" 
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-xl lg:text-3xl font-black text-foreground tracking-tight">جلسة جرد نشطة</h1>
            <div className="px-2 py-0.5 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[9px] font-black text-primary uppercase tracking-widest">Live Session</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-[10px] lg:text-xs font-black text-muted-foreground uppercase tracking-widest opacity-60">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>بدأ في: {startTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>{countedItems} من {totalItems} منتج تم جرده</span>
            </div>
          </div>
        </div>

        {/* Progress System */}
        <div className="flex flex-col gap-2 w-full lg:w-64">
           <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">تقدم الجرد</span>
              <span className="text-lg font-black text-foreground tracking-tighter">{progress}%</span>
           </div>
           <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden border border-border/20">
              <div 
                className="h-full bg-primary shadow-[0_0_15px_rgba(0,61,165,0.4)] transition-all duration-700 ease-out" 
                style={{ width: `${progress}%` }}
              />
           </div>
        </div>
      </div>
    </div>
  )
}
