"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { EXPENSE_CATEGORIES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export function ExpenseCharts({ expenses }: { expenses: any[] }) {
  // Category distribution
  const categoryTotals = expenses.reduce((acc: any, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})

  const total = Object.values(categoryTotals).reduce((sum: number, val: any) => sum + (val as number), 0)
  const sortedCategories = Object.entries(categoryTotals)
    .sort((a: any, b: any) => b[1] - a[1])
    .map(([id, amount]) => {
      const cat = EXPENSE_CATEGORIES.find(c => c.id === id)
      return {
        id,
        label: cat?.label || id,
        color: cat?.color || "#94A3B8",
        amount: amount as number,
        percent: total > 0 ? ((amount as number) / total) * 100 : 0
      }
    })

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Category Breakdown */}
      <div className="p-6 rounded-3xl bg-card/40 border border-border/50 backdrop-blur-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black text-foreground uppercase tracking-tight">توزيع المصروفات حسب الفئة</h3>
          <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Monthly Share</span>
        </div>
        
        <div className="space-y-4">
          {sortedCategories.map((cat, idx) => (
            <div key={cat.id} className="space-y-1.5">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span className="text-[11px] font-bold text-foreground">{cat.label}</span>
                </div>
                <span className="text-[10px] font-black text-muted-foreground">{cat.percent.toFixed(1)}%</span>
              </div>
              <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${cat.percent}%` }}
                  transition={{ duration: 1, delay: idx * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Trend (Simplified Custom Chart) */}
      <div className="p-6 rounded-3xl bg-card/40 border border-border/50 backdrop-blur-xl flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm font-black text-foreground uppercase tracking-tight">التريند الأسبوعي</h3>
          <div className="flex items-center gap-2">
             <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[8px] font-black text-muted-foreground uppercase">Expenses</span>
             </div>
          </div>
        </div>
        
        <div className="flex-1 flex items-end justify-between gap-2 min-h-[160px] pb-2">
          {[65, 45, 85, 30, 90, 55, 75].map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${val}%` }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="w-full bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-colors relative"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                </motion.div>
              </div>
              <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter">
                {['SAT', 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
