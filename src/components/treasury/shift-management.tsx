"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Currency } from "@/components/ui/currency"
import { Badge } from "@/components/ui/badge"
import { 
  PlayCircle, 
  StopCircle, 
  AlertCircle, 
  CheckCircle2, 
  MessageSquare,
  Lock,
  Banknote
} from "lucide-react"

import { useTreasury } from "@/store/use-treasury"

export function ShiftManagement({ variant = "default" }: { variant?: "default" | "compact" }) {
  const { shifts, currentShiftId, closeShift, openShift } = useTreasury()
  const currentShift = shifts.find(s => s.id === currentShiftId)
  
  const [actualCash, setActualCash] = useState<string>("")
  
  const expectedCash = currentShift?.expectedCash || 0
  const actualCashNum = parseFloat(actualCash) || 0
  const variance = actualCashNum - expectedCash
  
  const handleCloseShift = () => {
    if (!actualCash) return
    closeShift(actualCashNum, "إغلاق وردية يدوي")
    setActualCash("")
  }

  const handleOpenShift = () => {
    openShift("مدير النظام")
  }

  const isCompact = variant === "compact"

  return (
    <div className={`flex flex-col h-full ${!isCompact ? 'bg-card/30 rounded-3xl border border-border/50 overflow-hidden' : ''}`}>
      {!isCompact && (
        <div className="p-4 border-b border-border bg-card/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm">إحصائيات الوردية</h3>
            <Badge className={currentShift ? 'bg-success/20 text-success border-success/30' : 'bg-muted text-muted-foreground'}>
              {currentShift ? 'نشطة' : 'مغلقة'}
            </Badge>
          </div>
          {currentShift && <span className="text-[10px] font-black text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">#{currentShift.id}</span>}
        </div>
      )}
      
      <div className={`${isCompact ? 'p-0' : 'p-5'} space-y-6 flex-1`}>
        {currentShift ? (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider px-1">النقدية المتوقعة</label>
                <div className="text-lg font-black p-4 bg-muted/40 rounded-2xl border border-border/50 shadow-inner">
                  <Currency amount={expectedCash} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider px-1">النقدية الفعلية</label>
                <div className="relative group">
                  <Input 
                    type="number" 
                    placeholder="0.00"
                    value={actualCash}
                    onChange={(e) => setActualCash(e.target.value)}
                    className="text-lg font-black h-[60px] rounded-2xl pl-12 bg-card/60 border-primary/20 focus:border-primary transition-all shadow-sm"
                  />
                  <Banknote className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                </div>
              </div>
            </div>
            
            {actualCash && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-2xl border-2 flex items-center justify-between ${
                  variance === 0 ? 'bg-success/10 border-success/30 text-success' : 
                  variance > 0 ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 
                  'bg-danger/10 border-danger/30 text-danger'
                }`}
              >
                <div className="flex items-center gap-3 text-sm font-black">
                  <div className={`p-1.5 rounded-lg ${variance === 0 ? 'bg-success/20' : variance > 0 ? 'bg-blue-500/20' : 'bg-danger/20'}`}>
                    {variance === 0 ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  </div>
                  <span>{variance === 0 ? 'مطابق تماماً' : variance > 0 ? 'يوجد فائض' : 'يوجد عجز'}</span>
                </div>
                <div className="font-black text-lg">
                  <Currency amount={variance} />
                </div>
              </motion.div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] text-muted-foreground font-black uppercase tracking-wider px-1 flex items-center gap-1">
                <MessageSquare className="w-3 h-3 text-primary" /> ملاحظات الإغلاق
              </label>
              <textarea 
                className="w-full min-h-[100px] rounded-2xl bg-muted/30 border border-border p-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="أضف أي ملاحظات بخصوص الوردية..."
              />
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-12 px-8 text-center space-y-5">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
              <div className="relative w-20 h-20 rounded-3xl bg-muted flex items-center justify-center border border-border shadow-xl">
                <Lock className="w-10 h-10 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-black text-xl">الوردية مغلقة حالياً</h4>
              <p className="text-sm text-muted-foreground font-medium leading-relaxed">يرجى فتح وردية جديدة للبدء في تسجيل الحركات المالية وإدارة مبيعات اليوم</p>
            </div>
          </div>
        )}
      </div>
      
      <div className={`${isCompact ? 'pt-6 mt-4' : 'p-5'} border-t border-border bg-muted/10 flex gap-3`}>
        {currentShift ? (
          <>
            <Button variant="outline" className="flex-1 rounded-2xl h-14 border-danger/30 text-danger font-black hover:bg-danger/5 transition-all">
              <Lock className="w-4 h-4 mr-2" /> تجميد
            </Button>
            <Button 
              onClick={handleCloseShift}
              className="flex-[2] rounded-2xl h-14 bg-danger hover:bg-danger/90 text-white shadow-xl shadow-danger/30 font-black text-lg transition-all active:scale-95"
            >
              <StopCircle className="w-5 h-5 mr-2" /> إغلاق الوردية
            </Button>
          </>
        ) : (
          <Button 
            onClick={handleOpenShift}
            className="w-full rounded-2xl h-14 bg-success hover:bg-success/90 text-white shadow-xl shadow-success/30 font-black text-lg transition-all active:scale-95"
          >
            <PlayCircle className="w-5 h-5 mr-2" /> فتح وردية جديدة
          </Button>
        )}
      </div>
    </div>
  )
}
