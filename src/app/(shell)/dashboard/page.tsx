"use client"

import { PageContainer } from "@/components/layout/page-container"
import { motion } from "framer-motion"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { InventoryAlerts } from "@/components/dashboard/inventory-alerts"
import { FinancialSummary } from "@/components/dashboard/financial-summary"
import { Button } from "@/components/ui/button"
import { Bell, Search, User } from "lucide-react"

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

export default function DashboardPage() {
  return (
    <PageContainer className="relative pb-10 overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-primary/5 to-transparent pointer-events-none -z-10" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-purple-400/5 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse" />
      
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {/* 1. Enhanced Header Section - More Compact */}
        <motion.div variants={item} className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-blue-400 rounded-xl blur opacity-20" />
              <div className="relative w-10 h-10 rounded-xl bg-card flex items-center justify-center border border-border/50 shadow-inner overflow-hidden">
                <User className="w-5 h-5 text-primary" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-success border-2 border-background rounded-full" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight text-foreground">
                صباح الخير عبدالرحمن الخواجه 👋
              </h1>
              <p className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                النظام يعمل بكفاءة • فرع شبين الكوم
              </p>
            </div>
          </div>
          <Button variant="outline" size="icon" className="w-10 h-10 rounded-xl border-border/40 bg-card/50 backdrop-blur-md shadow-sm">
            <Bell className="w-4 h-4 text-muted-foreground" />
          </Button>
        </motion.div>

        {/* 2. Key Metrics Strip */}
        <motion.div variants={item}>
          <DashboardStats />
        </motion.div>

        {/* 3. Main Bento Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Financial Health - Left Column (lg: 7/12) */}
          <motion.div variants={item} className="lg:col-span-7">
            <FinancialSummary />
          </motion.div>

          {/* Quick Actions - Right Column (lg: 5/12) */}
          <motion.div variants={item} className="lg:col-span-5 grid grid-cols-1 gap-6">
            <div className="bg-card border border-border/50 rounded-[32px] p-6 shadow-sm flex flex-col justify-between">
              <div className="mb-6">
                <h3 className="font-bold mb-1">العمليات السريعة</h3>
                <p className="text-xs text-muted-foreground">اختصارات المهام اليومية المتكررة</p>
              </div>
              <QuickActions />
            </div>
          </motion.div>
        </div>

        {/* 4. Secondary Row: Alerts & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Inventory Alerts (Full width on mobile, 1/3 on desktop) */}
          <motion.div variants={item} className="lg:col-span-1">
            <InventoryAlerts />
          </motion.div>

          {/* Performance Insight Card */}
          <motion.div variants={item} className="lg:col-span-2">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-[32px] p-8 h-full flex flex-col justify-center">
              <div className="max-w-md">
                <h2 className="text-2xl font-black text-primary mb-3">رؤية الأداء اليومي 🚀</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  معدل مبيعاتك اليوم أعلى بنسبة <span className="font-bold text-foreground">١٢.٥٪</span> مقارنة بمتوسط الأسبوع الماضي. 
                  ننصحك بمراجعة نواقص المخزون في قسم الدهانات لضمان استمرارية الزخم.
                </p>
                <div className="flex gap-3">
                  <Button variant="primary" className="rounded-2xl px-6">تحليل كامل</Button>
                  <Button variant="outline" className="rounded-2xl px-6 bg-transparent">تجاهل</Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </motion.div>
    </PageContainer>
  )
}
