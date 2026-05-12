"use client"

import { Search, Bell, Plus } from "lucide-react"
import { cn } from "@/lib/utils"

export function Topbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-card/80 backdrop-blur-md border-b border-border lg:right-[var(--sidebar-width,280px)] rtl:lg:right-[var(--sidebar-width,280px)] rtl:lg:left-0 hidden lg:block">
      <div className="flex h-full items-center justify-between px-4 lg:px-8">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative max-w-md w-full hidden md:block text-muted-foreground">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
            <input
              type="text"
              placeholder="البحث السريع..."
              className="w-full h-10 pr-10 pl-4 bg-secondary border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button className="flex h-10 items-center gap-2 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">بيع سريع</span>
          </button>
          
          <button className="relative p-2 text-muted-foreground hover:bg-secondary rounded-lg transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 bg-danger rounded-full border-2 border-card" />
          </button>

          <button className="flex items-center gap-2 p-1 pr-3 hover:bg-secondary rounded-xl transition-all border border-transparent hover:border-border">
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold text-foreground leading-none">أحمد محمد</p>
              <p className="text-[10px] text-muted-foreground mt-1">مدير النظام</p>
            </div>
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-xs border border-primary/20">
              AM
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
