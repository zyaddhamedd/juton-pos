"use client"

import * as React from "react"
import { Save, CheckCircle2, History, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CountActionFooterProps {
  onSaveDraft: () => void
  onFinalize: () => void
  summary: {
    shortages: number
    increases: number
    matches: number
  }
}

export function CountActionFooter({ onSaveDraft, onFinalize, summary }: CountActionFooterProps) {
  return (
    <footer className="fixed bottom-0 inset-x-0 z-50 bg-card/80 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.4)]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4 lg:py-6 flex flex-col lg:flex-row items-center justify-between gap-6">
        
        {/* Real-time Summary Cards */}
        <div className="flex items-center gap-2 lg:gap-4 overflow-x-auto no-scrollbar w-full lg:w-auto">
           <div className="flex items-center gap-2 bg-secondary/30 border border-border/40 px-3 py-1.5 rounded-xl shrink-0">
              <div className="h-6 w-6 rounded-lg bg-success/10 flex items-center justify-center text-success">
                 <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
              <div>
                 <p className="text-[8px] font-black text-muted-foreground uppercase leading-none mb-0.5">مطابق</p>
                 <p className="text-sm font-black text-foreground leading-none">{summary.matches}</p>
              </div>
           </div>

           <div className="flex items-center gap-2 bg-secondary/30 border border-border/40 px-3 py-1.5 rounded-xl shrink-0">
              <div className="h-6 w-6 rounded-lg bg-danger/10 flex items-center justify-center text-danger">
                 <AlertTriangle className="h-3.5 w-3.5" />
              </div>
              <div>
                 <p className="text-[8px] font-black text-muted-foreground uppercase leading-none mb-0.5">عجز</p>
                 <p className="text-sm font-black text-foreground leading-none">{summary.shortages}</p>
              </div>
           </div>

           <div className="flex items-center gap-2 bg-secondary/30 border border-border/40 px-3 py-1.5 rounded-xl shrink-0">
              <div className="h-6 w-6 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                 <Save className="h-3.5 w-3.5" />
              </div>
              <div>
                 <p className="text-[8px] font-black text-muted-foreground uppercase leading-none mb-0.5">زيادة</p>
                 <p className="text-sm font-black text-foreground leading-none">{summary.increases}</p>
              </div>
           </div>
        </div>

        {/* Main Actions */}
        <div className="flex items-center gap-3 w-full lg:w-auto pb-[env(safe-area-inset-bottom)] lg:pb-0">
          <Button 
            variant="secondary" 
            className="hidden sm:flex h-12 lg:h-14 px-6 rounded-2xl font-black text-[10px] border-2 border-border/50"
            onClick={onSaveDraft}
          >
            <History className="h-4 w-4 ml-2" />
            متابعة لاحقاً
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 lg:flex-none h-12 lg:h-14 px-8 rounded-2xl font-black text-[10px] border-2 border-border/50"
            onClick={onSaveDraft}
          >
            <Save className="h-4 w-4 ml-2" />
            حفظ مسودة
          </Button>
          <Button 
            variant="primary" 
            className="flex-1 lg:flex-none h-12 lg:h-14 px-10 rounded-2xl font-black text-[10px] shadow-xl shadow-primary/20 border-2 border-primary-light/10"
            onClick={onFinalize}
          >
            <CheckCircle2 className="h-4 w-4 ml-2" />
            اعتماد النتائج
          </Button>
        </div>
      </div>
    </footer>
  )
}
