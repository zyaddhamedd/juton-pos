"use client"

import * as React from "react"
import { Package, Hash, CheckCircle2, AlertCircle, TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  stock: number // system quantity
}

interface CountProductCardProps {
  product: Product
  countedValue: number | ""
  onCountChange: (id: string, value: number | "") => void
  onKeyDown?: (e: React.KeyboardEvent) => void
  onFocus?: () => void
  isFocused?: boolean
}

export function CountProductCard({ product, countedValue, onCountChange, onKeyDown, onFocus, isFocused }: CountProductCardProps) {
  const diff = countedValue === "" ? null : Number(countedValue) - product.stock
  const isMatch = diff === 0
  const isGreater = diff !== null && diff > 0
  const isLower = diff !== null && diff < 0
  const isCounted = countedValue !== ""

  return (
    <div 
      className={cn(
        "group relative bg-[#0B0F1A] border-2 rounded-2xl p-4 transition-all duration-300",
        isFocused ? "border-primary shadow-[0_0_40px_rgba(0,61,165,0.15)] bg-card" : "border-border/40 hover:border-border",
        isCounted && !isMatch && (isGreater ? "border-success/30 bg-success/[0.02]" : "border-danger/30 bg-danger/[0.02]"),
        isCounted && isMatch && "border-primary/30 bg-primary/[0.02]"
      )}
      onClick={onFocus}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Product Identity */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-secondary/50 text-muted-foreground text-[8px] font-black uppercase tracking-tighter rounded">
              {product.category}
            </span>
            <span className="text-[10px] font-mono text-primary/60 font-bold">
              {product.sku}
            </span>
          </div>
          <h3 className="text-base font-black text-foreground tracking-tight leading-tight">{product.name}</h3>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40">السيستم</span>
              <span className="text-sm font-bold text-foreground/40">{product.stock}</span>
            </div>
            
            {isCounted && (
               <div className="flex flex-col">
                 <span className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40">الفرق</span>
                 <span className={cn(
                   "text-sm font-black tracking-tighter",
                   isMatch ? "text-primary" : (isGreater ? "text-success" : "text-danger")
                 )}>
                   {isMatch ? "±0" : (isGreater ? "+" : "") + diff}
                 </span>
               </div>
            )}
          </div>
        </div>

        {/* Operational Input Area */}
        <div className="flex flex-col items-end gap-3 shrink-0">
          <div className={cn(
            "px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
            !isCounted ? "bg-secondary/40 text-muted-foreground opacity-30" :
            isMatch ? "bg-primary/20 text-primary shadow-sm" :
            isGreater ? "bg-success/20 text-success shadow-sm" :
            "bg-danger/20 text-danger shadow-sm"
          )}>
            {!isCounted ? "غير مجرود" : isMatch ? "مطابق" : isGreater ? "زيادة مخزون" : "نقص مخزون"}
          </div>

          <div className="relative group/input">
            <input 
              type="number"
              inputMode="numeric"
              value={countedValue}
              onChange={(e) => onCountChange(product.id, e.target.value === "" ? "" : Number(e.target.value))}
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              placeholder="--"
              className={cn(
                "w-24 lg:w-32 h-14 lg:h-16 bg-secondary/10 border-2 border-border/40 rounded-xl text-center text-2xl font-black focus:ring-8 focus:ring-primary/10 focus:border-primary outline-none transition-all",
                isCounted && "bg-card border-primary/20"
              )}
            />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary/20 rounded-full group-focus-within/input:bg-primary transition-colors" />
          </div>
        </div>
      </div>

      {/* Visual Feedback Line */}
      {isFocused && (
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-l-2xl shadow-[0_0_15px_rgba(0,61,165,0.5)]" />
      )}
    </div>
  )
}
