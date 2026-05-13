"use client"

import { motion } from "framer-motion"
import { Wallet, Landmark, Smartphone, ArrowUpRight } from "lucide-react"
import { useTreasury } from "@/store/use-treasury"

export function FinancialSummary() {
  const { balances } = useTreasury()
  
  const total = balances.cash + balances.visa + balances.instapay

  const items = [
    { label: "كاش", amount: balances.cash, icon: Wallet, color: "text-accent", bg: "bg-accent/20" },
    { label: "فيزا", amount: balances.visa, icon: Landmark, color: "text-blue-400", bg: "bg-blue-500/20" },
    { label: "إنستا باي", amount: balances.instapay, icon: Smartphone, color: "text-danger", bg: "bg-danger/20" },
  ]

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden h-[280px] rounded-[40px] shadow-2xl shadow-primary/40 group"
    >
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-primary bg-gradient-to-br from-primary-light via-primary to-primary-dark" />
      
      {/* Animated Mesh Gradients */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] bg-accent/20 blur-[100px] rounded-full animate-pulse group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] bg-danger/10 blur-[100px] rounded-full animate-pulse delay-700 group-hover:scale-110 transition-transform duration-1000" />
      
      {/* Glass Overlay with Scan effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      <motion.div 
        animate={{ left: ["-100%", "200%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
        className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" 
      />

      <div className="relative h-full p-8 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/15 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/25 shadow-lg">
              <Landmark className="w-6 h-6 text-accent" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">المركز المالي</p>
              <p className="text-sm font-black">جوتن - فرع شبين الكوم</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-success/25 text-white rounded-full border border-success/30 text-[10px] font-black shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
              مباشر
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-black text-white/50 mb-2 uppercase tracking-[4px]">إجمالي الرصيد المتاح</p>
          <div className="flex items-baseline gap-3">
            <h2 className="text-5xl lg:text-6xl font-black tabular-nums tracking-tighter text-accent drop-shadow-[0_0_20px_rgba(247,198,0,0.3)]">
              {total.toLocaleString('en-US')}
            </h2>
            <span className="text-lg font-black opacity-60">ج.م</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 group/item">
              <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center border border-white/10 transition-all duration-300 group-hover/item:scale-110`}>
                <item.icon className={`w-4.5 h-4.5 ${item.color}`} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">{item.label}</p>
                <p className="text-sm font-black tabular-nums">{item.amount.toLocaleString('en-US')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
