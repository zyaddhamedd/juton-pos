"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Calendar, Filter, DollarSign, Tag, User, CreditCard, X, RefreshCcw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EXPENSE_CATEGORIES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface AdvancedFiltersProps {
  activeFilters: any
  onFilterChange: (key: string, value: any) => void
  onReset: () => void
}

export function ExpenseAdvancedFilters({ activeFilters, onFilterChange, onReset }: AdvancedFiltersProps) {
  const datePresets = [
    { id: "today", label: "اليوم" },
    { id: "week", label: "هذا الأسبوع" },
    { id: "month", label: "هذا الشهر" },
    { id: "last30", label: "آخر 30 يوم" },
  ]

  const paymentMethods = [
    { id: "cash", label: "نقدي" },
    { id: "card", label: "فيزا" },
    { id: "bank", label: "تحويل بنكي" },
  ]

  const statuses = [
    { id: "approved", label: "مقبول" },
    { id: "review", label: "قيد المراجعة" },
    { id: "pending", label: "معلق" },
    { id: "rejected", label: "مرفوض" },
  ]

  return (
    <div className="space-y-8 py-4">
      {/* Date Presets */}
      <div className="space-y-3">
         <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">نطاق التاريخ</label>
         <div className="grid grid-cols-2 gap-2">
            {datePresets.map(p => (
              <button
                key={p.id}
                onClick={() => onFilterChange('dateRange', p.id)}
                className={cn(
                  "h-11 rounded-xl text-[10px] font-black border transition-all",
                  activeFilters.dateRange === p.id 
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                    : "bg-secondary/10 text-muted-foreground border-border/20 hover:bg-secondary/30"
                )}
              >
                {p.label}
              </button>
            ))}
         </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
         <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">التصنيفات</label>
         <div className="flex flex-wrap gap-2">
            {EXPENSE_CATEGORIES.map(c => (
               <button
                 key={c.id}
                 onClick={() => onFilterChange('category', c.id)}
                 className={cn(
                   "px-4 py-2 rounded-xl text-[10px] font-black border transition-all flex items-center gap-2",
                   activeFilters.category === c.id
                     ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                     : "bg-secondary/10 text-muted-foreground border-border/20 hover:bg-secondary/30"
                 )}
               >
                 {activeFilters.category === c.id && <Check className="h-3 w-3" />}
                 {c.label}
               </button>
            ))}
         </div>
      </div>

      {/* Status */}
      <div className="space-y-3">
         <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">حالة المصروف</label>
         <div className="flex flex-wrap gap-2">
            {statuses.map(s => (
               <button
                 key={s.id}
                 onClick={() => onFilterChange('status', s.id)}
                 className={cn(
                   "px-4 py-2 rounded-xl text-[10px] font-black border transition-all",
                   activeFilters.status === s.id
                     ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                     : "bg-secondary/10 text-muted-foreground border-border/20 hover:bg-secondary/30"
                 )}
               >
                 {s.label}
               </button>
            ))}
         </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
         <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">طريقة الدفع</label>
         <div className="flex flex-wrap gap-2">
            {paymentMethods.map(m => (
               <button
                 key={m.id}
                 onClick={() => onFilterChange('paymentMethod', m.id)}
                 className={cn(
                   "px-4 py-2 rounded-xl text-[10px] font-black border transition-all",
                   activeFilters.paymentMethod === m.id
                     ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                     : "bg-secondary/10 text-muted-foreground border-border/20 hover:bg-secondary/30"
                 )}
               >
                 {m.label}
               </button>
            ))}
         </div>
      </div>

      {/* Amount Range Placeholder */}
      <div className="space-y-3">
         <div className="flex justify-between items-center px-1">
            <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">نطاق المبلغ</label>
            <span className="text-[10px] font-black text-primary">0 - 50,000 ج.م</span>
         </div>
         <div className="h-1.5 w-full bg-secondary rounded-full relative">
            <div className="absolute inset-y-0 left-0 right-1/4 bg-primary rounded-full" />
            <div className="absolute top-1/2 left-0 h-4 w-4 bg-white rounded-full border-2 border-primary -translate-y-1/2 shadow-lg" />
            <div className="absolute top-1/2 right-1/4 h-4 w-4 bg-white rounded-full border-2 border-primary -translate-y-1/2 shadow-lg" />
         </div>
      </div>

      {/* Action Footer */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border/20">
         <Button variant="secondary" className="h-14 rounded-2xl font-black text-xs" onClick={onReset} leftIcon={<RefreshCcw className="h-4 w-4" />}>إعادة تعيين</Button>
         <Button variant="primary" className="h-14 rounded-2xl font-black text-xs" onClick={() => onFilterChange('applied', true)}>تطبيق الفلاتر</Button>
      </div>
    </div>
  )
}
