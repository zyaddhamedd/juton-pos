"use client"

import { Card } from "@/components/ui/card"
import { Currency } from "@/components/ui/currency"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  ArrowDownLeft, 
  ArrowUpRight, 
  RefreshCcw, 
  Banknote, 
  ArrowLeftRight,
  User
} from "lucide-react"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import { useTreasury, TransactionType, PaymentMethod } from "@/store/use-treasury"

const typeConfig: Record<TransactionType, { icon: any, label: string, color: string }> = {
  sale: { icon: ShoppingCart, label: "بيع مبيعات", color: "text-success bg-success/10" },
  expense: { icon: ArrowDownLeft, label: "مصروفات", color: "text-danger bg-danger/10" },
  refund: { icon: RefreshCcw, label: "مرتجع", color: "text-orange-500 bg-orange-500/10" },
  deposit: { icon: ArrowUpRight, label: "إيداع نقدي", color: "text-blue-500 bg-blue-500/10" },
  withdrawal: { icon: Banknote, label: "سحب نقدي", color: "text-purple-500 bg-purple-500/10" },
  adjustment: { icon: ArrowLeftRight, label: "تسوية", color: "text-slate-400 bg-slate-400/10" },
  transfer: { icon: ArrowLeftRight, label: "تحويل داخلي", color: "text-blue-400 bg-blue-400/10" },
}

const methodLabels: Record<PaymentMethod, string> = {
  cash: "نقدي",
  visa: "فيزا",
  instapay: "إنستا باي"
}

export function CashflowTimeline() {
  const { transactions } = useTreasury()

  return (
    <Card className="flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between bg-card/50">
        <h3 className="font-semibold">حركة التدفق النقدي (Timeline)</h3>
        <Badge variant="outline" className="font-normal text-xs">محدث لحظياً</Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto p-0">
        {transactions.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
              <RefreshCcw className="w-6 h-6 text-muted-foreground animate-spin-slow" />
            </div>
            <p className="text-sm text-muted-foreground">لا توجد حركات مالية حتى الآن</p>
          </div>
        ) : (
          transactions.map((tx, index) => {
            const config = typeConfig[tx.type] || typeConfig.adjustment
            const Icon = config.icon
            
            return (
              <div 
                key={tx.id} 
                className={`p-5 flex items-center gap-4 hover:bg-muted/30 transition-all relative ${
                  index !== transactions.length - 1 ? 'border-b border-border/50' : ''
                }`}
              >
                {/* Timeline Connector - Adjusted for RTL */}
                {index !== transactions.length - 1 && (
                  <div className="absolute right-[44px] top-[60px] bottom-0 w-[1.5px] bg-border/40 z-0" />
                )}
                
                <div className="flex-1 min-w-0 order-2">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-bold text-sm text-foreground">{config.label}</span>
                    <div className={`font-black text-base ${tx.amount >= 0 ? 'text-success' : 'text-danger'}`}>
                      {tx.amount >= 0 ? '+' : ''}
                      <Currency amount={tx.amount} />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-muted-foreground text-[10px] font-medium">
                      {tx.timestamp instanceof Date ? format(tx.timestamp, "HH:mm", { locale: ar }) : format(new Date(tx.timestamp), "HH:mm", { locale: ar })}
                    </span>
                    <span className="text-muted-foreground/30 text-[10px]">•</span>
                    <p className="text-[11px] text-muted-foreground truncate max-w-[150px]">{tx.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-muted/10 text-[9px] px-1.5 py-0 border-border/50 text-muted-foreground">
                      {methodLabels[tx.method]}
                      {tx.toMethod && ` ➔ ${methodLabels[tx.toMethod]}`}
                    </Badge>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground/70">
                      <User className="w-2.5 h-2.5" />
                      {tx.user}
                    </div>
                  </div>
                </div>

                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 z-10 shadow-sm border border-border/10 order-3 ${config.color.split(' ')[1]} ${config.color.split(' ')[0]}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
            )
          })
        )}
      </div>
      
      <div className="p-3 bg-muted/20 border-t border-border text-center">
        <button className="text-xs text-primary font-medium hover:underline">عرض جميع الحركات</button>
      </div>
    </Card>
  )
}
