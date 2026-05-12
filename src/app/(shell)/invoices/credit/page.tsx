"use client"

import * as React from "react"
import { PageContainer } from "@/components/layout/page-container"
import { InvoiceListItem } from "@/components/invoices/invoice-list-item"
import { SearchBar } from "@/components/shared/search-bar"
import { Button } from "@/components/ui/button"
import { Users, AlertTriangle, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight, User } from "lucide-react"
import { INVOICES, CUSTOMERS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

export default function CreditManagementPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const creditInvoices = INVOICES.filter(inv => 
    (inv.status === "credit" || inv.status === "partial" || inv.status === "overdue") &&
    (inv.customerName.includes(searchQuery) || inv.number.includes(searchQuery))
  )

  const totalDebt = creditInvoices.reduce((acc, curr) => acc + curr.remainingAmount, 0)
  const overdueDebt = creditInvoices.filter(i => i.status === "overdue").reduce((acc, curr) => acc + curr.remainingAmount, 0)

  return (
    <PageContainer>
      <div className="space-y-6 lg:space-y-10 pb-20">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-card border border-border/40 p-6 lg:p-10 rounded-[2.5rem] relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-danger/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
           
           <div className="space-y-4 relative z-10">
              <div>
                <h1 className="text-2xl lg:text-5xl font-black text-foreground tracking-tighter">إدارة الديون والآجل</h1>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em] mt-2 opacity-50">Credit & Debt Control Terminal</p>
              </div>

              <div className="flex flex-wrap gap-6 pt-4">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">إجمالي المديونيات</p>
                    <div className="flex items-center gap-2 text-3xl font-black text-danger tracking-tighter">
                       {totalDebt.toLocaleString('en-US')}
                       <span className="text-sm font-bold text-muted-foreground">ج.م</span>
                    </div>
                 </div>
                 <div className="w-px h-12 bg-border/20 hidden sm:block" />
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">متأخرات حرجة</p>
                    <div className="flex items-center gap-2 text-3xl font-black text-foreground tracking-tighter">
                       {overdueDebt.toLocaleString('en-US')}
                       <span className="text-sm font-bold text-muted-foreground">ج.م</span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-3 relative z-10">
              <Button variant="secondary" className="h-14 px-8 rounded-2xl font-black text-xs border-2">
                 تحميل تقرير الديون
              </Button>
              <Button variant="primary" className="h-14 px-10 rounded-2xl font-black text-xs shadow-xl shadow-primary/20">
                 تسوية مديونية
              </Button>
           </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
           {/* Left: Invoice List */}
           <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center justify-between gap-4">
                 <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-danger/10 flex items-center justify-center text-danger">
                       <AlertTriangle className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-black text-foreground tracking-tight">فواتير تحتاج تحصيل</h2>
                 </div>
                 <div className="flex-1 max-w-xs">
                    <SearchBar 
                      placeholder="بحث في الديون..." 
                      onSearch={setSearchQuery}
                      className="h-11"
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 {creditInvoices.map(invoice => (
                   <InvoiceListItem key={invoice.id} invoice={invoice} />
                 ))}
                 {creditInvoices.length === 0 && (
                   <div className="py-20 text-center bg-secondary/5 rounded-3xl border-2 border-dashed border-border/40">
                      <p className="text-sm font-black text-muted-foreground uppercase tracking-widest opacity-40">لا يوجد مديونيات حالية</p>
                   </div>
                 )}
              </div>
           </div>

           {/* Right: Top Debtors */}
           <div className="space-y-6">
              <div className="flex items-center gap-2 px-2">
                 <Users className="h-4 w-4 text-primary" />
                 <h2 className="text-lg font-black text-foreground tracking-tight">كبار المديونين</h2>
              </div>

              <div className="bg-card border border-border/40 rounded-3xl p-5 space-y-4">
                 {CUSTOMERS.filter(c => c.debt > 0).sort((a,b) => b.debt - a.debt).map(customer => (
                   <div key={customer.id} className="p-4 bg-secondary/10 rounded-2xl border border-border/20 group hover:border-primary/40 transition-all cursor-pointer">
                      <div className="flex items-start justify-between gap-3 mb-3">
                         <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-background flex items-center justify-center border border-border/40 text-muted-foreground group-hover:text-primary transition-colors">
                               <User className="h-5 w-5" />
                            </div>
                            <div>
                               <p className="text-sm font-black text-foreground truncate max-w-[120px]">{customer.name}</p>
                               <p className="text-[9px] font-bold text-muted-foreground">{customer.phone}</p>
                            </div>
                         </div>
                         <ArrowUpRight className="h-4 w-4 text-danger opacity-40 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="flex justify-between items-end">
                         <div>
                            <p className="text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40">إجمالي المديونية</p>
                            <p className="text-lg font-black text-danger tracking-tighter">{customer.debt.toLocaleString('en-US')} <span className="text-[10px] font-bold">ج.م</span></p>
                         </div>
                         <button className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline">تحصيل الآن</button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-6 bg-primary rounded-3xl text-white space-y-4 shadow-xl shadow-primary/20">
                 <div className="flex items-center gap-3">
                    <TrendingUp className="h-6 w-6" />
                    <h3 className="text-lg font-black">تحليل التحصيل</h3>
                 </div>
                 <p className="text-xs font-bold opacity-80 leading-relaxed">تم تحصيل 15,400 ج.م من الديون هذا الشهر. استمر في المتابعة لتحسين السيولة.</p>
                 <button className="w-full h-11 bg-white text-primary rounded-xl font-black text-xs hover:bg-white/90 transition-colors">
                    عرض المخطط البياني
                 </button>
              </div>
           </div>
        </div>
      </div>
    </PageContainer>
  )
}
