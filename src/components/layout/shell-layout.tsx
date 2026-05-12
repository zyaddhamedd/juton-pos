"use client"

import { Sidebar } from "./sidebar/sidebar"
import { BottomNav } from "./bottom-nav/bottom-nav"
import { MobileMenu } from "./bottom-nav/mobile-menu"
import { cn } from "@/lib/utils"
import { useNavigation } from "@/store/use-navigation"

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const { isSidebarCollapsed } = useNavigation()

  return (
    <div className="relative min-h-screen w-full bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div 
        className={cn(
          "min-h-screen transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "lg:pr-20" : "lg:pr-[280px]"
        )}
      >
        <main className="flex flex-col min-h-screen pb-24 lg:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav />
      <MobileMenu />
    </div>
  )
}
