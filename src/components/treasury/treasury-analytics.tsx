"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, BarChart3, PieChart } from "lucide-react"

export function TreasuryAnalytics() {
  const [expandedSection, setExpandedSection] = useState<string | null>("trend")
  
  const weeklyData = [65, 45, 75, 50, 90, 60, 85]
  const labels = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]
  
  const max = Math.max(...weeklyData)

  const CollapsibleHeader = ({ title, subtitle, icon: Icon, id }: any) => (
    <div 
      onClick={() => setExpandedSection(expandedSection === id ? null : id)}
      className="flex items-center justify-between lg:cursor-default"
    >
      <div className="flex items-center gap-3">
        <div className="lg:hidden p-2 bg-primary/10 rounded-lg text-primary">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold lg:font-semibold">{title}</h3>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="lg:hidden">
        {expandedSection === id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
    </div>
  )
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Cashflow Trend Chart */}
      <Card className="p-4 lg:p-5">
        <CollapsibleHeader 
          title="تطور التدفق النقدي" 
          subtitle="آخر 7 أيام عمل" 
          icon={BarChart3}
          id="trend"
        />
        
        <AnimatePresence>
          {expandedSection === "trend" && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:!h-auto lg:!opacity-100 overflow-hidden"
            >
              <div className="mt-6 h-[180px] w-full flex items-end justify-between gap-2 px-1">
                {weeklyData.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="relative w-full flex justify-center">
                      <motion.div 
                        initial={{ height: 0 }}
                        animate={{ height: `${(val / max) * 140}px` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="w-full max-w-[32px] bg-primary/20 hover:bg-primary/40 rounded-t-lg transition-colors relative"
                      >
                        <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-full" />
                      </motion.div>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-medium">{labels[i]}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      
      {/* Payment Methods Distribution */}
      <Card className="p-4 lg:p-5 flex flex-col">
        <CollapsibleHeader 
          title="توزيع طرق الدفع" 
          subtitle="توزيع السيولة حسب المصدر" 
          icon={PieChart}
          id="distribution"
        />
        
        <AnimatePresence>
          {expandedSection === "distribution" && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:!h-auto lg:!opacity-100 overflow-hidden"
            >
              <div className="mt-8 flex items-center justify-around gap-4 pb-2">
                <div className="relative w-28 h-28 lg:w-32 lg:h-32 shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-muted" strokeWidth="3.5" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-primary" strokeWidth="3.5" strokeDasharray="45 100" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-accent" strokeWidth="3.5" strokeDasharray="35 100" strokeDashoffset="-45" strokeLinecap="round" />
                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-success" strokeWidth="3.5" strokeDasharray="20 100" strokeDashoffset="-80" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-base lg:text-lg font-bold">100%</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                    <span className="text-[11px] font-medium">نقدي 45%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                    <span className="text-[11px] font-medium">فيزا 35%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-success" />
                    <span className="text-[11px] font-medium">إنستا 20%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  )
}
