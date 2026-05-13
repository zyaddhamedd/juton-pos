"use client"

import { motion } from "framer-motion"
import { Plus, Receipt, PackageSearch, Wallet2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface ActionItemProps {
  label: string
  icon: React.ElementType
  href: string
  color: string
  description: string
}

function ActionItem({ label, icon: Icon, href, color, description }: ActionItemProps) {
  return (
    <Link href={href} className="block group w-full">
      <motion.div 
        whileHover={{ y: -10, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative h-full flex flex-col items-center justify-center p-7 rounded-[48px] transition-all duration-700 overflow-hidden border border-white/10 shadow-2xl",
          "glass-card lg:hover:border-white/20", // Base style
          "text-white",
          color.includes('blue') && "bg-gradient-to-br from-primary via-primary-dark to-primary-light shadow-primary/20",
          color.includes('rose') && "bg-gradient-to-br from-danger via-danger/90 to-danger/80 shadow-danger/20",
          color.includes('orange') && "bg-gradient-to-br from-accent via-accent/90 to-[#D4A900] shadow-accent/20 text-black",
          color.includes('emerald') && "bg-gradient-to-br from-success via-success/90 to-[#059669] shadow-success/20"
        )}
      >
        {/* Glow Effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
        
        {/* Background Icon Watermark */}
        <Icon className={cn(
          "absolute -left-4 -bottom-4 w-28 h-28 opacity-[0.1] -rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-1000",
          color.includes('orange') ? "text-black" : "text-white"
        )} />

        <div className={cn(
          "w-18 h-18 rounded-[28px] bg-white/20 backdrop-blur-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] shadow-2xl border border-white/25",
          color.includes('orange') && "bg-black/10 border-black/10"
        )}>
          <Icon className={cn(
            "w-9 h-9 drop-shadow-2xl",
            color.includes('orange') ? "text-black" : "text-white"
          )} />
        </div>
        
        <div className="text-center relative z-10">
          <span className="block text-xl font-black tracking-tight mb-1.5">{label}</span>
          <span className={cn(
            "block text-xs font-bold leading-tight px-3",
            color.includes('orange') ? "text-black/60" : "text-white/70"
          )}>{description}</span>
        </div>
      </motion.div>
    </Link>
  )
}

export function QuickActions() {
  const actions = [
    {
      label: "بيع سريع",
      description: "فتح الكاشير فوراً",
      icon: Plus,
      href: "/cashier",
      color: "blue"
    },
    {
      label: "صرف مالي",
      description: "تسجيل مصروف جديد",
      icon: Receipt,
      href: "/expenses",
      color: "rose"
    },
    {
      label: "جرد مخزني",
      description: "تحديث كميات الرف",
      icon: PackageSearch,
      href: "/inventory/count",
      color: "orange"
    },
    {
      label: "تحصيل ديون",
      description: "سداد حساب عميل",
      icon: Wallet2,
      href: "/customers",
      color: "emerald"
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {actions.map((action, index) => (
        <ActionItem key={index} {...action} />
      ))}
    </div>
  )
}
