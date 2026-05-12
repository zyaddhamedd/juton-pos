"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MoreHorizontal, Edit, Trash2, Eye, Copy, Paperclip, CheckCircle2, Clock, AlertCircle, History } from "lucide-react"
import { Currency } from "@/components/ui/currency"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EXPENSE_CATEGORIES, Expense } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ar } from "date-fns/locale"

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
  onView: (expense: Expense) => void
}

export function ExpenseList({ expenses, onEdit, onDelete, onView }: ExpenseListProps) {
  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-hidden rounded-2xl border border-border/50 bg-card/20 backdrop-blur-sm">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-secondary/20 border-b border-border/50">
              <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">العملية</th>
              <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">الفئة</th>
              <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">طريقة الدفع</th>
              <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">المبلغ</th>
              <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">التاريخ</th>
              <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-center">الحالة</th>
              <th className="px-6 py-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest text-left">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {expenses.map((expense, idx) => (
              <ExpenseTableRow 
                key={expense.id} 
                expense={expense} 
                index={idx}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-3">
        {expenses.map((expense, idx) => (
          <ExpenseMobileCard 
            key={expense.id} 
            expense={expense} 
            index={idx}
            onEdit={onEdit}
            onDelete={onDelete}
            onView={onView}
          />
        ))}
      </div>
    </div>
  )
}

export function StatusBadge({ status, className }: { status: Expense["status"], className?: string }) {
  const configs = {
    approved: { label: "مقبول", icon: <CheckCircle2 className="h-3 w-3" />, className: "bg-success/10 text-success border-success/20" },
    review: { label: "قيد المراجعة", icon: <History className="h-3 w-3" />, className: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    pending: { label: "معلق", icon: <Clock className="h-3 w-3" />, className: "bg-warning/10 text-warning border-warning/20" },
    rejected: { label: "مرفوض", icon: <AlertCircle className="h-3 w-3" />, className: "bg-danger/10 text-danger border-danger/20" },
  }
  const config = configs[status]
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-black border transition-all", config.className, className)}>
      {config.icon}
      {config.label}
    </div>
  )
}

function PaymentMethodBadge({ method }: { method: Expense["paymentMethod"] }) {
  const labels = { cash: "نقدي", card: "فيزا", bank: "بنكي" }
  return (
    <span className="text-[10px] font-bold text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded-md border border-border/50">
      {labels[method]}
    </span>
  )
}

function ExpenseTableRow({ expense, index, onEdit, onDelete, onView }: { expense: Expense, index: number, onEdit: any, onDelete: any, onView: any }) {
  const category = EXPENSE_CATEGORIES.find(c => c.id === expense.category)
  
  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onView(expense)}
      className="group hover:bg-secondary/10 transition-all cursor-pointer"
    >
      <td className="px-6 py-4">
        <div className="flex flex-col">
          <span className="text-xs font-black text-foreground group-hover:text-primary transition-colors">{expense.title}</span>
          <span className="text-[10px] font-bold text-muted-foreground tabular-nums uppercase">{expense.id}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full" style={{ backgroundColor: category?.color || "#94A3B8" }} />
          <span className="text-[11px] font-bold">{category?.label}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <PaymentMethodBadge method={expense.paymentMethod} />
      </td>
      <td className="px-6 py-4">
        <Currency amount={expense.amount} size="sm" className="font-black" />
      </td>
      <td className="px-6 py-4 text-[10px] font-bold text-muted-foreground">
        {format(new Date(expense.date), "dd MMM yyyy", { locale: ar })}
      </td>
      <td className="px-6 py-4 text-center">
        <StatusBadge status={expense.status} />
      </td>
      <td className="px-6 py-4 text-left">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg" onClick={() => onEdit(expense)}>
            <Edit className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-danger hover:text-danger hover:bg-danger/10" onClick={() => onDelete(expense.id)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </td>
    </motion.tr>
  )
}

function ExpenseMobileCard({ expense, index, onEdit, onDelete, onView }: { expense: Expense, index: number, onEdit: any, onDelete: any, onView: any }) {
  const category = EXPENSE_CATEGORIES.find(c => c.id === expense.category)
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onView(expense)}
      className="p-4 rounded-2xl bg-card/40 border border-border/50 space-y-4 active:scale-[0.98] transition-all"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: category?.color || "#94A3B8" }} />
            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">{category?.label}</span>
          </div>
          <h3 className="text-xs font-black text-foreground">{expense.title}</h3>
          <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest tabular-nums">{expense.id} • {format(new Date(expense.date), "dd MMM yyyy", { locale: ar })}</p>
        </div>
        <StatusBadge status={expense.status} />
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/20">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">المبلغ</span>
          <Currency amount={expense.amount} size="md" className="font-black text-primary" />
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">طريقة الدفع</span>
          <PaymentMethodBadge method={expense.paymentMethod} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/20">
         <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-secondary flex items-center justify-center text-[10px] font-black">
              {expense.employee[0]}
            </div>
            <span className="text-[10px] font-bold text-muted-foreground">{expense.employee}</span>
         </div>
         <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="secondary" size="sm" className="h-8 px-2 rounded-lg" onClick={() => onEdit(expense)}>
              <Edit className="h-3.5 w-3.5" />
            </Button>
            <Button variant="secondary" size="sm" className="h-8 px-2 rounded-lg text-danger hover:bg-danger/10" onClick={() => onDelete(expense.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
         </div>
      </div>
    </motion.div>
  )
}
