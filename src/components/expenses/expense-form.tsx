"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { EXPENSE_CATEGORIES, Expense } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { DollarSign, Tag, CreditCard, User, FileText, Calendar, Upload, History } from "lucide-react"
import { ExpenseReceiptUpload } from "./expense-receipt-upload"

interface ExpenseFormProps {
  expense?: Expense | null
  onSubmit: (data: any) => void
  onCancel: () => void
}

export function ExpenseForm({ expense, onSubmit, onCancel }: ExpenseFormProps) {
  const [formData, setFormData] = React.useState({
    title: expense?.title || "",
    amount: expense?.amount || "",
    category: expense?.category || "other",
    paymentMethod: expense?.paymentMethod || "cash",
    date: expense?.date ? new Date(expense.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
    employee: expense?.employee || "أحمد كمال",
    notes: expense?.notes || "",
    status: expense?.status || "approved",
    receipt: expense?.receipt || null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      amount: Number(formData.amount),
      date: new Date(formData.date).toISOString(),
      updatedAt: new Date().toISOString(),
      createdAt: expense?.createdAt || new Date().toISOString()
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-10 lg:pb-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div className="space-y-2 col-span-full">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">عنوان المصروف</label>
          <Input 
            required
            placeholder="مثال: فاتورة الكهرباء - شهر مايو"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="h-12 bg-secondary/20 border-border/40 focus:border-primary/50 text-sm font-bold"
          />
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">المبلغ</label>
          <div className="relative">
            <Input 
              type="number"
              required
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="h-12 bg-secondary/20 border-border/40 focus:border-primary/50 text-sm font-black pr-10"
            />
            <DollarSign className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Date */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">التاريخ</label>
          <div className="relative">
            <Input 
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="h-12 bg-secondary/20 border-border/40 focus:border-primary/50 text-sm font-bold pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">الفئة</label>
          <div className="relative">
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full h-12 bg-secondary/20 border border-border/40 rounded-xl px-10 text-sm font-bold outline-none focus:border-primary/50 appearance-none"
            >
              {EXPENSE_CATEGORIES.filter(c => c.id !== "all").map(c => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
            <Tag className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">طريقة الدفع</label>
          <div className="relative">
            <select 
              value={formData.paymentMethod}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as any })}
              className="w-full h-12 bg-secondary/20 border border-border/40 rounded-xl px-10 text-sm font-bold outline-none focus:border-primary/50 appearance-none"
            >
              <option value="cash">نقدي</option>
              <option value="card">فيزا</option>
              <option value="bank">تحويل بنكي</option>
            </select>
            <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Status */}
        <div className="space-y-2 col-span-full md:col-span-1">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">الحالة</label>
          <div className="relative">
            <select 
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full h-12 bg-secondary/20 border border-border/40 rounded-xl px-10 text-sm font-bold outline-none focus:border-primary/50 appearance-none"
            >
              <option value="approved">مقبول</option>
              <option value="review">قيد المراجعة</option>
              <option value="pending">معلق</option>
              <option value="rejected">مرفوض</option>
            </select>
            <History className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Employee */}
        <div className="space-y-2 col-span-full md:col-span-1">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">الموظف المسئول</label>
          <div className="relative">
            <Input 
              required
              value={formData.employee}
              onChange={(e) => setFormData({ ...formData, employee: e.target.value })}
              className="h-12 bg-secondary/20 border-border/40 focus:border-primary/50 text-sm font-bold pr-10"
            />
            <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-2 col-span-full">
          <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">ملاحظات إضافية</label>
          <textarea 
            rows={3}
            placeholder="أدخل أي ملاحظات إضافية هنا..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            className="w-full bg-secondary/20 border border-border/40 rounded-xl p-4 text-sm font-bold outline-none focus:border-primary/50 resize-none"
          />
        </div>

        {/* Receipt Upload */}
        <div className="col-span-full">
          <ExpenseReceiptUpload 
            currentFile={formData.receipt}
            onUpload={(file) => setFormData({ ...formData, receipt: file.name })}
            onRemove={() => setFormData({ ...formData, receipt: null })}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-6 border-t border-border/20 sticky bottom-0 bg-background lg:relative lg:bg-transparent">
        <Button 
          variant="secondary" 
          className="flex-1 h-14 rounded-full font-black bg-secondary/50 border-none text-muted-foreground hover:bg-secondary hover:text-foreground transition-all" 
          type="button" 
          onClick={onCancel}
        >
          إلغاء
        </Button>
        <Button 
          variant="primary" 
          className="flex-1 h-14 rounded-full font-black shadow-xl shadow-primary/40 relative overflow-hidden group" 
          type="submit"
          rightIcon={
            <div className="h-10 w-10 rounded-full bg-black/20 flex items-center justify-center -mr-2 shadow-inner group-hover:bg-black/30 transition-all">
              <span className="text-[10px] font-black text-white/90">N</span>
            </div>
          }
        >
          {expense ? "تحديث المصروف" : "حفظ المصروف"}
        </Button>
      </div>
    </form>
  )
}
