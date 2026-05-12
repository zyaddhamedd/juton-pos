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
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ 
          scale: 0.92, 
          rotate: -1,
          boxShadow: "0 0 0 rgba(0,0,0,0)" 
        }}
        className={cn(
          "relative h-full flex flex-col items-center justify-center p-6 rounded-[40px] transition-all duration-500 overflow-hidden border border-white/10 shadow-xl",
          "lg:bg-card lg:border-border/40 lg:text-foreground", // Desktop Styles
          "bg-gradient-to-br text-white shadow-lg", // Mobile Base
          color // This will now provide the gradient for mobile
        )}
      >
        {/* Glow Effect for Mobile */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 blur-2xl rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
        
        {/* Background Icon Watermark */}
        <Icon className="absolute -left-4 -bottom-4 w-24 h-24 text-white opacity-[0.1] -rotate-12 group-hover:rotate-0 transition-transform duration-700" />

        <div className="w-16 h-16 rounded-[24px] bg-white/20 backdrop-blur-md flex items-center justify-center mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-[15deg] shadow-lg border border-white/20">
          <Icon className="w-8 h-8 text-white drop-shadow-md" />
        </div>
        
        <div className="text-center relative z-10">
          <span className="block text-lg font-black tracking-tight mb-1">{label}</span>
          <span className="block text-[10px] font-bold text-white/70 leading-tight px-2">{description}</span>
        </div>
        
        {/* Sparkle effect on tap */}
        <div className="absolute inset-0 bg-white/0 active:bg-white/10 transition-colors duration-200" />
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
      color: "from-blue-600 to-blue-400 lg:from-transparent lg:to-transparent"
    },
    {
      label: "صرف مالي",
      description: "تسجيل مصروف جديد",
      icon: Receipt,
      href: "/expenses",
      color: "from-rose-600 to-rose-400 lg:from-transparent lg:to-transparent"
    },
    {
      label: "جرد مخزني",
      description: "تحديث كميات الرف",
      icon: PackageSearch,
      href: "/inventory/count",
      color: "from-orange-600 to-orange-400 lg:from-transparent lg:to-transparent"
    },
    {
      label: "تحصيل ديون",
      description: "سداد حساب عميل",
      icon: Wallet2,
      href: "/customers",
      color: "from-emerald-600 to-emerald-400 lg:from-transparent lg:to-transparent"
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
