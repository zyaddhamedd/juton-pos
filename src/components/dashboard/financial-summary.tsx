"use client"

import { motion } from "framer-motion"
import { Wallet, Landmark, Smartphone, ArrowUpRight } from "lucide-react"
import { useTreasury } from "@/store/use-treasury"

export function FinancialSummary() {
  const { balances } = useTreasury()
  
  const total = balances.cash + balances.visa + balances.instapay

  const items = [
    { label: "كاش", amount: balances.cash, icon: Wallet, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { label: "فيزا", amount: balances.visa, icon: Landmark, color: "text-blue-400", bg: "bg-blue-500/20" },
    { label: "إنستا باي", amount: balances.instapay, icon: Smartphone, color: "text-purple-400", bg: "bg-purple-500/20" },
  ]

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      className="relative overflow-hidden h-[280px] rounded-[40px] shadow-2xl shadow-blue-900/40"
    >
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 bg-[#002B5B] bg-gradient-to-br from-[#003B7B] via-[#002B5B] to-[#001B3B]" />
      
      {/* Animated Mesh Gradients */}
      <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] bg-blue-500/20 blur-[100px] rounded-full animate-pulse" />
      <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] bg-purple-500/20 blur-[100px] rounded-full animate-pulse delay-700" />
      
      {/* Glass Overlay with Scan effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />
      <motion.div 
        animate={{ left: ["-100%", "200%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        className="absolute inset-y-0 w-20 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12" 
      />

      <div className="relative h-full p-8 flex flex-col justify-between text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
              <Landmark className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-200/60">المركز المالي</p>
              <p className="text-sm font-black">جوتن - فرع شبين الكوم</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-white/40 mb-1">الحالة</p>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-success/20 text-success rounded-full border border-success/30 text-[10px] font-bold">
              <span className="w-1 h-1 rounded-full bg-success animate-ping" />
              متصل
            </div>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-blue-200/60 mb-2 uppercase tracking-[3px]">إجمالي الرصيد المتاح</p>
          <div className="flex items-baseline gap-3">
            <h2 className="text-4xl lg:text-5xl font-black tabular-nums tracking-tight">
              {total.toLocaleString()}
            </h2>
            <span className="text-lg font-medium opacity-60">ج.م</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center border border-white/5`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[9px] font-bold text-white/40">{item.label}</p>
                <p className="text-xs font-black tabular-nums">{item.amount.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
