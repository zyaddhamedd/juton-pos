"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  PlusCircle, 
  MinusCircle, 
  ArrowLeftRight, 
  FileText, 
  Scale,
  Download
} from "lucide-react"
import { 
  DepositModal, 
  WithdrawalModal, 
  TransferModal, 
  SettlementModal 
} from "./treasury-modals"

import { BottomSheet } from "@/components/shared/bottom-sheet"

export function QuickActions({ 
  variant = "default", 
  onActionClick, 
  onSelectAction 
}: { 
  variant?: "default" | "compact" | "grid", 
  onActionClick?: () => void,
  onSelectAction?: (id: string) => void
}) {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [isActionsSheetOpen, setIsActionsSheetOpen] = useState(false)

  const actions = [
    { id: 'deposit', label: "إضافة إيداع", icon: PlusCircle, color: "text-success", bg: "bg-success/10", hover: "hover:bg-success/20", description: "إضافة رصيد للخزنة" },
    { id: 'withdraw', label: "سحب نقدية", icon: MinusCircle, color: "text-danger", bg: "bg-danger/10", hover: "hover:bg-danger/20", description: "صرف مبالغ أو مصاريف" },
    { id: 'transfer', label: "تحويل أموال", icon: ArrowLeftRight, color: "text-blue-500", bg: "bg-blue-500/10", hover: "hover:bg-blue-500/20", description: "بين الخزينة والبنك" },
    { id: 'settle', label: "تسوية الخزنة", icon: Scale, color: "text-purple-500", bg: "bg-purple-500/10", hover: "hover:bg-purple-500/20", description: "مطابقة الرصيد الفعلي" },
    { id: 'report', label: "تقرير مالي", icon: FileText, color: "text-accent", bg: "bg-accent/10", hover: "hover:bg-accent/20", description: "كشف حركة الخزنة" },
    { id: 'export', label: "تصدير البيانات", icon: Download, color: "text-slate-400", bg: "bg-slate-400/10", hover: "hover:bg-slate-400/20", description: "Excel / PDF" },
  ]

  const ActionGrid = ({ isMobile = false }) => (
    <div className={`grid ${variant === 'grid' ? 'grid-cols-2 gap-4' : isMobile ? 'grid-cols-2' : 'grid-cols-2 lg:grid-cols-1'} gap-3`}>
      {actions.map((action, i) => (
        <Button 
          key={i} 
          variant="ghost" 
          onClick={() => {
            if (onSelectAction) {
              onSelectAction(action.id)
            } else {
              setActiveModal(action.id)
            }
            if (isMobile) setIsActionsSheetOpen(false)
            onActionClick?.()
          }}
          className={`w-full justify-start gap-4 ${variant === 'grid' ? 'h-auto py-5 flex-col items-center text-center' : 'h-16 lg:h-12'} rounded-3xl lg:rounded-xl transition-all duration-300 border border-border/40 lg:border-transparent bg-card/40 hover:bg-card/80 hover:scale-[1.02] active:scale-[0.98] group`}
        >
          <div className={`p-3 rounded-2xl ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
            <action.icon className={`${variant === 'grid' ? 'w-8 h-8' : 'w-5 h-5 lg:w-4 lg:h-4'}`} />
          </div>
          <div className={`flex flex-col items-start ${variant === 'grid' ? 'items-center gap-1' : ''}`}>
            <span className="text-sm font-black lg:font-medium">{action.label}</span>
            {variant === 'grid' && <span className="text-[10px] text-muted-foreground font-medium">{action.description}</span>}
          </div>
        </Button>
      ))}
    </div>
  )

  return (
    <>
      {/* Desktop View */}
      <Card className="hidden lg:block p-4 bg-card/50 backdrop-blur-md border-primary/10">
        <h3 className="text-sm font-semibold mb-4 px-2">إجراءات سريعة</h3>
        <ActionGrid />
      </Card>

      {/* Mobile View Toggle */}
      {variant === "default" && (
        <div className="lg:hidden flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-lg font-black tracking-tight">إجراءات الخزنة</h3>
            <Button variant="ghost" onClick={() => setIsActionsSheetOpen(true)} className="text-primary font-bold underline">عرض الكل</Button>
          </div>
          <ActionGrid isMobile />
        </div>
      )}

      {variant === "grid" && <ActionGrid isMobile />}

      {/* Mobile Actions Bottom Sheet */}
      <BottomSheet 
        isOpen={isActionsSheetOpen} 
        onClose={() => setIsActionsSheetOpen(false)}
        title="إجراءات مالية سريعة"
      >
        <ActionGrid isMobile />
      </BottomSheet>

      {/* Render modals only if not using external onSelectAction */}
      {!onSelectAction && (
        <>
          <DepositModal isOpen={activeModal === 'deposit'} onClose={() => setActiveModal(null)} />
          <WithdrawalModal isOpen={activeModal === 'withdraw'} onClose={() => setActiveModal(null)} />
          <TransferModal isOpen={activeModal === 'transfer'} onClose={() => setActiveModal(null)} />
          <SettlementModal isOpen={activeModal === 'settle'} onClose={() => setActiveModal(null)} />
        </>
      )}
    </>
  )
}
