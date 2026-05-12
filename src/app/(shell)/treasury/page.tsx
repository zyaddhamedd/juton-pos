"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { PageContainer } from "@/components/layout/page-container"
import { SectionHeader } from "@/components/layout/section-header"
import { TreasuryKPI } from "@/components/treasury/treasury-kpi"
import { CashflowTimeline } from "@/components/treasury/cashflow-timeline"
import { ShiftManagement } from "@/components/treasury/shift-management"
import { TreasuryAnalytics } from "@/components/treasury/treasury-analytics"
import { QuickActions } from "@/components/treasury/quick-actions"
import { Skeleton } from "@/components/ui/skeleton"
import { useTreasury } from "@/store/use-treasury"
import { BottomSheet } from "@/components/shared/bottom-sheet"
import { Button } from "@/components/ui/button"
import { TreasuryCommandCenter } from "@/components/treasury/treasury-command-center"
import { Command, LayoutDashboard } from "lucide-react"
import { 
  DepositModal, 
  WithdrawalModal, 
  TransferModal, 
  SettlementModal 
} from "@/components/treasury/treasury-modals"

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function TreasuryPage() {
  const [loading, setLoading] = useState(true)
  const [isShiftModalOpen, setIsShiftModalOpen] = useState(false)
  const [activeTreasuryModal, setActiveTreasuryModal] = useState<string | null>(null)
  const { balances, currentShiftId } = useTreasury()

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <PageContainer>
        <div className="space-y-6">
          <SectionHeader 
            title="الخزنة والرقابة المالية" 
            description="مركز التحكم المالي والتدفق النقدي وإدارة الورديات" 
          />
          {/* Desktop Skeletons */}
          <div className="hidden lg:grid grid-cols-5 gap-4">
            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-32 rounded-2xl" />)}
          </div>
          {/* Mobile Skeletons */}
          <div className="lg:hidden flex gap-3 overflow-hidden">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-24 shrink-0 rounded-full" />)}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            <div className="xl:col-span-8 space-y-6">
              <Skeleton className="h-[500px] rounded-2xl" />
              <div className="hidden lg:grid grid-cols-2 gap-4">
                <Skeleton className="h-[240px] rounded-2xl" />
                <Skeleton className="h-[240px] rounded-2xl" />
              </div>
            </div>
            <div className="xl:col-span-4 space-y-6">
              <Skeleton className="h-[400px] rounded-2xl" />
              <Skeleton className="h-[300px] rounded-2xl" />
            </div>
          </div>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer className="relative pb-32 lg:pb-10">
      {/* 1. Mobile Sticky Top Summary */}
      <div className="lg:hidden sticky top-[-24px] z-50 bg-background/95 backdrop-blur-xl -mx-4 px-4 py-4 border-b border-border/50 mb-4 shadow-sm overflow-x-auto no-scrollbar flex gap-3">
        <div className="px-4 py-2 bg-primary/10 rounded-2xl flex flex-col gap-0.5 shrink-0 border border-primary/20 min-w-[120px]">
          <span className="text-[10px] text-muted-foreground font-bold">إجمالي الرصيد</span>
          <span className="text-base font-black text-primary">{(balances.cash + balances.visa + balances.instapay).toLocaleString('en-US')}</span>
        </div>
        <div className="px-4 py-2 bg-success/10 rounded-2xl flex flex-col gap-0.5 shrink-0 border border-success/20 min-w-[100px]">
          <span className="text-[10px] text-muted-foreground font-bold">النقدية (كاش)</span>
          <span className="text-base font-black text-success">{balances.cash.toLocaleString('en-US')}</span>
        </div>
        <div className="px-4 py-2 bg-accent/10 rounded-2xl flex flex-col gap-0.5 shrink-0 border border-accent/20 min-w-[100px]">
          <span className="text-[10px] text-muted-foreground font-bold">فيزا / ديجيتال</span>
          <span className="text-base font-black text-accent">{balances.visa.toLocaleString('en-US')}</span>
        </div>
        <div className="px-4 py-2 bg-blue-500/10 rounded-2xl flex flex-col gap-0.5 shrink-0 border border-blue-500/20 min-w-[100px]">
          <span className="text-[10px] text-muted-foreground font-bold">إنستا باي</span>
          <span className="text-base font-black text-blue-500">{balances.instapay.toLocaleString('en-US')}</span>
        </div>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        <motion.div variants={item}>
          <SectionHeader 
            title="الخزنة والرقابة المالية" 
            description="مركز التحكم المالي والتدفق النقدي وإدارة الورديات" 
            className="hidden lg:flex"
          />
        </motion.div>

        {/* 1. Header Summary (KPI Cards) - Desktop Only */}
        <motion.div variants={item} className="hidden lg:block">
          <TreasuryKPI />
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Main Content Area (8/12) */}
          <div className="xl:col-span-8 space-y-6">
            {/* 2. Main Cashflow Timeline */}
            <motion.div variants={item} className="h-[450px] lg:h-[500px]">
              <CashflowTimeline />
            </motion.div>

            {/* 4. Treasury Analytics Section */}
            <motion.div variants={item}>
              <TreasuryAnalytics />
            </motion.div>
          </div>

          {/* Sidebar Area (4/12) */}
          <div className="xl:col-span-4 space-y-6">
            {/* 3. Shift Management Module - Desktop */}
            <motion.div variants={item} className="hidden lg:block">
              <ShiftManagement />
            </motion.div>

            {/* 5. Quick Actions Panel - Desktop Only (Hidden on mobile as it is in the command center) */}
            <motion.div variants={item} className="hidden lg:block">
              <QuickActions />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* 2. Floating Finance Hub Control (Command Center) - Mobile Only */}
      <div className="lg:hidden fixed bottom-[100px] right-6 z-[80] pointer-events-none">
        <motion.div 
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          whileTap={{ scale: 0.9 }}
          className="pointer-events-auto"
        >
          <button 
            onClick={() => setIsShiftModalOpen(true)}
            className="group relative flex items-center justify-center"
          >
            {/* Animated Rings */}
            <div className={`absolute inset-0 rounded-full animate-ping opacity-20 duration-1000 ${currentShiftId ? 'bg-success' : 'bg-primary'}`} />
            <div className={`absolute -inset-2 rounded-full animate-pulse opacity-10 ${currentShiftId ? 'bg-success' : 'bg-primary'}`} />
            
            {/* Main Button */}
            <div className={`
              w-16 h-16 rounded-[24px] flex flex-col items-center justify-center gap-0.5
              shadow-[0_15px_35px_rgba(0,0,0,0.3)] backdrop-blur-xl border border-white/20
              transition-all duration-300 group-hover:shadow-primary/40
              ${currentShiftId 
                ? 'bg-gradient-to-br from-success/90 to-success text-white' 
                : 'bg-gradient-to-br from-primary/90 to-primary text-white'}
            `}>
              <Command className="w-6 h-6" />
              <span className="text-[9px] font-black tracking-tighter uppercase">CMD</span>
            </div>

            {/* Status Indicator */}
            <div className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${currentShiftId ? 'bg-success-foreground' : 'bg-white'}`}></span>
              <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-primary ${currentShiftId ? 'bg-success' : 'bg-orange-500'}`}></span>
            </div>
          </button>
        </motion.div>
      </div>

      {/* Mobile Shift Bottom Sheet - Now as Command Center */}
      <BottomSheet 
        isOpen={isShiftModalOpen} 
        onClose={() => setIsShiftModalOpen(false)}
        title={currentShiftId ? "مركز العمليات المالية" : "بدء وردية جديدة"}
      >
        <TreasuryCommandCenter 
          onClose={() => setIsShiftModalOpen(false)} 
          onActionSelect={(id) => setActiveTreasuryModal(id)}
        />
      </BottomSheet>

      {/* Global Treasury Modals */}
      <DepositModal isOpen={activeTreasuryModal === 'deposit'} onClose={() => setActiveTreasuryModal(null)} />
      <WithdrawalModal isOpen={activeTreasuryModal === 'withdraw'} onClose={() => setActiveTreasuryModal(null)} />
      <TransferModal isOpen={activeTreasuryModal === 'transfer'} onClose={() => setActiveTreasuryModal(null)} />
      <SettlementModal isOpen={activeTreasuryModal === 'settle'} onClose={() => setActiveTreasuryModal(null)} />
    </PageContainer>
  )
}

