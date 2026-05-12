"use client"

import * as React from "react"
import { PageContainer } from "@/components/layout/page-container"
import { Button } from "@/components/ui/button"
import { InvoiceStatusBadge } from "@/components/invoices/invoice-status-badge"
import { 
  Printer, 
  Share2, 
  Download, 
  ChevronRight, 
  CreditCard, 
  User, 
  Phone, 
  Calendar,
  Clock,
  History,
  AlertCircle
} from "lucide-react"
import { INVOICES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ar } from "date-fns/locale"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function InvoiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const invoice = INVOICES.find(inv => inv.id === params.id)

  if (!invoice) return <div>Invoice not found</div>

  const isOverdue = invoice.status === "overdue"
  const isPartial = invoice.status === "partial" || invoice.status === "credit"

  return (
    <PageContainer>
      <div className="space-y-6 lg:space-y-10 pb-32">
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
          >
            <div className="p-2 rounded-xl bg-secondary/50 group-hover:bg-primary/10 group-hover:text-primary transition-all">
              <ChevronRight className="h-5 w-5" />
            </div>
            <span className="text-sm font-black tracking-tight">العودة للسجل</span>
          </button>

          <div className="flex items-center gap-2">
             <Button variant="secondary" size="md" className="h-10 w-10 p-0 rounded-xl">
                <Share2 className="h-4 w-4" />
             </Button>
             <Button variant="secondary" size="md" className="h-10 w-10 p-0 rounded-xl">
                <Printer className="h-4 w-4" />
             </Button>
             <Button variant="primary" size="md" className="h-10 px-6 rounded-xl font-black text-[10px] shadow-lg shadow-primary/20">
                <Download className="h-4 w-4 ml-2" />
                تصدير PDF
             </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
          {/* Main Invoice Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Header Card */}
            <div className="bg-card border border-border/40 rounded-3xl p-6 lg:p-8 space-y-6 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
               
               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-3">
                     <div className="flex items-center gap-3">
                        <h1 className="text-2xl lg:text-4xl font-black text-foreground tracking-tighter">فاتورة {invoice.number}</h1>
                        <InvoiceStatusBadge status={invoice.status} className="h-6 px-3 text-[10px]" />
                     </div>
                     <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                           <Calendar className="h-3.5 w-3.5" />
                           {format(new Date(invoice.date), "dd MMMM yyyy", { locale: ar })}
                        </div>
                        <div className="flex items-center gap-1.5">
                           <Clock className="h-3.5 w-3.5" />
                           {format(new Date(invoice.date), "HH:mm a", { locale: ar })}
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4 bg-secondary/20 p-4 rounded-2xl border border-border/40">
                     <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <User className="h-6 w-6" />
                     </div>
                     <div>
                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">أصدرت بواسطة</p>
                        <p className="text-sm font-black text-foreground">{invoice.cashier}</p>
                     </div>
                  </div>
               </div>

               {/* Items Table */}
               <div className="pt-6 border-t border-border/20">
                  <div className="space-y-4">
                     <div className="hidden lg:grid grid-cols-6 gap-4 px-4 py-2 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">
                        <div className="col-span-3">المنتج</div>
                        <div className="text-center">الكمية</div>
                        <div className="text-center">السعر</div>
                        <div className="text-left">الإجمالي</div>
                     </div>
                     
                     <div className="space-y-2">
                        {invoice.items.map(item => (
                          <div key={item.id} className="grid grid-cols-1 lg:grid-cols-6 gap-2 lg:gap-4 p-4 bg-secondary/5 rounded-2xl border border-border/20 group hover:bg-secondary/10 transition-colors">
                             <div className="lg:col-span-3 font-black text-sm">{item.name}</div>
                             <div className="flex justify-between lg:justify-center items-center">
                                <span className="lg:hidden text-[10px] font-bold text-muted-foreground">الكمية:</span>
                                <span className="font-black text-sm opacity-60">x{item.quantity}</span>
                             </div>
                             <div className="flex justify-between lg:justify-center items-center">
                                <span className="lg:hidden text-[10px] font-bold text-muted-foreground">السعر:</span>
                                <span className="font-bold text-sm">{item.price.toLocaleString()} ج.م</span>
                             </div>
                             <div className="flex justify-between lg:justify-start items-center lg:text-left">
                                <span className="lg:hidden text-[10px] font-bold text-muted-foreground">الإجمالي:</span>
                                <span className="font-black text-sm text-primary">{item.total.toLocaleString()} ج.م</span>
                             </div>
                          </div>
                        ))}
                     </div>
                  </div>
               </div>

               {/* Totals Summary */}
               <div className="pt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-t border-border/20">
                  <div className="space-y-4 w-full lg:w-64">
                     <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
                        <span>المجموع الفرعي</span>
                        <span>{invoice.total.toLocaleString()} ج.م</span>
                     </div>
                     <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
                        <span>الخصم</span>
                        <span className="text-success">0 ج.م</span>
                     </div>
                     <div className="flex justify-between items-center text-lg lg:text-xl font-black text-foreground pt-4 border-t border-border/10">
                        <span>الإجمالي</span>
                        <span className="text-primary">{invoice.total.toLocaleString()} ج.م</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Payment History / Timeline */}
            <div className="space-y-4">
               <div className="flex items-center gap-2 px-2">
                  <History className="h-4 w-4 text-primary" />
                  <h2 className="text-sm lg:text-lg font-black text-foreground tracking-tight">سجل المدفوعات</h2>
               </div>
               
               <div className="bg-card border border-border/40 rounded-3xl p-6 lg:p-8 relative overflow-hidden">
                  <div className="space-y-6">
                     {invoice.payments.length > 0 ? (
                        invoice.payments.map((payment, idx) => (
                           <div key={payment.id} className="flex gap-4 relative">
                              {idx !== invoice.payments.length - 1 && (
                                <div className="absolute top-8 bottom-0 right-4 w-0.5 bg-border/40" />
                              )}
                              <div className="h-8 w-8 rounded-full bg-success/10 border border-success/20 flex items-center justify-center shrink-0 text-success">
                                 <CreditCard className="h-4 w-4" />
                              </div>
                              <div className="flex-1 pb-6">
                                 <div className="flex justify-between items-start">
                                    <div>
                                       <p className="text-sm font-black text-foreground">تم سداد {payment.amount.toLocaleString()} ج.م</p>
                                       <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">بواسطة {payment.method === "cash" ? "نقدي" : payment.method === "bank" ? "تحويل بنكي" : "بطاقة"}</p>
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground">{format(new Date(payment.date), "dd MMM, HH:mm", { locale: ar })}</p>
                                 </div>
                              </div>
                           </div>
                        ))
                     ) : (
                        <div className="py-8 text-center space-y-3">
                           <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto text-muted-foreground opacity-30">
                              <AlertCircle className="h-6 w-6" />
                           </div>
                           <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40">لا توجد مدفوعات مسجلة لهذه الفاتورة</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar: Customer & Actions */}
          <div className="space-y-6">
             {/* Customer Card */}
             <div className="bg-card border border-border/40 rounded-3xl p-6 lg:p-8 space-y-6">
                <div className="flex items-center gap-4">
                   <div className="h-14 w-14 rounded-2xl bg-secondary/30 flex items-center justify-center shrink-0 border border-border/40">
                      <User className="h-7 w-7 text-primary/60" />
                   </div>
                   <div className="min-w-0">
                      <h3 className="text-lg font-black text-foreground truncate">{invoice.customerName}</h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-muted-foreground">
                         <Phone className="h-3 w-3" />
                         {invoice.customerPhone}
                      </div>
                   </div>
                </div>

                {isPartial && (
                  <div className="p-4 bg-danger/5 border border-danger/10 rounded-2xl space-y-3">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black text-danger uppercase tracking-widest">المبلغ المتبقي</span>
                        <span className="text-lg font-black text-danger">{invoice.remainingAmount.toLocaleString()} ج.م</span>
                     </div>
                     <div className="h-1.5 w-full bg-danger/10 rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-danger transition-all duration-1000"
                           style={{ width: `${(invoice.remainingAmount / invoice.total) * 100}%` }}
                        />
                     </div>
                     <Button 
                        variant="primary" 
                        className="w-full h-12 rounded-xl bg-danger text-white hover:bg-danger/90 font-black text-[10px] shadow-lg shadow-danger/20"
                     >
                        تسجيل سداد جزئي
                     </Button>
                  </div>
                )}

                <div className="pt-6 border-t border-border/20">
                   <Link 
                      href="/customers/1" 
                      className="text-[10px] font-black text-primary uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:opacity-70 transition-opacity"
                   >
                      عرض سجل العميل الكامل
                      <ChevronRight className="h-3 w-3 rotate-180" />
                   </Link>
                </div>
             </div>

             {/* Quick Actions Card */}
             <div className="bg-secondary/10 border border-border/40 rounded-3xl p-6 lg:p-8 space-y-4">
                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-40 px-2">إجراءات سريعة</p>
                <div className="space-y-2">
                   <button className="w-full flex items-center gap-3 p-4 bg-card border border-border/40 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group">
                      <Printer className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      <span className="text-xs font-bold text-foreground">طباعة فاتورة حرارية (POS)</span>
                   </button>
                   <button className="w-full flex items-center gap-3 p-4 bg-card border border-border/40 rounded-2xl hover:border-primary/40 hover:bg-primary/5 transition-all group">
                      <History className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                      <span className="text-xs font-bold text-foreground">تكرار هذه الفاتورة</span>
                   </button>
                   <button className="w-full flex items-center gap-3 p-4 bg-danger/5 border border-danger/10 rounded-2xl hover:bg-danger/10 transition-all group">
                      <AlertCircle className="h-4 w-4 text-danger opacity-60" />
                      <span className="text-xs font-bold text-danger">إلغاء الفاتورة</span>
                   </button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
