"use client"

import * as React from "react"
import { InvoiceStatusBadge } from "./invoice-status-badge"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { ChevronLeft, MoreVertical, Printer, Eye, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Invoice } from "@/lib/mock-data"

interface InvoiceListItemProps {
  invoice: Invoice
}

export function InvoiceListItem({ invoice }: InvoiceListItemProps) {
  return (
    <Link 
      href={`/invoices/${invoice.id}`}
      className="group block bg-card border border-border/40 hover:border-primary/40 rounded-2xl p-3 lg:p-4 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 active:scale-[0.99]"
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left: Info */}
        <div className="flex items-center gap-3 lg:gap-5 flex-1 min-w-0">
          <div className="hidden sm:flex h-12 w-12 rounded-xl bg-secondary/30 items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors">
            <span className="text-xs font-black text-primary/60">{invoice.number.replace("#", "")}</span>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-sm lg:text-base font-black text-foreground truncate">{invoice.customerName}</h3>
              <InvoiceStatusBadge status={invoice.status} className="shrink-0" />
            </div>
            
            <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
              <span>{format(new Date(invoice.date), "dd MMM yyyy • HH:mm", { locale: ar })}</span>
              <span className="hidden sm:inline opacity-30">•</span>
              <span className="hidden sm:inline uppercase tracking-widest text-[8px] font-black">{invoice.paymentMethod}</span>
            </div>
          </div>
        </div>

        {/* Right: Totals & Actions */}
        <div className="flex items-center gap-4 lg:gap-8 shrink-0">
          <div className="text-right space-y-0.5">
            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40">المبلغ الإجمالي</p>
            <div className="flex items-center justify-end gap-1">
              <span className="text-sm lg:text-base font-black text-foreground">{invoice.total.toLocaleString()}</span>
              <span className="text-[9px] font-bold text-muted-foreground">ج.م</span>
            </div>
            {invoice.remainingAmount > 0 && (
              <div className="flex items-center justify-end gap-1 text-danger">
                <span className="text-[10px] font-black">-{invoice.remainingAmount.toLocaleString()}</span>
                <span className="text-[8px] font-bold">باقي</span>
              </div>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-2">
             <button className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all">
                <Printer className="h-4 w-4" />
             </button>
             <div className="h-4 w-px bg-border/40 mx-1" />
             <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-transform group-hover:-translate-x-1" />
          </div>
          
          <div className="lg:hidden">
            <ChevronLeft className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </Link>
  )
}
