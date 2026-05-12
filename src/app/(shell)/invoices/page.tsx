"use client"

import * as React from "react"
import { PageContainer } from "@/components/layout/page-container"
import { InvoiceListItem } from "@/components/invoices/invoice-list-item"
import { InvoiceSummaryWidgets } from "@/components/invoices/invoice-summary"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterGroup } from "@/components/shared/filter-group"
import { Button } from "@/components/ui/button"
import { FileText, Plus, Filter, Download, Calendar } from "lucide-react"
import { INVOICES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const INVOICE_FILTERS = [
  { id: "all", label: "الكل" },
  { id: "paid", label: "مدفوع" },
  { id: "partial", label: "جزئي" },
  { id: "credit", label: "أجل" },
  { id: "overdue", label: "متأخر" },
]

export default function InvoicesPage() {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("all")

  const filteredInvoices = INVOICES.filter(inv => {
    const matchesSearch = inv.customerName.includes(searchQuery) || inv.number.includes(searchQuery)
    const matchesFilter = activeFilter === "all" || inv.status === activeFilter
    return matchesSearch && matchesFilter
  })

  return (
    <PageContainer>
      <div className="space-y-6 lg:space-y-8 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-foreground tracking-tight">الفواتير والديون</h1>
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest opacity-40">Invoice & Credit Management</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="md" className="hidden sm:flex rounded-xl font-black text-[10px] h-10 px-4">
              <Calendar className="h-3.5 w-3.5 ml-2" />
              تاريخ محدد
            </Button>
            <Button variant="primary" size="md" className="h-10 px-5 rounded-xl font-black text-[10px] shadow-lg shadow-primary/20">
              <Plus className="h-4 w-4 ml-2" />
              فاتورة جديدة
            </Button>
          </div>
        </div>

        {/* Operational Summary */}
        <InvoiceSummaryWidgets />

        {/* Command Bar */}
        <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 space-y-3 border-b border-border/20 shadow-sm">
           <div className="flex flex-col lg:flex-row gap-3">
              <div className="flex-1">
                <SearchBar 
                  placeholder="ابحث برقم الفاتورة أو اسم العميل..." 
                  onSearch={setSearchQuery}
                />
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                 {INVOICE_FILTERS.map(f => (
                   <button
                     key={f.id}
                     onClick={() => setActiveFilter(f.id)}
                     className={cn(
                       "px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap transition-all border",
                       activeFilter === f.id
                         ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                         : "bg-secondary/10 text-muted-foreground border-border/20 hover:bg-secondary/30"
                     )}
                   >
                     {f.label}
                   </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Invoice List */}
        <div className="space-y-3 lg:space-y-4">
           <div className="flex items-center justify-between px-2">
              <h2 className="text-sm lg:text-lg font-black text-foreground tracking-tight">سجل العمليات</h2>
              <button className="flex items-center gap-1.5 text-[9px] font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity">
                <Download className="h-3 w-3" />
                تحميل التقرير
              </button>
           </div>

           <div className="grid grid-cols-1 gap-3">
              {filteredInvoices.map(invoice => (
                <InvoiceListItem key={invoice.id} invoice={invoice} />
              ))}
           </div>

           {filteredInvoices.length === 0 && (
             <div className="py-20 text-center space-y-4">
                <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto text-muted-foreground opacity-10">
                   <FileText className="h-10 w-10" />
                </div>
                <p className="text-sm font-black text-muted-foreground uppercase tracking-widest opacity-30">لا توجد فواتير مطابقة</p>
             </div>
           )}
        </div>
      </div>
    </PageContainer>
  )
}
