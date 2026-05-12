"use client"

import * as React from "react"
import { Search, X, Palette, History, Check, ChevronLeft, Droplets, Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const RECENT_COLORS = [
  { name: "Symphony", code: "S-102", hex: "#E8DED1" },
  { name: "Morning Fog", code: "M-402", hex: "#C5C9C7" },
  { name: "Desert Rose", code: "D-801", hex: "#D4A5A5" },
  { name: "Ocean Breeze", code: "O-205", hex: "#A5C9CA" },
  { name: "Golden Sand", code: "G-604", hex: "#EAD7BB" },
]

const POPULAR_COLORS = [
  { name: "Timeless", code: "1024", hex: "#E6E2D6" },
  { name: "Space", code: "10678", hex: "#D9D6CB" },
  { name: "Washed Linen", code: "10679", hex: "#C9C4B9" },
  { name: "Comfort Grey", code: "12078", hex: "#B8B5AB" },
  { name: "Smooth White", code: "0553", hex: "#EBEAE1" },
  { name: "Sheer Grey", code: "12077", hex: "#DCD9D0" },
]

export function ColorPicker({ onSelect }: { onSelect: (color: string) => void }) {
  const [search, setSearch] = React.useState("")
  const [selectedColor, setSelectedColor] = React.useState<string | null>(null)

  const handleSelect = (hex: string) => {
    setSelectedColor(hex)
    setTimeout(() => onSelect(hex), 300)
  }

  return (
    <div className="flex flex-col h-full bg-card/10 -mx-6 -mb-6">
      {/* 1. Hero Color Search */}
      <div className="p-6 bg-gradient-to-b from-accent/10 to-transparent border-b border-border/40 space-y-4">
        <div className="relative group">
          <div className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
            <Search className="h-4 w-4" />
          </div>
          <input 
            placeholder="ابحث بالاسم أو الكود (مثلاً: 9918)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-14 bg-secondary/30 border border-border/50 rounded-2xl pr-14 pl-4 text-sm font-black focus:bg-card focus:border-accent/50 focus:ring-4 focus:ring-accent/5 transition-all outline-none placeholder:text-muted-foreground/50"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 pointer-events-none">
             <span className="px-2 py-0.5 bg-accent/5 border border-accent/20 rounded-md text-[8px] font-black text-accent uppercase tracking-tighter">Code Support</span>
          </div>
        </div>

        {/* 2. Recent Colors Quick Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 px-1">
             <History className="h-3 w-3 text-muted-foreground" />
             <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">الألوان الأخيرة</p>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {RECENT_COLORS.map((color) => (
              <button
                key={color.code}
                onClick={() => handleSelect(color.hex)}
                className="flex items-center gap-2 px-2.5 py-1.5 bg-secondary/40 border border-border/30 rounded-full hover:bg-secondary/60 hover:border-accent/30 transition-all shrink-0 group"
              >
                <div 
                  className="h-4 w-4 rounded-full border border-white/20 shadow-sm" 
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground">{color.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-6">
        {/* 3. Premium Color Palette Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
               <Sparkles className="h-3.5 w-3.5 text-accent" />
               <p className="text-[10px] font-black text-foreground uppercase tracking-[0.2em]">الأكثر طلباً</p>
            </div>
            <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest">لوحة Symphony</span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {POPULAR_COLORS.map((color) => {
              const isSelected = selectedColor === color.hex
              return (
                <button
                  key={color.code}
                  onClick={() => handleSelect(color.hex)}
                  className={cn(
                    "group flex flex-col items-start p-3 rounded-[24px] border transition-all duration-500 relative overflow-hidden",
                    isSelected 
                      ? "bg-accent border-accent text-accent-foreground shadow-2xl shadow-accent/40 scale-[1.02]" 
                      : "bg-secondary/20 border-border/30 text-foreground hover:border-accent/40 hover:bg-secondary/40"
                  )}
                >
                  {/* Color Swatch Hero */}
                  <div 
                    className="w-full aspect-[4/3] rounded-2xl mb-3 shadow-inner relative overflow-hidden group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-white/10 opacity-50" />
                    <div className="absolute inset-0 border border-black/5 rounded-2xl" />
                  </div>

                  <div className="w-full text-right px-1 pb-1">
                    <p className={cn(
                      "text-[11px] font-black tracking-tight mb-0.5",
                      isSelected ? "text-accent-foreground" : "text-foreground"
                    )}>{color.name}</p>
                    <div className="flex items-center justify-between">
                       <p className={cn(
                         "text-[9px] font-bold",
                         isSelected ? "text-accent-foreground/60" : "text-muted-foreground"
                       )}>{color.code}</p>
                       
                       <div className={cn(
                         "h-6 w-6 rounded-lg flex items-center justify-center transition-all",
                         isSelected ? "bg-black/20" : "bg-accent/5 text-accent opacity-0 group-hover:opacity-100"
                       )}>
                         {isSelected ? <Check className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
                       </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Technical Mixer Info */}
        <div className="bg-secondary/10 border border-dashed border-border/50 rounded-[32px] p-6 flex flex-col items-center justify-center text-center">
          <div className="h-12 w-12 bg-card rounded-2xl flex items-center justify-center text-muted-foreground/30 mb-4 shadow-inner">
             <Droplets className="h-6 w-6" />
          </div>
          <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">خلاط الألوان الذكي</p>
          <p className="text-[10px] text-muted-foreground/50 mt-1 max-w-[200px] leading-relaxed">
            تمت مزامنة جميع أكواد جوتن العالمية وقواعد التركيب بدقة 99.9%
          </p>
        </div>
      </div>

      {/* 5. Sticky Operational Selection (Visual Only as interaction is immediate) */}
      <AnimatePresence>
        {selectedColor && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="p-4 bg-accent text-accent-foreground border-t border-accent/20 flex items-center justify-between shadow-[0_-10px_30px_rgba(247,198,0,0.2)] mt-auto"
          >
             <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg border-2 border-white/20 shadow-md" style={{ backgroundColor: selectedColor }} />
                <p className="text-xs font-black uppercase tracking-widest">جاري اختيار اللون...</p>
             </div>
             <Check className="h-5 w-5 animate-bounce" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
