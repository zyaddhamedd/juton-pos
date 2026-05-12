"use client"

import * as React from "react"
import { 
  User, 
  Search, 
  Plus, 
  UserPlus, 
  Phone, 
  CreditCard, 
  Check, 
  X, 
  ChevronLeft,
  Loader2
} from "lucide-react"
import { useCart } from "@/store/use-cart"
import { CUSTOMERS, Customer } from "@/lib/mock-data"
import { Drawer } from "@/components/shared/drawer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function CustomerSelector() {
  const { customer, setCustomer } = useCart()
  const [isOpen, setIsOpen] = React.useState(false)
  const [isAdding, setIsAdding] = React.useState(false)
  const [search, setSearch] = React.useState("")
  
  // Rapid creation state
  const [newName, setNewName] = React.useState("")
  const [newPhone, setNewPhone] = React.useState("")
  const [isSaving, setIsSaving] = React.useState(false)

  const filteredCustomers = CUSTOMERS.filter(c => 
    c.name.includes(search) || c.phone.includes(search)
  )

  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newPhone) return
    
    setIsSaving(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 600))
    
    const newC = {
      id: Math.random().toString(),
      name: newName,
      phone: newPhone,
      debt: 0
    }
    
    setCustomer(newC)
    setIsSaving(false)
    setIsAdding(false)
    setIsOpen(false)
    setNewName("")
    setNewPhone("")
  }

  return (
    <>
      {/* Dense Operational Trigger */}
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-3 py-2 bg-secondary/20 rounded-xl border border-border/50 hover:border-accent/40 transition-all group"
      >
        <div className="flex items-center gap-2.5">
          <div className={cn(
            "h-7 w-7 rounded-lg flex items-center justify-center transition-all",
            customer ? "bg-accent text-accent-foreground shadow-lg shadow-accent/20" : "bg-card border border-border text-muted-foreground"
          )}>
            <User className="h-3.5 w-3.5" />
          </div>
          <div className="text-right">
            {customer ? (
              <div className="flex items-center gap-2">
                <p className="text-[11px] font-black tracking-tight">{customer.name}</p>
                {customer.debt > 0 && (
                  <div className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
                )}
              </div>
            ) : (
              <p className="text-[11px] font-black text-muted-foreground uppercase tracking-widest">اختيار العميل</p>
            )}
          </div>
        </div>
        <Plus className="h-3 w-3 text-muted-foreground group-hover:text-accent transition-colors" />
      </button>

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false)
          setIsAdding(false)
        }}
        title="العملاء"
        className="max-w-md"
      >
        <div className="flex flex-col h-full gap-4 -mt-2">
          {/* Lightweight Search */}
          <div className="relative group px-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
            <input 
              placeholder="البحث بالاسم أو الهاتف..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 bg-secondary/40 border border-border/50 rounded-xl pr-10 pl-4 text-xs font-bold outline-none focus:ring-4 focus:ring-accent/5 focus:border-accent/30 transition-all"
            />
          </div>

          {/* Rapid Actions Row */}
          <div className="grid grid-cols-2 gap-2 px-1">
            <button 
              onClick={() => { setCustomer(null); setIsOpen(false); }}
              className={cn(
                "flex items-center justify-center gap-2 h-10 rounded-xl border transition-all text-[10px] font-black uppercase tracking-wider",
                !customer 
                  ? "bg-accent text-accent-foreground border-accent shadow-lg shadow-accent/10" 
                  : "bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50"
              )}
            >
              <CreditCard className="h-3.5 w-3.5" />
              عميل نقدي
            </button>
            <button 
              onClick={() => setIsAdding(!isAdding)}
              className={cn(
                "flex items-center justify-center gap-2 h-10 rounded-xl border transition-all text-[10px] font-black uppercase tracking-wider",
                isAdding 
                  ? "bg-primary text-white border-primary" 
                  : "bg-secondary/30 border-border/50 text-muted-foreground hover:bg-secondary/50"
              )}
            >
              {isAdding ? <X className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
              {isAdding ? "إلغاء" : "إضافة عميل"}
            </button>
          </div>

          {/* Inline Rapid Creation Form */}
          <AnimatePresence>
            {isAdding && (
              <motion.form 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                onSubmit={handleQuickAdd}
                className="overflow-hidden px-1"
              >
                <div className="p-3 bg-accent/5 border border-accent/20 rounded-xl space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <input 
                      autoFocus
                      placeholder="اسم العميل"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="h-10 bg-card border border-border/50 rounded-lg px-3 text-xs font-bold outline-none focus:border-accent"
                    />
                    <input 
                      placeholder="رقم الهاتف"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="h-10 bg-card border border-border/50 rounded-lg px-3 text-xs font-bold outline-none focus:border-accent"
                    />
                  </div>
                  <button 
                    disabled={isSaving || !newName || !newPhone}
                    className="w-full h-10 bg-accent text-accent-foreground rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-accent/20 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                    حفظ واختيار العميل
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Scannable Operational List */}
          <div className="flex-1 overflow-y-auto px-1 space-y-1 no-scrollbar">
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-2 px-1">قائمة العملاء</p>
            
            {filteredCustomers.map((c) => {
              const isSelected = customer?.id === c.id
              return (
                <button 
                  key={c.id}
                  onClick={() => { setCustomer(c); setIsOpen(false); }}
                  className={cn(
                    "w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-right group",
                    isSelected 
                      ? "bg-accent/10 border-accent/30" 
                      : "bg-transparent border-transparent hover:bg-secondary/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "h-9 w-9 rounded-lg flex items-center justify-center transition-colors",
                      isSelected ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground group-hover:bg-accent group-hover:text-accent-foreground"
                    )}>
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className={cn(
                        "text-xs font-black tracking-tight transition-colors",
                        isSelected ? "text-accent" : "text-foreground"
                      )}>{c.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Phone className="h-2.5 w-2.5 text-muted-foreground" />
                        <p className="text-[10px] text-muted-foreground font-medium">{c.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {c.debt > 0 && (
                      <div className="flex flex-col items-end">
                        <span className="text-[7px] font-black text-danger/50 uppercase tracking-tighter">مديونية</span>
                        <span className="text-[10px] font-black text-danger leading-none">{c.debt} ج.م</span>
                      </div>
                    )}
                    {isSelected ? (
                      <div className="h-6 w-6 bg-accent rounded-full flex items-center justify-center text-accent-foreground">
                        <Check className="h-3 w-3" />
                      </div>
                    ) : (
                      <ChevronLeft className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </Drawer>
    </>
  )
}
