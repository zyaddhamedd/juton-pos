"use client"

import { useState } from "react"
import { useTreasury, PaymentMethod } from "@/store/use-treasury"
import { Drawer } from "@/components/shared/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  PlusCircle, 
  MinusCircle, 
  ArrowLeftRight, 
  Scale, 
  Wallet,
  AlertTriangle,
  CheckCircle2
} from "lucide-react"
import { useToast } from "@/store/use-toast"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DepositModal({ isOpen, onClose }: ModalProps) {
  const { addTransaction } = useTreasury()
  const { addToast } = useToast()
  const [amount, setAmount] = useState("")
  const [method, setMethod] = useState<PaymentMethod>("cash")
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return
    
    addTransaction({
      type: "deposit",
      amount: parseFloat(amount),
      method,
      user: "مدير النظام",
      description: notes || `إيداع يدوي - ${method}`
    })
    
    addToast(`تم إضافة إيداع بمبلغ ${amount} ج.م بنجاح`, "success")
    
    onClose()
    setAmount("")
    setNotes("")
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="إضافة إيداع جديد">
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">المبلغ</label>
          <Input 
            type="number" 
            placeholder="0.00" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="text-2xl h-14 font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">طريقة الدفع</label>
          <div className="grid grid-cols-3 gap-2">
            {(['cash', 'visa', 'instapay'] as const).map((m) => (
              <Button
                key={m}
                variant={method === m ? "default" : "outline"}
                onClick={() => setMethod(m)}
                className="capitalize"
              >
                {m === 'cash' ? 'كاش' : m === 'visa' ? 'فيزا' : 'إنستا'}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">ملاحظات</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full min-h-[100px] bg-muted/20 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="أضف ملاحظات اختيارية..."
          />
        </div>

        <Button onClick={handleSubmit} className="w-full h-12 text-lg font-bold" disabled={!amount}>
          تأكيد الإيداع
        </Button>
      </div>
    </Drawer>
  )
}

export function WithdrawalModal({ isOpen, onClose }: ModalProps) {
  const { addTransaction, balances } = useTreasury()
  const { addToast } = useToast()
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = () => {
    const val = parseFloat(amount)
    if (!amount || val <= 0 || !reason) return
    
    if (val > balances.cash) {
      addToast("لا يوجد رصيد كاش كافي لهذه العملية", "error")
      return
    }

    addTransaction({
      type: "withdrawal",
      amount: -val,
      method: "cash",
      user: "مدير النظام",
      description: `سحب نقدية: ${reason}`
    })

    addToast(`تم سحب مبلغ ${amount} ج.م من الخزنة بنجاح`, "success")

    onClose()
    setAmount("")
    setReason("")
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="سحب نقدية">
      <div className="space-y-6">
        {parseFloat(amount) > 5000 && (
          <Card className="p-4 bg-orange-500/10 border-orange-500/20 text-orange-500 flex gap-3 items-start">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div className="text-sm">
              <p className="font-bold">تحذير: مبلغ كبير</p>
              <p>أنت تحاول سحب مبلغ كبير، يرجى التأكد من الأسباب.</p>
            </div>
          </Card>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">المبلغ المسحوب</label>
          <Input 
            type="number" 
            placeholder="0.00" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="text-2xl h-14 font-bold text-danger"
          />
          <p className="text-xs text-muted-foreground">الرصيد المتاح: {balances.cash} ج.م</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">سبب السحب (إجباري)</label>
          <Input 
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="مثال: سلفة موظف، مصاريف نقل..."
          />
        </div>

        <Button 
          onClick={handleSubmit} 
          variant="destructive" 
          className="w-full h-12 text-lg font-bold"
          disabled={!amount || !reason}
        >
          تأكيد السحب
        </Button>
      </div>
    </Drawer>
  )
}

export function TransferModal({ isOpen, onClose }: ModalProps) {
  const { transferFunds, balances } = useTreasury()
  const { addToast } = useToast()
  const [amount, setAmount] = useState("")
  const [from, setFrom] = useState<PaymentMethod>("cash")
  const [to, setTo] = useState<PaymentMethod>("visa")

  const handleSubmit = () => {
    const val = parseFloat(amount)
    if (!amount || val <= 0 || from === to) return
    
    if (val > balances[from]) {
      addToast(`رصيد ${from} لا يكفي لإتمام التحويل`, "error")
      return
    }

    transferFunds(from, to, val, "مدير النظام")
    
    addToast(`تم تحويل ${amount} ج.م من ${from} إلى ${to} بنجاح`, "success")
    
    onClose()
    setAmount("")
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="تحويل رصيد داخلي">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground text-center block">من</label>
            <div className="grid grid-cols-1 gap-2">
              {(['cash', 'visa', 'instapay'] as const).map((m) => (
                <Button
                  key={m}
                  variant={from === m ? "default" : "outline"}
                  onClick={() => setFrom(m)}
                  className="h-12"
                  disabled={to === m}
                >
                  {m === 'cash' ? 'كاش' : m === 'visa' ? 'فيزا' : 'إنستا'}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground text-center block">إلى</label>
            <div className="grid grid-cols-1 gap-2">
              {(['cash', 'visa', 'instapay'] as const).map((m) => (
                <Button
                  key={m}
                  variant={to === m ? "default" : "outline"}
                  onClick={() => setTo(m)}
                  className="h-12"
                  disabled={from === m}
                >
                  {m === 'cash' ? 'كاش' : m === 'visa' ? 'فيزا' : 'إنستا'}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">المبلغ</label>
          <Input 
            type="number" 
            placeholder="0.00" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)}
            className="text-2xl h-14 font-bold text-blue-500"
          />
          <p className="text-xs text-muted-foreground">الرصيد المتاح في {from}: {balances[from]} ج.م</p>
        </div>

        <Button onClick={handleSubmit} className="w-full h-12 text-lg font-bold bg-blue-600 hover:bg-blue-700" disabled={!amount}>
          تأكيد التحويل
        </Button>
      </div>
    </Drawer>
  )
}

export function SettlementModal({ isOpen, onClose }: ModalProps) {
  const { closeShift, shifts, currentShiftId } = useTreasury()
  const { addToast } = useToast()
  const currentShift = shifts.find(s => s.id === currentShiftId)
  const [actual, setActual] = useState("")
  const [notes, setNotes] = useState("")

  const expected = currentShift?.expectedCash || 0
  const variance = parseFloat(actual) - expected || 0

  const handleSettle = () => {
    if (!actual) return
    closeShift(parseFloat(actual), notes)
    addToast("تمت التسوية وإغلاق الوردية بنجاح", "success")
    onClose()
  }

  return (
    <Drawer isOpen={isOpen} onClose={onClose} title="تسوية الخزنة وإغلاق الوردية">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">الكاش المتوقع (System)</p>
            <p className="text-xl font-bold">{expected} ج.م</p>
          </Card>
          <Card className="p-4 bg-muted/30">
            <p className="text-xs text-muted-foreground mb-1">الفارق (Variance)</p>
            <p className={`text-xl font-bold ${variance === 0 ? 'text-success' : variance > 0 ? 'text-blue-500' : 'text-danger'}`}>
              {variance > 0 ? '+' : ''}{variance} ج.م
            </p>
          </Card>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">الكاش الفعلي (الذي تم عده)</label>
          <Input 
            type="number" 
            placeholder="أدخل المبلغ الفعلي..." 
            value={actual} 
            onChange={(e) => setActual(e.target.value)}
            className="text-2xl h-14 font-bold"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">ملاحظات التسوية</label>
          <textarea 
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full min-h-[100px] bg-muted/20 border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="اكتب أي ملاحظات بخصوص الفوارق أو حالة الخزنة..."
          />
        </div>

        <Button onClick={handleSettle} className="w-full h-12 text-lg font-bold bg-purple-600 hover:bg-purple-700" disabled={!actual}>
          إتمام التسوية النهائية
        </Button>
      </div>
    </Drawer>
  )
}
