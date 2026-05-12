"use client"

import { motion } from "framer-motion"
import { TrendingUp, Wallet, Package2, Users2, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ElementType
  color: string
}

function StatCard({ title, value, change, trend, icon: Icon, color }: StatCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.96 }}
      className="relative group bg-card border border-border/50 rounded-[24px] p-4 shadow-sm overflow-hidden"
    >
      {/* Background Decorative Blur */}
      <div className={cn(
        "absolute -right-8 -bottom-8 w-32 h-32 blur-[50px] opacity-[0.06] transition-all duration-700 group-hover:opacity-[0.12]",
        color
      )} />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider truncate">{title}</span>
            <div className="flex items-baseline gap-1.5 flex-wrap">
              <h3 className="text-lg font-black tabular-nums tracking-tighter truncate">{value}</h3>
              <div className={cn(
                "text-[9px] font-bold",
                trend === "up" ? "text-success" : "text-destructive"
              )}>
                {change}
              </div>
            </div>
          </div>
          <div className={cn(
            "w-9 h-9 shrink-0 rounded-xl flex items-center justify-center border border-border/50 bg-muted/20 shadow-inner",
            "transition-all duration-500 group-hover:rotate-6"
          )}>
            <Icon className={cn("w-4.5 h-4.5", color.replace('bg-', 'text-'))} />
          </div>
        </div>

        {/* Mini Sparkline - More Compact */}
        <div className="h-7 w-full opacity-40 group-hover:opacity-80 transition-opacity duration-500">
          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d={trend === "up" 
                ? "M0,35 Q20,32 40,20 T80,15 T100,5" 
                : "M0,5 Q20,10 40,25 T80,30 T100,35"}
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              className={trend === "up" ? "text-success" : "text-destructive"}
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: "مبيعات اليوم",
      value: "12,450 ج.م",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-blue-500"
    },
    {
      title: "رصيد الخزينة",
      value: "45,800 ج.م",
      change: "+5.2%",
      trend: "up",
      icon: Wallet,
      color: "bg-emerald-500"
    },
    {
      title: "نواقص المخزون",
      value: "14 منتج",
      change: "-2",
      trend: "down",
      icon: Package2,
      color: "bg-orange-500"
    },
    {
      title: "عملاء نشطون",
      value: "124",
      change: "+8",
      trend: "up",
      icon: Users2,
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat as any} />
      ))}
    </div>
  )
}
