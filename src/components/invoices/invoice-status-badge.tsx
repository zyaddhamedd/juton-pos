"use client"

import { cn } from "@/lib/utils"

export type InvoiceStatus = "paid" | "partial" | "credit" | "overdue" | "cancelled"

interface InvoiceStatusBadgeProps {
  status: InvoiceStatus
  className?: string
}

const statusMap: Record<InvoiceStatus, { label: string; className: string; dot: string }> = {
  paid: {
    label: "مدفوع",
    className: "bg-success/10 text-success border-success/20",
    dot: "bg-success"
  },
  partial: {
    label: "مدفوع جزئيًا",
    className: "bg-primary/10 text-primary border-primary/20",
    dot: "bg-primary"
  },
  credit: {
    label: "أجل",
    className: "bg-warning/10 text-warning border-warning/20",
    dot: "bg-warning"
  },
  overdue: {
    label: "متأخر",
    className: "bg-danger/10 text-danger border-danger/20",
    dot: "bg-danger"
  },
  cancelled: {
    label: "ملغي",
    className: "bg-secondary/20 text-muted-foreground border-border/40",
    dot: "bg-muted-foreground"
  }
}

export function InvoiceStatusBadge({ status, className }: InvoiceStatusBadgeProps) {
  const config = statusMap[status]

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-lg border text-[9px] font-black uppercase tracking-widest",
      config.className,
      className
    )}>
      <div className={cn("h-1.5 w-1.5 rounded-full shadow-[0_0_8px_currentColor]", config.dot)} />
      {config.label}
    </div>
  )
}
