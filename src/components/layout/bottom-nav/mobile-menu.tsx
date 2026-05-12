"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Receipt, 
  Wallet, 
  Users, 
  ArrowLeftRight,
  Settings,
  LogOut,
  Bell
} from "lucide-react"
import { motion } from "framer-motion"

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard, color: "text-accent", bg: "bg-accent/10" },
  { name: "الكاشير", href: "/cashier", icon: ShoppingCart, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "المخزن", href: "/inventory", icon: Package, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "الفواتير", href: "/invoices", icon: Receipt, color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "المصروفات", href: "/expenses", icon: ArrowLeftRight, color: "text-rose-500", bg: "bg-rose-500/10" },
  { name: "الخزينة", href: "/treasury", icon: Wallet, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "العملاء", href: "/customers", icon: Users, color: "text-cyan-500", bg: "bg-cyan-500/10" },
]

export function MobileMenu() {
  const { isMobileMenuOpen, setMobileMenuOpen } = useNavigation()
  const pathname = usePathname()

  return (
    <BottomSheet 
      isOpen={isMobileMenuOpen} 
      onClose={() => setMobileMenuOpen(false)}
      title="قائمة النظام الكاملة"
    >
      <div className="grid grid-cols-2 gap-3 pb-8">
        {navigation.map((item, index) => {
          const isActive = pathname === item.href
          return (
            <Link 
              key={item.name} 
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "flex flex-col items-center justify-center p-5 rounded-[2rem] border transition-all gap-3 group",
                  isActive 
                    ? "bg-accent/20 border-accent/40 shadow-lg shadow-accent/10" 
                    : "bg-card border-border/50 shadow-sm hover:border-primary/30"
                )}
              >
                <div className={cn(
                  "p-3 rounded-2xl transition-transform duration-500 shadow-inner",
                  item.bg,
                  item.color,
                  "group-hover:scale-110"
                )}>
                  <item.icon className="w-6 h-6" />
                </div>
                <span className={cn(
                  "text-[11px] font-black tracking-tight",
                  isActive ? "text-accent" : "text-foreground/80"
                )}>
                  {item.name}
                </span>
              </motion.div>
            </Link>
          )
        })}

        {/* Action Items Footer in Grid */}
        <div className="col-span-2 grid grid-cols-2 gap-3 mt-2 border-t border-border/40 pt-5">
           <button className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-secondary/30 text-muted-foreground hover:text-foreground transition-all">
              <Settings className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">الإعدادات</span>
           </button>
           <button className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-danger/10 text-danger hover:bg-danger/20 transition-all">
              <LogOut className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">خروج</span>
           </button>
        </div>
      </div>

      <div className="p-4 bg-muted/20 border-t border-border/50 text-center -mx-6 mb-[-1.5rem]">
         <p className="text-[10px] font-black text-muted-foreground/40 tracking-[0.2em] uppercase">Juton POS Business Suite</p>
      </div>
    </BottomSheet>
  )
}
