"use client"

import * as React from "react"
import { Edit2, Plus, Minus, ClipboardCheck, MoreVertical, PackageOpen } from "lucide-react"
import { Currency } from "@/components/ui/currency"
import { StockStatus, getStockLevel } from "./stock-status"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  sku: string
}

interface ProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onAdjustStock: (product: Product, delta: number) => void
  onInventory: (product: Product) => void
}

export function ProductList({ products, onEdit, onAdjustStock, onInventory }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
        <div className="h-20 w-20 bg-secondary rounded-3xl flex items-center justify-center mb-4">
          <PackageOpen className="h-10 w-10 text-muted-foreground" />
        </div>
        <p className="text-sm font-bold text-muted-foreground">لا توجد نتائج مطابقة لبحثك</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 lg:space-y-2">
      {/* Table Header - Desktop Only */}
      <div className="hidden lg:grid grid-cols-[1fr_120px_120px_140px_200px] gap-4 px-6 py-3 bg-secondary/30 rounded-xl border border-border/50">
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">المنتج</span>
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">التصنيف</span>
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">السعر</span>
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">المخزون</span>
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest text-left">إجراءات</span>
      </div>

      <AnimatePresence mode="popLayout">
        {products.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="group bg-card border border-border/40 rounded-3xl lg:rounded-2xl p-4 lg:px-6 lg:py-4 hover:border-accent/30 transition-all shadow-sm hover:shadow-md relative overflow-hidden"
          >
            {/* 🖥️ DESKTOP VIEW */}
            <div className="hidden lg:grid lg:grid-cols-[1fr_120px_120px_140px_200px] items-center gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="h-12 w-12 rounded-xl bg-secondary/50 flex items-center justify-center shrink-0 border border-border/30 group-hover:bg-accent/5 group-hover:border-accent/10 transition-colors">
                  <span className="text-xs font-black text-muted-foreground group-hover:text-accent transition-colors">{product.sku.slice(0, 3)}</span>
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-black text-foreground truncate group-hover:text-accent transition-colors">{product.name}</h3>
                  <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-tighter mt-0.5">{product.sku}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <span className="text-[10px] font-black text-muted-foreground bg-secondary/40 px-2 py-1 rounded-lg border border-border/30">
                  {product.category}
                </span>
              </div>

              <div className="flex justify-center">
                <Currency amount={product.price} size="sm" className="font-bold text-foreground/80" />
              </div>

              <div className="flex flex-col items-center">
                <span className={cn(
                  "text-xl font-black tracking-tighter",
                  product.stock <= 10 ? "text-destructive" : "text-foreground"
                )}>
                  {product.stock}
                </span>
                <div className="mt-1">
                  <StockStatus level={getStockLevel(product.stock)} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-1.5">
                <button 
                  onClick={() => onAdjustStock(product, 1)}
                  className="h-8 w-8 rounded-lg bg-success/5 text-success border border-success/10 flex items-center justify-center hover:bg-success hover:text-white transition-all active:scale-90"
                >
                  <Plus className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => onAdjustStock(product, -1)}
                  className="h-8 w-8 rounded-lg bg-destructive/5 text-destructive border border-destructive/10 flex items-center justify-center hover:bg-destructive hover:text-white transition-all active:scale-90"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <div className="w-px h-6 bg-border/50 mx-1" />
                <button 
                  onClick={() => onInventory(product)}
                  className="h-8 px-2.5 rounded-lg bg-primary/5 text-primary border border-primary/10 flex items-center gap-1.5 hover:bg-primary hover:text-white transition-all active:scale-90"
                >
                  <ClipboardCheck className="h-3.5 w-3.5" />
                  <span className="text-[10px] font-black hidden xl:inline">جرد</span>
                </button>
                <button 
                  onClick={() => onEdit(product)}
                  className="h-8 w-8 rounded-lg bg-secondary border border-border/50 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all active:scale-90"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* 📱 MOBILE VIEW - Scan Optimized */}
            <div className="lg:hidden space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-secondary/30 flex items-center justify-center shrink-0 border border-border/20 shadow-inner">
                    <span className="text-[10px] font-black text-muted-foreground/60">{product.sku.slice(0, 3)}</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[13px] font-black text-foreground leading-tight line-clamp-2 mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2">
                       <span className="text-[8px] font-black text-muted-foreground/50 uppercase tracking-widest">{product.sku}</span>
                       <span className="h-1 w-1 rounded-full bg-border" />
                       <span className="text-[8px] font-black text-primary/60 uppercase tracking-widest">{product.category}</span>
                    </div>
                  </div>
                </div>
                <div className="shrink-0 pt-1">
                   <StockStatus level={getStockLevel(product.stock)} />
                </div>
              </div>

              {/* Stats Row */}
              <div className="flex items-center justify-between py-3.5 px-4 bg-secondary/10 border border-border/20 rounded-2xl -mx-1">
                <div className="space-y-1">
                   <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest block">سعر الوحدة</span>
                   <Currency amount={product.price} size="sm" className="font-black text-foreground/80" />
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-widest">المخزون</span>
                   <span className={cn(
                     "text-2xl font-black tracking-tighter leading-none",
                     product.stock <= 10 ? "text-destructive" : "text-foreground"
                   )}>
                     {product.stock}
                   </span>
                </div>
              </div>

              {/* Actions Grid - Thumb Optimized */}
              <div className="grid grid-cols-4 gap-2">
                <button 
                  onClick={() => onAdjustStock(product, 1)}
                  className="h-12 rounded-2xl bg-success/10 text-success border border-success/10 flex items-center justify-center active:scale-90 transition-all"
                >
                  <Plus className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => onAdjustStock(product, -1)}
                  className="h-12 rounded-2xl bg-destructive/10 text-destructive border border-destructive/10 flex items-center justify-center active:scale-90 transition-all"
                >
                  <Minus className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => onInventory(product)}
                  className="h-12 rounded-2xl bg-primary text-white flex items-center justify-center gap-2 shadow-xl shadow-primary/20 active:scale-95 transition-all border border-primary-light/20"
                >
                  <ClipboardCheck className="h-4 w-4" />
                  <span className="text-[10px] font-black">جرد</span>
                </button>
                <button 
                  onClick={() => onEdit(product)}
                  className="h-12 rounded-2xl bg-secondary border border-border/40 flex items-center justify-center active:scale-95 transition-all"
                >
                  <Edit2 className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
