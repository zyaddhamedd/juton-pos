"use client"

import * as React from "react"
import { Drawer } from "@/components/shared/drawer"
import { BottomSheet } from "@/components/shared/bottom-sheet"
import { Currency } from "@/components/ui/currency"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Expense, EXPENSE_CATEGORIES } from "@/lib/mock-data"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { 
  Printer, 
  Copy, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  CreditCard, 
  Tag, 
  FileText, 
  History,
  CheckCircle2,
  Clock,
  AlertCircle,
  MoreVertical,
  Download,
  Share2
} from "lucide-react"
import { cn } from "@/lib/utils"

interface ExpenseDetailsDrawerProps {
  expense: Expense | null
  isOpen: boolean
  onClose: () => void
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

export function ExpenseDetailsDrawer({ expense, isOpen, onClose, onEdit, onDelete }: ExpenseDetailsDrawerProps) {
  if (!expense) return null

  const category = EXPENSE_CATEGORIES.find(c => c.id === expense.category)
  
  const statusConfig = {
    approved: { label: "مقبول", icon: <CheckCircle2 className="h-4 w-4" />, color: "text-success bg-success/10 border-success/20" },
    review: { label: "قيد المراجعة", icon: <History className="h-4 w-4" />, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
    pending: { label: "معلق", icon: <Clock className="h-4 w-4" />, color: "text-warning bg-warning/10 border-warning/20" },
    rejected: { label: "مرفوض", icon: <AlertCircle className="h-4 w-4" />, color: "text-danger bg-danger/10 border-danger/20" },
  }

  const currentStatus = statusConfig[expense.status]

  const Content = (
    <div className="space-y-8 pb-10">
      {/* Hero Section */}
      <div className="relative p-6 rounded-3xl bg-secondary/10 border border-border/50 overflow-hidden">
         <div className="absolute top-0 right-0 p-12 -mr-12 -mt-12 bg-primary/5 rounded-full blur-3xl" />
         <div className="relative z-10 flex flex-col items-center text-center space-y-3">
            <div className="h-16 w-16 rounded-2xl bg-card flex items-center justify-center text-primary shadow-xl border border-border/50">
               <Tag className="h-8 w-8" />
            </div>
            <div className="space-y-1">
               <h2 className="text-lg font-black tracking-tight">{expense.title}</h2>
               <p className="text-[10px] font-bold text-muted-foreground tabular-nums uppercase tracking-widest">{expense.id}</p>
            </div>
            <Currency amount={expense.amount} size="xl" className="font-black text-primary" />
            <div className={cn("inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[11px] font-black border", currentStatus.color)}>
               {currentStatus.icon}
               {currentStatus.label}
            </div>
         </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-4">
         <DetailItem icon={<Tag className="h-4 w-4" />} label="التصنيف" value={category?.label || expense.category} />
         <DetailItem icon={<CreditCard className="h-4 w-4" />} label="طريقة الدفع" value={expense.paymentMethod === 'cash' ? 'نقدي' : expense.paymentMethod === 'card' ? 'فيزا' : 'بنكي'} />
         <DetailItem icon={<Calendar className="h-4 w-4" />} label="التاريخ" value={format(new Date(expense.date), "dd MMMM yyyy")} />
         <DetailItem icon={<Clock className="h-4 w-4" />} label="الوقت" value={format(new Date(expense.date), "hh:mm aa")} />
         <DetailItem icon={<User className="h-4 w-4" />} label="الموظف" value={expense.employee} />
         <DetailItem icon={<History className="h-4 w-4" />} label="آخر تحديث" value={format(new Date(expense.updatedAt), "dd/MM/yyyy HH:mm")} />
      </div>

      {/* Notes */}
      {expense.notes && (
        <div className="p-4 rounded-2xl bg-secondary/5 border border-border/30 space-y-2">
           <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
              <FileText className="h-3 w-3" />
              ملاحظات
           </div>
           <p className="text-xs font-medium leading-relaxed text-foreground/80">{expense.notes}</p>
        </div>
      )}

      {/* Attachment Preview Placeholder */}
      <div className="space-y-3">
         <div className="flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">المرفقات</span>
            <button className="text-[10px] font-black text-primary hover:underline">تحميل الكل</button>
         </div>
         <div className="group relative aspect-video rounded-3xl bg-secondary/20 border border-border/50 flex flex-col items-center justify-center gap-3 overflow-hidden cursor-pointer hover:bg-secondary/30 transition-all">
            <div className="h-12 w-12 rounded-full bg-card flex items-center justify-center text-muted-foreground shadow-lg">
               <Download className="h-5 w-5" />
            </div>
            <p className="text-[10px] font-black text-muted-foreground">عرض الإيصال المرفق</p>
         </div>
      </div>

      {/* Quick Actions Footer */}
      <div className="grid grid-cols-2 gap-3 pt-4">
         <Button variant="secondary" className="h-14 rounded-2xl font-black text-xs" leftIcon={<Printer className="h-4 w-4" />}>طباعة</Button>
         <Button variant="secondary" className="h-14 rounded-2xl font-black text-xs" leftIcon={<Copy className="h-4 w-4" />}>تكرار</Button>
         <Button variant="primary" className="h-14 rounded-2xl font-black text-xs col-span-2" onClick={() => { onClose(); onEdit(expense); }} leftIcon={<Edit className="h-4 w-4" />}>تعديل البيانات</Button>
         <Button variant="ghost" className="h-14 rounded-2xl font-black text-xs col-span-2 text-danger hover:bg-danger/10" onClick={() => { if(confirm("حذف؟")) onDelete(expense.id) }} leftIcon={<Trash2 className="h-4 w-4" />}>حذف المصروف نهائياً</Button>
      </div>
    </div>
  )

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="تفاصيل المصروف"
        className="max-w-md hidden lg:block"
      >
        {Content}
      </Drawer>
      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
        title="تفاصيل المصروف"
        className="lg:hidden"
      >
        {Content}
      </BottomSheet>
    </>
  )
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="p-3 rounded-2xl bg-card border border-border/30 space-y-1">
       <div className="flex items-center gap-2 text-[9px] font-black text-muted-foreground uppercase tracking-widest">
          {icon}
          {label}
       </div>
       <div className="text-[11px] font-black truncate">{value}</div>
    </div>
  )
}
