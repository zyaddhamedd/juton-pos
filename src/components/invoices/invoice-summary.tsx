"use client"

import { cn } from "@/lib/utils"
import { TrendingUp, Users, CreditCard, AlertTriangle } from "lucide-react"

interface SummaryCardProps {
  label: string
  value: string
  subValue: string
  icon: any
  variant?: "primary" | "warning" | "danger" | "success"
}

function SummaryCard({ label, value, subValue, icon: Icon, variant = "primary" }: SummaryCardProps) {
  const variants = {
    primary: "from-primary/10 to-transparent border-primary/20 text-primary",
    warning: "from-warning/10 to-transparent border-warning/20 text-warning",
    danger: "from-danger/10 to-transparent border-danger/20 text-danger",
    success: "from-success/10 to-transparent border-success/20 text-success"
  }

  return (
    <div className={cn(
      "relative overflow-hidden bg-card border rounded-2xl p-4 lg:p-5 bg-gradient-to-br",
      variants[variant]
    )}>
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">{label}</p>
          <h3 className="text-xl lg:text-2xl font-black tracking-tight text-foreground">{value}</h3>
          <p className="text-[10px] font-bold text-muted-foreground">{subValue}</p>
        </div>
        <div className="p-2 lg:p-3 rounded-xl bg-background/50 border border-border/40 shrink-0">
          <Icon className="h-4 lg:h-5 w-4 lg:w-5" />
        </div>
      </div>
    </div>
  )
}

export function InvoiceSummaryWidgets() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
      <SummaryCard 
        label="إجمالي المبيعات"
        value="45,820"
        subValue="+12% عن الأمس"
        icon={TrendingUp}
      />
      <SummaryCard 
        label="الديون المستحقة"
        value="12,450"
        subValue="من 8 عملاء"
        variant="danger"
        icon={AlertTriangle}
      />
      <SummaryCard 
        label="التحصيل اليومي"
        value="8,200"
        subValue="نقداً وبنك"
        variant="success"
        icon={CreditCard}
      />
      <SummaryCard 
        label="فواتير آجلة"
        value="15"
        subValue="تحتاج متابعة"
        variant="warning"
        icon={Users}
      />
    </div>
  )
}
