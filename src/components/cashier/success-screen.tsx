"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Printer, Share2, FileText, Plus, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Currency } from "@/components/ui/currency"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

import { InvoicePreview } from "./invoice-preview"
import * as React from "react"

interface SuccessScreenProps {
  total: number
  invoiceId: string
  items: any[]
  customer?: any
  onNewInvoice: () => void
}

export function SuccessScreen({ total, invoiceId, items, customer, onNewInvoice }: SuccessScreenProps) {
  const [isInvoiceOpen, setIsInvoiceOpen] = React.useState(false)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 lg:p-6 bg-[radial-gradient(circle_at_top,_var(--color-success),_transparent_70%)] opacity-95">
      {/* 1. Compact Success Icon */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        className="h-20 w-20 bg-success rounded-3xl flex items-center justify-center text-white shadow-[0_10px_40px_rgba(16,185,129,0.3)] mb-6 relative"
      >
        <div className="absolute inset-0 rounded-3xl bg-white/20 animate-pulse" />
        <CheckCircle2 className="h-10 w-10 relative z-10" />
      </motion.div>

      {/* 2. Simplified Title & Reference */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="space-y-1.5 mb-8"
      >
        <h2 className="text-2xl font-black tracking-tight text-foreground">تمت العملية بنجاح</h2>
        <p className="text-muted-foreground font-bold tracking-[0.15em] uppercase text-[10px]">رقم المرجعية: <span className="text-primary">{invoiceId}</span></p>
      </motion.div>

      {/* 3. Compact Summary Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/40 backdrop-blur-xl border border-border/40 rounded-3xl p-6 w-full max-w-sm mb-8 shadow-xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center pb-4 border-b border-border/30 border-dashed">
            <span className="text-muted-foreground font-black text-[9px] uppercase tracking-widest">إجمالي المبيعات</span>
            <Currency amount={total} size="md" className="font-black" />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-[9px] font-black uppercase tracking-widest">طريقة التحصيل</span>
            <Badge variant="success" className="px-3 py-1 rounded-full font-black text-[9px]">دفع كامل</Badge>
          </div>
        </div>
      </motion.div>

      {/* 4. Streamlined Actions Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8"
      >
        <Button 
          variant="secondary" 
          onClick={() => setIsInvoiceOpen(true)}
          className="h-14 rounded-2xl bg-card border-border/30 hover:bg-secondary font-black text-xs" 
          leftIcon={<FileText className="h-5 w-5 text-accent" />}
        >
           عرض الفاتورة
        </Button>
        <Button 
          variant="secondary" 
          className="h-14 rounded-2xl bg-card border-border/30 hover:bg-secondary font-black text-xs" 
          leftIcon={<Share2 className="h-5 w-5 text-accent" />}
        >
           إرسال (WhatsApp)
        </Button>
      </motion.div>

      {/* 5. Bottom Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-4 w-full max-w-sm pb-4"
      >
        <Button 
          variant="primary" 
          size="lg" 
          onClick={onNewInvoice}
          className="h-14 rounded-xl font-black text-sm shadow-lg shadow-primary/20"
          leftIcon={<Plus className="h-5 w-5" />}
        >
          فاتورة جديدة
        </Button>
        
        <Link href="/dashboard" className="text-[11px] font-black text-muted-foreground/60 hover:text-primary transition-colors flex items-center justify-center gap-2 uppercase tracking-widest">
          <Home className="h-3.5 w-3.5" />
          العودة للوحة التحكم
        </Link>
      </motion.div>

      <InvoicePreview 
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
        invoiceId={invoiceId}
        items={items}
        total={total}
        customer={customer}
      />
    </div>
  )
}
