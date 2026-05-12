"use client"

import * as React from "react"
import { useCart } from "@/store/use-cart"
import { Currency } from "@/components/ui/currency"
import { Button } from "@/components/ui/button"
import { 
  Banknote, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  CheckCircle2, 
  AlertCircle,
  TrendingDown,
  UserPlus,
  ArrowRightLeft
} from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

const PAYMENT_METHODS = [
  { id: 'cash', label: 'نقدي', icon: Banknote },
  { id: 'visa', label: 'فيزا', icon: CreditCard },
  { id: 'instapay', label: 'إنستاباي', icon: Smartphone },
  { id: 'credit', label: 'آجل', icon: Wallet },
]

export function PaymentWorkflow({ onComplete }: { onComplete: () => void }) {
  const { getTotal, customer } = useCart()
  const [method, setMethod] = React.useState('cash')
  const [received, setReceived] = React.useState<string>(getTotal().toString())
  
  const total = getTotal()
  const receivedNum = parseFloat(received) || 0
  const remaining = total - receivedNum
  
  // Validation logic
  const isCredit = method === 'credit'
  const hasCustomer = !!customer
  const isComplete = isCredit 
    ? (hasCustomer && receivedNum <= total) 
    : (receivedNum >= total)

  // Compact finance chips
  const creditShortcuts = [
    { label: "0%", value: 0 },
    { label: "25%", value: total * 0.25 },
    { label: "50%", value: total * 0.5 },
    { label: "75%", value: total * 0.75 },
    { label: "100%", value: total },
  ]

  // Quick amounts for cash
  const quickAmounts = Array.from(new Set([
    total,
    Math.ceil(total / 50) * 50,
    Math.ceil(total / 100) * 100,
  ]))

  return (
    <div className="flex flex-col h-full -mx-6 -mb-6">
      {/* 1. Refined Total Section */}
      <div className="bg-accent/[0.03] p-4 border-b border-border/40 flex items-center justify-between relative overflow-hidden -mt-6">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-30" />
        <div className="relative z-10">
          <p className="text-[7px] font-black text-accent/60 uppercase tracking-[0.3em] mb-0.5">قيمة الفاتورة الكلية</p>
          <Currency amount={total} size="lg" className="text-accent tracking-tighter" />
        </div>
        <div className="relative z-10 h-9 w-9 bg-accent/10 rounded-xl flex items-center justify-center text-accent">
          <Banknote className="h-4 w-4" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-5 space-y-4">
        {/* 2. Payment Methods Grid */}
        <div className="space-y-2">
          <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.2em] px-0.5">طريقة السداد</p>
          <div className="grid grid-cols-4 gap-1.5">
            {PAYMENT_METHODS.map((m) => {
              const Icon = m.icon
              const isSelected = method === m.id
              
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setMethod(m.id)
                    if (m.id === 'cash') setReceived(total.toString())
                  }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 py-2 rounded-xl border transition-all duration-300 relative overflow-hidden",
                    isSelected 
                      ? "bg-accent border-accent text-accent-foreground shadow-md shadow-accent/10" 
                      : "bg-secondary/10 border-border/20 text-muted-foreground/60 hover:border-accent/20 hover:bg-secondary/30"
                  )}
                >
                  <Icon className={cn("h-3.5 w-3.5", isSelected ? "text-accent-foreground" : "text-muted-foreground/60")} />
                  <span className="font-bold text-[8px] uppercase tracking-tighter">{m.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Workflow Transition */}
        <AnimatePresence mode="wait">
          {isCredit ? (
            <motion.div 
              key="credit-flow"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-4"
            >
              {/* PAID NOW - PRIMARY INPUT */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-0.5">
                  <p className="text-[8px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">المدفوع الآن</p>
                  <span className="text-[9px] font-bold text-accent/70 bg-accent/5 px-2 py-0.5 rounded-full border border-accent/10">
                    {((receivedNum / total) * 100).toFixed(0)}% مقدم
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent/40 font-black text-[10px] z-10">ج.م</div>
                  <input 
                    type="number"
                    value={received}
                    onChange={(e) => setReceived(e.target.value)}
                    className="w-full h-14 bg-secondary/20 border border-border/30 rounded-2xl text-xl font-black pr-12 pl-4 focus:bg-card focus:border-accent/40 transition-all outline-none text-right shadow-sm"
                    placeholder="0.00"
                  />
                </div>

                {/* Compact Finance Chips */}
                <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
                  {creditShortcuts.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setReceived(s.value.toFixed(0))}
                      className={cn(
                        "h-7 px-3 rounded-full text-[9px] font-black transition-all border whitespace-nowrap",
                        receivedNum === Math.round(s.value)
                          ? "bg-accent border-accent text-accent-foreground"
                          : "bg-secondary/10 border-border/20 text-muted-foreground/60 hover:bg-secondary/20"
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* REMAINING BALANCE - ELEGANT SUMMARY CARD */}
              <div className="bg-gradient-to-br from-secondary/10 to-destructive/[0.03] border border-border/30 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group">
                <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity">
                  <TrendingDown className="h-16 w-16 text-destructive" />
                </div>
                
                <div className="relative z-10 flex flex-col gap-0.5">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-destructive/60" />
                    <p className="text-[8px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">المبلغ المتبقي</p>
                  </div>
                  <Currency amount={remaining} size="xl" className="text-destructive tracking-tighter" />
                </div>

                <div className="relative z-10 text-right space-y-1">
                  <p className="text-[8px] font-black text-muted-foreground/40 uppercase tracking-[0.2em]">حالة الذمم</p>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 bg-destructive/10 text-destructive text-[8px] font-black rounded-lg border border-destructive/10 uppercase">
                      مديونية آجلة
                    </span>
                  </div>
                </div>
              </div>

              {/* REFINED STATUS MESSAGE */}
              <AnimatePresence>
                {hasCustomer ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2.5 px-1 py-1"
                  >
                    <div className="h-8 w-8 rounded-xl bg-accent/5 border border-accent/10 flex items-center justify-center text-accent/60">
                      <UserPlus className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-black text-muted-foreground/40 leading-none mb-1 uppercase tracking-tighter">التوجيه المالي</p>
                      <p className="text-[10px] font-bold text-foreground truncate">إضافة <span className="text-destructive">{remaining} ج.م</span> لحساب {customer.name}</p>
                    </div>
                    <ArrowRightLeft className="h-3 w-3 text-muted-foreground/20" />
                  </motion.div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-warning/[0.03] border border-warning/10 p-3 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle className="h-4 w-4 text-warning/60" />
                    <p className="text-[10px] font-bold text-warning/80">يجب تحديد عميل قبل حفظ الفاتورة الآجلة</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              key="standard-flow"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-0.5">
                  <p className="text-[8px] font-black text-muted-foreground/50 uppercase tracking-[0.2em]">المبلغ المستلم</p>
                  {receivedNum > 0 && receivedNum < total && (
                    <span className="text-[8px] font-bold text-warning/70">المبلغ غير مكتمل</span>
                  )}
                </div>
                
                <div className="relative">
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-accent/40 font-black text-[10px] z-10">ج.م</div>
                  <input 
                    type="number"
                    value={received}
                    onChange={(e) => setReceived(e.target.value)}
                    className="w-full h-12 bg-secondary/10 border border-border/20 rounded-xl text-lg font-black pr-12 pl-4 focus:bg-card focus:border-accent/30 transition-all outline-none text-right shadow-sm"
                  />
                </div>
                
                <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar text-right" dir="rtl">
                  {quickAmounts.map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setReceived(amt.toString())}
                      className="px-3 h-8 bg-secondary/10 border border-border/20 rounded-lg text-[9px] font-black hover:border-accent/20 hover:bg-accent/5 hover:text-accent transition-all whitespace-nowrap"
                    >
                      {amt} ج.م
                    </button>
                  ))}
                </div>
              </div>

              {receivedNum > total && (
                <div className="bg-success/[0.02] p-3 rounded-xl border border-success/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-5 w-5 bg-success/10 rounded-lg flex items-center justify-center text-success/70">
                      <CheckCircle2 className="h-3 w-3" />
                    </div>
                    <span className="text-[9px] font-black text-success/60 uppercase tracking-tighter">المتبقي للعميل (فكة)</span>
                  </div>
                  <Currency amount={receivedNum - total} size="sm" className="text-success/80" />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. Refined Sticky Action */}
      <div className="p-4 bg-card border-t border-border/30 mt-auto">
        <Button 
          variant={isComplete ? "primary" : "secondary"} 
          size="xl" 
          className={cn(
            "w-full h-14 rounded-2xl text-xs font-black transition-all duration-500 shadow-lg relative overflow-hidden group",
            isComplete ? "shadow-accent/10" : "opacity-40 grayscale"
          )}
          disabled={!isComplete}
          onClick={onComplete}
          leftIcon={<CheckCircle2 className="h-4 w-4" />}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          {isCredit ? "تأكيد البيع الآجل" : "تأكيد الدفع والطباعة"}
        </Button>
        
        {isCredit && !hasCustomer && (
          <p className="text-[8px] text-center text-muted-foreground/40 mt-2.5 font-bold uppercase tracking-widest">
            يجب اختيار عميل أولاً
          </p>
        )}
      </div>
    </div>
  )
}
