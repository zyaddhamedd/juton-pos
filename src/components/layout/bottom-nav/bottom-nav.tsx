"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Receipt, 
  Menu
} from "lucide-react"

const mobileNav = [
  { name: "الرئيسية", href: "/dashboard", icon: LayoutDashboard },
  { name: "الكاشير", href: "/cashier", icon: ShoppingCart },
  { name: "المخزن", href: "/inventory", icon: Package },
  { name: "الفواتير", href: "/invoices", icon: Receipt },
  { name: "المزيد", href: "#", icon: Menu },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav 
      className="fixed inset-x-0 bottom-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border px-4 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom,0.5rem))] lg:hidden"
      style={{ left: 0, right: 0 }}
    >
      <div className="flex items-center justify-between w-full">
        {mobileNav.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 transition-all duration-300 active:scale-90",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "p-2 rounded-2xl transition-all duration-300",
                isActive ? "bg-primary/10 shadow-[0_0_20px_rgba(0,61,165,0.1)]" : "group-hover:bg-secondary"
              )}>
                <item.icon className={cn(
                  "h-6 w-6 transition-all",
                  isActive && "scale-110"
                )} />
              </div>
              <span className={cn(
                "text-[9px] font-black uppercase tracking-tighter transition-all",
                isActive ? "opacity-100 translate-y-0" : "opacity-40"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
