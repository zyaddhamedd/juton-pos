"use client"

import * as React from "react"
import { Package, AlertTriangle, BadgeDollarSign } from "lucide-react"
import { Currency } from "@/components/ui/currency"
import { cn } from "@/lib/utils"

interface SummaryCardProps {
  title: string
  value: string | number
  icon: React.ElementType
  description?: string
  variant?: "default" | "warning" | "success"
  isCurrency?: boolean
}

function SummaryCard({ title, value, icon: Icon, description, variant = "default", isCurrency }: SummaryCardProps) {
  return (
    <div className="bg-card border border-border/50 rounded-2xl p-3 lg:p-4 flex items-center gap-3 lg:gap-4 hover:border-border transition-all group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className={cn(
        "h-10 w-10 lg:h-12 lg:w-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner",
        variant === "default" && "bg-primary/10 text-primary",
        variant === "warning" && "bg-warning/10 text-warning",
        variant === "success" && "bg-success/10 text-success"
      )}>
        <Icon className="h-5 w-5 lg:h-6 lg:w-6" />
      </div>

      <div className="flex-1 min-w-0 relative z-10">
        <p className="text-[8px] lg:text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">{title}</p>
        <div className="flex items-baseline gap-1">
          {isCurrency ? (
            <Currency amount={Number(value)} size="md" className="text-foreground tracking-tight font-black lg:text-lg" />
          ) : (
            <span className="text-lg lg:text-2xl font-black text-foreground tracking-tight">{value}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export function InventorySummary({ products }: { products: any[] }) {
  const totalProducts = products.length
  const lowStock = products.filter(p => p.stock > 0 && p.stock <= 10).length
  const outOfStock = products.filter(p => p.stock === 0).length
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0)

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
      <SummaryCard 
        title="المنتجات" 
        value={totalProducts} 
        icon={Package} 
      />
      <SummaryCard 
        title="النواقص" 
        value={lowStock + outOfStock} 
        icon={AlertTriangle} 
        variant="warning"
      />
      <div className="col-span-2 lg:col-span-1">
        <SummaryCard 
          title="قيمة المخزون" 
          value={totalValue} 
          icon={BadgeDollarSign} 
          variant="success"
          isCurrency
        />
      </div>
    </div>
  )
}
