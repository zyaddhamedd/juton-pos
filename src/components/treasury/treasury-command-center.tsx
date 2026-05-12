"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShiftManagement } from "./shift-management"
import { QuickActions } from "./quick-actions"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  Settings2, 
  ChevronRight, 
  Wallet,
  LayoutDashboard
} from "lucide-react"

interface TreasuryCommandCenterProps {
  onClose: () => void
  onActionSelect?: (id: string) => void
}

export function TreasuryCommandCenter({ onClose, onActionSelect }: TreasuryCommandCenterProps) {
  const [activeTab, setActiveTab] = useState<"actions" | "shift">("actions")

  return (
    <div className="flex flex-col gap-6 p-1">
      {/* Tab Switcher - Premium Toggle */}
      <div className="flex p-1.5 bg-muted/50 backdrop-blur-md rounded-[2rem] border border-border/50 shadow-inner">
        <button
          onClick={() => setActiveTab("actions")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.8rem] transition-all duration-500 ${
            activeTab === "actions" 
              ? "bg-primary text-white shadow-xl shadow-primary/30 translate-y-[-2px]" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Activity className={`w-4 h-4 ${activeTab === "actions" ? "animate-pulse" : ""}`} />
          <span className="text-sm font-black">إجراءات الخزنة</span>
        </button>
        <button
          onClick={() => setActiveTab("shift")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-[1.8rem] transition-all duration-500 ${
            activeTab === "shift" 
              ? "bg-primary text-white shadow-xl shadow-primary/30 translate-y-[-2px]" 
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Settings2 className={`w-4 h-4 ${activeTab === "shift" ? "rotate-90" : ""}`} />
          <span className="text-sm font-black">إدارة الوردية</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: activeTab === "actions" ? -20 : 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: activeTab === "actions" ? 20 : -20, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="min-h-[400px]"
        >
          {activeTab === "actions" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2 text-primary">
                  <Wallet className="w-5 h-5" />
                  <h3 className="font-black text-lg">العمليات المالية السريعة</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black text-primary animate-pulse">
                  LIVE
                </div>
              </div>
              <QuickActions 
                variant="grid" 
                onActionClick={onClose} 
                onSelectAction={onActionSelect}
              />
            </div>
          ) : (
            <div className="space-y-6">
               <div className="flex items-center gap-2 text-primary px-2">
                  <LayoutDashboard className="w-5 h-5" />
                  <h3 className="font-black text-lg">التحكم في الوردية النشطة</h3>
                </div>
              <ShiftManagement variant="compact" />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Quick Footer Shortcut */}
      <div className="pt-4 mt-2 border-t border-border/50">
        <Button 
          variant="ghost" 
          className="w-full justify-between h-14 rounded-2xl bg-muted/30 group px-5"
          onClick={onClose}
        >
          <div className="flex items-center gap-3 text-muted-foreground group-hover:text-foreground transition-colors">
            <div className="w-8 h-8 rounded-full bg-background flex items-center justify-center border border-border group-hover:border-primary/30 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold">العودة لمركز التحكم الرئيسي</span>
          </div>
          <div className="text-[10px] font-black text-muted-foreground/50 tracking-widest uppercase">JOTUN FINANCE</div>
        </Button>
      </div>
    </div>
  )
}
