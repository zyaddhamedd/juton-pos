import { Card } from "@/components/ui/card"
import { Currency } from "@/components/ui/currency"
import { Wallet, Banknote, CreditCard, TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react"

interface KPICardProps {
  label: string
  value: number
  icon: React.ReactNode
  trend?: number
  type: "income" | "expense" | "balance" | "digital"
}

function KPICard({ label, value, icon, trend, type }: KPICardProps) {
  const colors = {
    income: "bg-success/10 text-success",
    expense: "bg-danger/10 text-danger",
    balance: "bg-primary/10 text-primary",
    digital: "bg-accent/10 text-accent",
  }

  return (
    <Card className="p-5 flex flex-col gap-3 relative overflow-hidden group hover:border-primary/50 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className={`p-2.5 rounded-xl ${colors[type]}`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div className={`flex items-center text-xs font-medium ${trend >= 0 ? 'text-success' : 'text-danger'}`}>
            {trend >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
        <div className="text-2xl font-bold mt-1">
          <Currency amount={value} />
        </div>
      </div>
      
      {/* Decorative gradient */}
      <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity ${colors[type]}`} />
    </Card>
  )
}

import { useTreasury } from "@/store/use-treasury"

export function TreasuryKPI() {
  const { balances, transactions } = useTreasury()
  
  const todayExpenses = transactions
    .filter(tx => {
      const txDate = tx.timestamp instanceof Date ? tx.timestamp : new Date(tx.timestamp)
      return tx.type === 'expense' && txDate.toDateString() === new Date().toDateString()
    })
    .reduce((acc, tx) => acc + Math.abs(tx.amount), 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      <KPICard 
        label="إجمالي رصيد النظام" 
        value={balances.cash + balances.visa + balances.instapay} 
        icon={<Wallet className="w-5 h-5" />} 
        type="balance"
      />
      <KPICard 
        label="النقدية (Cash)" 
        value={balances.cash} 
        icon={<Banknote className="w-5 h-5" />} 
        type="balance"
      />
      <KPICard 
        label="فيزا (Visa)" 
        value={balances.visa} 
        icon={<CreditCard className="w-5 h-5" />} 
        type="digital"
      />
      <KPICard 
        label="إنستا باي (InstaPay)" 
        value={balances.instapay} 
        icon={<CreditCard className="w-5 h-5" />} 
        type="digital"
      />
      <KPICard 
        label="مصروفات اليوم" 
        value={todayExpenses} 
        icon={<ArrowDownRight className="w-5 h-5" />} 
        type="expense"
      />
    </div>
  )
}
