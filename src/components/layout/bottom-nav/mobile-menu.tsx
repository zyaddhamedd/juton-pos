"use client"

import { useNavigation } from "@/store/use-navigation"
import { BottomSheet } from "@/components/shared/bottom-sheet"
import { 
  User, 
  Settings, 
  LogOut, 
  HelpCircle, 
  Wallet, 
  Bell,
  PieChart,
  ShieldCheck
} from "lucide-react"
import { motion } from "framer-motion"

const menuItems = [
  { label: "الملف الشخصي", icon: User, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "الإعدادات العامة", icon: Settings, color: "text-slate-400", bg: "bg-slate-400/10" },
  { label: "مركز الخزنة", icon: Wallet, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "الإشعارات", icon: Bell, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "التقارير المتقدمة", icon: PieChart, color: "text-purple-500", bg: "bg-purple-500/10" },
  { label: "الأمان والخصوصية", icon: ShieldCheck, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  { label: "مركز المساعدة", icon: HelpCircle, color: "text-cyan-500", bg: "bg-cyan-500/10" },
  { label: "تسجيل الخروج", icon: LogOut, color: "text-danger", bg: "bg-danger/10" },
]

export function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useNavigation()

  return (
    <BottomSheet 
      isOpen={isMobileMenuOpen} 
      onClose={() => setMobileMenuOpen(false)}
      title="قائمة الخيارات"
    >
      <div className="grid grid-cols-2 gap-3 pb-8">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center justify-center p-5 rounded-[2rem] bg-card border border-border/50 shadow-sm hover:border-primary/30 transition-all gap-3 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className={`p-3 rounded-2xl ${item.bg} ${item.color} group-hover:scale-110 transition-transform duration-500 shadow-inner`}>
              <item.icon className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-black text-foreground/80 tracking-tight">{item.label}</span>
          </motion.button>
        ))}
      </div>

      <div className="p-4 bg-muted/20 border-t border-border/50 text-center -mx-6 mb-[-1.5rem]">
         <p className="text-[10px] font-black text-muted-foreground/40 tracking-[0.2em] uppercase">Juton POS v1.0.0</p>
      </div>
    </BottomSheet>
  )
}
