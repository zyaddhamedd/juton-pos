"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard, PieChart } from "lucide-react"
import { Currency } from "@/components/ui/currency"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: number
  subtitle?: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  delay?: number
  className?: string
}

function StatCard({ title, value, subtitle, icon, trend, delay = 0, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "relative overflow-hidden group p-5 rounded-2xl bg-card/40 border border-border/50 backdrop-blur-xl hover:border-primary/30 transition-all",
        className
      )}
    >
      <div className="absolute top-0 right-0 p-8 -mr-8 -mt-8 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-500" />
      
      <div className="flex items-start justify-between relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{title}</p>
          <div className="flex items-baseline gap-2">
            <Currency amount={value} size="xl" className="font-black tracking-tighter" />
          </div>
          {subtitle && (
            <p className="text-[10px] text-muted-foreground font-medium">{subtitle}</p>
          )}
        </div>
        <div className="h-10 w-10 rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
      </div>

      {trend && (
        <div className="mt-4 flex items-center gap-1.5 relative z-10">
          <div className={cn(
            "flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg text-[10px] font-black",
            trend.isPositive ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
          )}>
            {trend.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trend.value}%
          </div>
          <span className="text-[9px] text-muted-foreground font-bold">مقارنة بالشهر الماضي</span>
        </div>
      )}
    </motion.div>
  )
}

export function ExpenseStats({ expenses }: { expenses: any[] }) {
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const todayExpenses = expenses
    .filter(e => new Date(e.date).toDateString() === new Date().toDateString())
    .reduce((sum, e) => sum + e.amount, 0)
    
  // Simple logic for categories
  const categoryTotals = expenses.reduce((acc: any, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount
    return acc
  }, {})
  
  const topCategory = Object.entries(categoryTotals).sort((a: any, b: any) => b[1] - a[1])[0]
  const avgDaily = totalExpenses / 30 // Rough estimate

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <StatCard 
        title="إجمالي المصروفات" 
        value={totalExpenses} 
        icon={<DollarSign className="h-5 w-5" />}
        trend={{ value: 12.5, isPositive: false }}
        delay={0.1}
      />
      <StatCard 
        title="مصروفات اليوم" 
        value={todayExpenses} 
        icon={<Wallet className="h-5 w-5" />}
        subtitle={`${expenses.filter(e => new Date(e.date).toDateString() === new Date().toDateString()).length} عمليات اليوم`}
        delay={0.2}
      />
      <StatCard 
        title="متوسط الصرف اليومي" 
        value={avgDaily} 
        icon={<CreditCard className="h-5 w-5" />}
        trend={{ value: 4.2, isPositive: true }}
        delay={0.4}
      />
    </div>
  )
}
