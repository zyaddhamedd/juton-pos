"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useNavigation } from "@/store/use-navigation"
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Receipt, 
  Wallet, 
  Users, 
  ArrowLeftRight,
  ChevronRight,
  ChevronLeft,
  Settings
} from "lucide-react"
import { motion } from "framer-motion"

const navigation = [
  { name: "لوحة التحكم", href: "/dashboard", icon: LayoutDashboard },
  { name: "الكاشير", href: "/cashier", icon: ShoppingCart },
  { name: "المخزن", href: "/inventory", icon: Package },
  { name: "الفواتير", href: "/invoices", icon: Receipt },
  { name: "المصروفات", href: "/expenses", icon: ArrowLeftRight },
  { name: "الخزينة", href: "/treasury", icon: Wallet },
  { name: "العملاء", href: "/customers", icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()
  const { isSidebarCollapsed, toggleSidebar } = useNavigation()

  return (
    <motion.aside
      initial={false}
      animate={{ width: isSidebarCollapsed ? 80 : 280 }}
      className={cn(
        "fixed inset-y-0 right-0 z-40 hidden flex-col bg-card border-l border-border transition-all lg:flex",
        isSidebarCollapsed ? "w-20" : "w-[280px]"
      )}
    >
      <div className="flex h-20 items-center justify-between px-6">
        {!isSidebarCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold tracking-tight text-foreground flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-foreground text-xs font-black shadow-lg shadow-accent/20">J</div>
            JOTUN <span className="text-accent">POS</span>
          </motion.span>
        )}
        {isSidebarCollapsed && (
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-accent-foreground text-xs font-black mx-auto shadow-lg shadow-accent/20">J</div>
        )}
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" 
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                isSidebarCollapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5 flex-shrink-0 transition-colors",
                isActive ? "text-accent-foreground" : "text-muted-foreground group-hover:text-foreground",
                !isSidebarCollapsed && "ml-3"
              )} />
              {!isSidebarCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {item.name}
                </motion.span>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3 space-y-1">
        <button
          onClick={toggleSidebar}
          className={cn(
            "flex w-full items-center rounded-xl px-3 py-3 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all",
            isSidebarCollapsed && "justify-center px-0"
          )}
        >
          {isSidebarCollapsed ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <>
              <ChevronRight className="ml-3 h-5 w-5" />
              <span>طي القائمة</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  )
}
