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
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={cn(
        "relative group glass-card rounded-[28px] p-5 overflow-hidden transition-all duration-500",
        "hover:shadow-2xl hover:border-white/20",
        color === "bg-accent" && "hover:shadow-accent/10 hover:border-accent/30",
        color === "bg-danger" && "hover:shadow-danger/10 hover:border-danger/30",
        color === "bg-primary" && "hover:shadow-primary/10 hover:border-primary/30"
      )}
    >
      {/* Background Decorative Blur */}
      <div className={cn(
        "absolute -right-8 -bottom-8 w-32 h-32 blur-[40px] opacity-[0.08] transition-all duration-700 group-hover:opacity-[0.2] group-hover:scale-150",
        color
      )} />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] truncate">{title}</span>
            <div className="flex items-baseline gap-2 flex-wrap">
              <h3 className="text-xl font-black tabular-nums tracking-tighter truncate">{value}</h3>
              <div className={cn(
                "text-[10px] font-black px-1.5 py-0.5 rounded-lg",
                trend === "up" ? "text-success bg-success/10" : "text-danger bg-danger/10"
              )}>
                {change}
              </div>
            </div>
          </div>
          <div className={cn(
            "w-10 h-10 shrink-0 rounded-2xl flex items-center justify-center border border-white/5 bg-white/5 shadow-inner",
            "transition-all duration-500 group-hover:rotate-12 group-hover:scale-110",
            color === "bg-accent" && "group-hover:bg-accent/20 group-hover:border-accent/30",
            color === "bg-danger" && "group-hover:bg-danger/20 group-hover:border-danger/30",
            color === "bg-primary" && "group-hover:bg-primary/20 group-hover:border-primary/30"
          )}>
            <Icon className={cn("w-5 h-5", color.replace('bg-', 'text-'))} />
          </div>
        </div>

        {/* Mini Sparkline - More Compact */}
        <div className="h-8 w-full opacity-30 group-hover:opacity-100 transition-all duration-700">
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
              className={trend === "up" ? "text-success" : "text-danger"}
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
      color: "bg-primary"
    },
    {
      title: "رصيد الخزينة",
      value: "45,800 ج.م",
      change: "+5.2%",
      trend: "up",
      icon: Wallet,
      color: "bg-accent"
    },
    {
      title: "نواقص المخزون",
      value: "14 منتج",
      change: "-2",
      trend: "down",
      icon: Package2,
      color: "bg-danger"
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
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat as any} />
      ))}
    </div>
  )
}
