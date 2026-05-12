import { create } from "zustand"
import { persist } from "zustand/middleware"

export type TransactionType = 'sale' | 'expense' | 'refund' | 'deposit' | 'withdrawal' | 'adjustment' | 'transfer'
export type PaymentMethod = 'cash' | 'visa' | 'instapay'

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  method: PaymentMethod
  toMethod?: PaymentMethod // For transfers
  timestamp: Date
  user: string
  description: string
  shiftId: string
}

export interface Shift {
  id: string
  status: 'open' | 'closed'
  openedAt: Date
  closedAt?: Date
  openedBy: string
  closedBy?: string
  expectedCash: number
  actualCash?: number
  variance?: number
  notes?: string
}

interface TreasuryState {
  balances: {
    cash: number
    visa: number
    instapay: number
  }
  transactions: Transaction[]
  shifts: Shift[]
  currentShiftId: string | null

  // Actions
  addTransaction: (tx: Omit<Transaction, 'id' | 'timestamp' | 'shiftId'>) => void
  openShift: (user: string) => void
  closeShift: (actualCash: number, notes?: string) => void
  transferFunds: (from: PaymentMethod, to: PaymentMethod, amount: number, user: string) => void
}

export const useTreasury = create<TreasuryState>()(
  persist(
    (set, get) => ({
      balances: {
        cash: 45200.00,
        visa: 62800.25,
        instapay: 20450.50,
      },
      transactions: [
        {
          id: "1",
          type: "sale",
          amount: 1250.00,
          method: "cash",
          timestamp: new Date(Date.now() - 1000 * 60 * 15),
          user: "أحمد علي",
          description: "بيع دهانات فينوماستيك - فاتورة #1284",
          shiftId: "SH-402"
        },
        {
          id: "2",
          type: "expense",
          amount: -450.00,
          method: "cash",
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          user: "محمد كمال",
          description: "شراء أدوات نظافة ومستلزمات مكتبية",
          shiftId: "SH-402"
        }
      ],
      shifts: [
        {
          id: "SH-402",
          status: 'open',
          openedAt: new Date(new Date().setHours(8, 0, 0)),
          openedBy: "أحمد علي",
          expectedCash: 45200.00
        }
      ],
      currentShiftId: "SH-402",

      addTransaction: (txData) => {
        const { currentShiftId, balances } = get()
        if (!currentShiftId) return

        const newTx: Transaction = {
          ...txData,
          id: Math.random().toString(36).substring(7),
          timestamp: new Date(),
          shiftId: currentShiftId
        }

        const newBalances = { ...balances }
        if (txData.type === 'transfer' && txData.toMethod) {
          newBalances[txData.method] -= txData.amount
          newBalances[txData.toMethod] += txData.amount
        } else {
          newBalances[txData.method] += txData.amount
        }

        set((state) => ({
          transactions: [newTx, ...state.transactions],
          balances: newBalances
        }))
      },

      openShift: (user) => {
        const { balances } = get()
        const newShift: Shift = {
          id: `SH-${Math.floor(Math.random() * 900) + 100}`,
          status: 'open',
          openedAt: new Date(),
          openedBy: user,
          expectedCash: balances.cash
        }

        set((state) => ({
          shifts: [newShift, ...state.shifts],
          currentShiftId: newShift.id
        }))
      },

      closeShift: (actualCash, notes) => {
        const { currentShiftId, shifts, balances } = get()
        if (!currentShiftId) return

        const updatedShifts = shifts.map(s => {
          if (s.id === currentShiftId) {
            return {
              ...s,
              status: 'closed' as const,
              closedAt: new Date(),
              actualCash,
              variance: actualCash - s.expectedCash,
              notes
            }
          }
          return s
        })

        set({
          shifts: updatedShifts,
          currentShiftId: null
        })
      },

      transferFunds: (from, to, amount, user) => {
        get().addTransaction({
          type: 'transfer',
          amount,
          method: from,
          toMethod: to,
          user,
          description: `تحويل من ${from} إلى ${to}`
        })
      }
    }),
    {
      name: "jotun-treasury-store",
    }
  )
)
