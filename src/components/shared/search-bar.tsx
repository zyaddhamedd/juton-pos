"use client"

import * as React from "react"
import { Search, X, History, ArrowLeft, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface SearchBarProps {
  placeholder?: string
  className?: string
  onSearch?: (query: string) => void
}

export function SearchBar({ placeholder, className, onSearch }: SearchBarProps) {
  const [isFocused, setIsFocused] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleClear = () => {
    setQuery("")
    inputRef.current?.focus()
  }

  return (
    <div className={cn(
      "relative w-full",
      isFocused ? "z-[100]" : "z-10",
      className
    )}>
      {/* Background Dim Effect */}
      <AnimatePresence>
        {isFocused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[-1] hidden lg:block"
          />
        )}
      </AnimatePresence>

      <div className={cn(
        "relative flex h-11 w-full items-center gap-3 px-4 rounded-xl bg-secondary/30 backdrop-blur-md border border-border/40 transition-all duration-300",
        isFocused && "border-primary/50 bg-card shadow-[0_0_30px_rgba(0,0,0,0.5)]"
      )}>
        <Search className={cn(
          "h-4 w-4 transition-all duration-300",
          isFocused ? "text-primary" : "text-muted-foreground"
        )} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onSearch?.(e.target.value)
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder={placeholder || "البحث..."}
          className="flex-1 h-full bg-transparent border-none text-sm font-bold placeholder:text-muted-foreground/40 focus:ring-0 outline-none"
        />

        <AnimatePresence>
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="p-1.5 hover:bg-secondary rounded-lg transition-colors"
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Command Results Panel */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.99 }}
            className="absolute top-full left-0 right-0 mt-2 bg-[#11151F] border border-border/60 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden z-[100]"
          >
            <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {query ? (
                <div className="p-2 space-y-1">
                  <p className="px-3 py-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">نتائج البحث</p>
                  {[1, 2, 3].map((i) => (
                    <button key={i} className="w-full flex items-center justify-between p-3 hover:bg-primary/10 rounded-xl transition-all group text-right">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                          <Package className="h-5 w-5" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-sm font-bold text-foreground">فينوماستيك مطفي {i}</p>
                          <div className="flex items-center gap-2">
                             <span className="text-[10px] font-bold text-muted-foreground bg-secondary/50 px-1.5 py-0.5 rounded">دهانات</span>
                             <span className="text-[10px] font-mono text-primary/60">JTN-00{i}</span>
                          </div>
                        </div>
                      </div>
                      <History className="h-4 w-4 text-muted-foreground/20 group-hover:text-primary/40 transition-colors" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  <p className="px-3 py-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest opacity-40">عمليات البحث الأخيرة</p>
                  {[ "فينوماستيك مطفي", "جوتن سلك", "أدوات دهان" ].map((item) => (
                    <button key={item} className="w-full flex items-center gap-3 px-3 py-3 hover:bg-secondary/50 rounded-xl text-sm transition-all text-foreground font-bold group">
                      <History className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-secondary/20 px-4 py-2 flex items-center justify-between border-t border-border/40">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                     <span className="px-1 py-0.5 bg-card border border-border/60 rounded text-[9px] font-black text-muted-foreground uppercase">↑↓</span>
                     <span className="text-[9px] font-bold text-muted-foreground">للتنقل</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                     <span className="px-1 py-0.5 bg-card border border-border/60 rounded text-[9px] font-black text-muted-foreground uppercase">Enter</span>
                     <span className="text-[9px] font-bold text-muted-foreground">للاختيار</span>
                  </div>
               </div>
               <span className="text-[9px] font-bold text-muted-foreground/40">ESC للإغلاق</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
