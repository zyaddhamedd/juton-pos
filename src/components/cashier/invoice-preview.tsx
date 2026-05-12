"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { 
  Printer, 
  Download, 
  Share2, 
  X, 
  MapPin, 
  Phone, 
  Globe, 
  Mail,
  Receipt,
  User,
  Calendar,
  Hash
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Currency } from "@/components/ui/currency"
import { cn } from "@/lib/utils"

interface InvoiceItem {
  id: string
  name: string
  price: number
  quantity: number
}

interface InvoicePreviewProps {
  isOpen: boolean
  onClose: () => void
  invoiceId: string
  items: InvoiceItem[]
  total: number
  customer?: {
    name: string
    phone: string
  }
}

export function InvoicePreview({ isOpen, onClose, invoiceId, items, total, customer }: InvoicePreviewProps) {
  if (!isOpen) return null

  const subtotal = total / 1.14
  const tax = total - subtotal

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-8 bg-black/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white text-slate-900 w-full max-w-4xl max-h-[90vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Toolbar */}
        <div className="flex items-center justify-between px-8 py-4 bg-slate-50 border-b border-slate-200 shrink-0">
           <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                 <Receipt className="w-5 h-5" />
              </div>
              <div>
                 <h3 className="text-sm font-black text-slate-900">معاينة الفاتورة الرسمية</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{invoiceId}</p>
              </div>
           </div>
           <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-200" onClick={() => window.print()}>
                 <Printer className="w-5 h-5 text-slate-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-200">
                 <Download className="w-5 h-5 text-slate-600" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-200">
                 <Share2 className="w-5 h-5 text-slate-600" />
              </Button>
              <div className="w-px h-6 bg-slate-200 mx-2" />
              <Button variant="ghost" size="icon" className="rounded-xl hover:bg-red-50 hover:text-red-500" onClick={onClose}>
                 <X className="w-5 h-5" />
              </Button>
           </div>
        </div>

        {/* Invoice Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 bg-white printable-area">
           <div className="max-w-3xl mx-auto space-y-12">
              {/* Invoice Header */}
              <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
                 <div className="space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="h-16 w-16 bg-[#003da5] rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-xl">J</div>
                       <div>
                          <h1 className="text-3xl font-black tracking-tighter text-[#003da5]">JOTUN</h1>
                          <p className="text-sm font-bold text-slate-400 tracking-[0.3em] uppercase">مركز جوتن - فرع شبين الكوم</p>
                       </div>
                    </div>
                    <div className="space-y-2">
                       <div className="flex items-center gap-3 text-slate-500">
                          <MapPin className="w-4 h-4 text-[#ed1c24]" />
                          <span className="text-xs font-bold">شارع الجلاء، شبين الكوم، المنوفية</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-500">
                          <Phone className="w-4 h-4 text-[#ed1c24]" />
                          <span className="text-xs font-bold">010 1234 5678 / 048 222 3344</span>
                       </div>
                       <div className="flex items-center gap-3 text-slate-500">
                          <Globe className="w-4 h-4 text-[#ed1c24]" />
                          <span className="text-xs font-bold">www.jotun.com.eg</span>
                       </div>
                    </div>
                 </div>

                 <div className="lg:text-right space-y-4 pt-4 lg:pt-0">
                    <h2 className="text-5xl font-black text-slate-100 uppercase tracking-tighter leading-none select-none">INVOICE</h2>
                    <div className="space-y-1">
                       <div className="flex lg:justify-end items-center gap-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الصدور</span>
                          <span className="text-sm font-black text-slate-900">{new Date().toLocaleDateString('ar-EG')}</span>
                       </div>
                       <div className="flex lg:justify-end items-center gap-3">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">رقم الفاتورة</span>
                          <span className="text-sm font-black text-primary">{invoiceId}</span>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Customer Info Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                 <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">العميل</p>
                    <div className="flex items-center gap-4">
                       <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-slate-400 border border-slate-200 shadow-sm">
                          <User className="w-6 h-6" />
                       </div>
                       <div>
                          <h4 className="text-base font-black text-slate-900">{customer?.name || "عميل نقدي"}</h4>
                          <p className="text-xs font-bold text-slate-500">{customer?.phone || "---"}</p>
                       </div>
                    </div>
                 </div>
                 <div className="md:border-r border-slate-200 md:pr-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                       <span className="h-2 w-2 rounded-full bg-green-500" />
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">حالة الدفع</p>
                    </div>
                    <h4 className="text-base font-black text-green-600">تم السداد بالكامل</h4>
                    <p className="text-[10px] font-bold text-slate-400">عبر خزينة المحل - نقداً</p>
                 </div>
              </div>

              {/* Items Table */}
              <div className="space-y-4">
                 <div className="flex items-center gap-2 px-1">
                    <Receipt className="w-4 h-4 text-[#003da5]" />
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">تفاصيل المنتجات</h3>
                 </div>
                 <div className="overflow-hidden rounded-[2rem] border border-slate-100 shadow-sm">
                    <table className="w-full text-right border-collapse">
                       <thead>
                          <tr className="bg-slate-900 text-white">
                             <th className="p-5 text-[10px] font-black uppercase tracking-widest first:rounded-tr-[2rem]">#</th>
                             <th className="p-5 text-[10px] font-black uppercase tracking-widest text-right">المنتج / الوصف</th>
                             <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">الكمية</th>
                             <th className="p-5 text-[10px] font-black uppercase tracking-widest text-center">سعر الوحدة</th>
                             <th className="p-5 text-[10px] font-black uppercase tracking-widest text-left last:rounded-tl-[2rem]">الإجمالي</th>
                          </tr>
                       </thead>
                       <tbody className="divide-y divide-slate-100">
                          {items.map((item, idx) => (
                             <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="p-5 text-sm font-bold text-slate-400">{(idx + 1).toString().padStart(2, '0')}</td>
                                <td className="p-5">
                                   <p className="text-sm font-black text-slate-900">{item.name}</p>
                                   <p className="text-[10px] font-bold text-slate-400">دهانات جوتن الأصلية</p>
                                </td>
                                <td className="p-5 text-center font-black text-slate-900">{item.quantity}</td>
                                <td className="p-5 text-center font-bold text-slate-600">
                                   <Currency amount={item.price} size="sm" />
                                </td>
                                <td className="p-5 text-left font-black text-slate-900">
                                   <Currency amount={item.price * item.quantity} size="sm" />
                                </td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

              {/* Summary Section */}
              <div className="flex flex-col lg:flex-row gap-8 lg:items-end justify-between">
                 <div className="flex-1 space-y-4">
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-2">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ملاحظات هامة</p>
                       <ul className="text-[10px] font-bold text-slate-500 space-y-1 list-disc list-inside">
                          <li>يتم الاسترجاع أو الاستبدال خلال 14 يوماً بشرط سلامة العبوات.</li>
                          <li>الألوان التي يتم خلطها بالكمبيوتر لا ترد ولا تستبدل.</li>
                          <li>برجاء التأكد من رقم اللون والكمية قبل مغادرة المعرض.</li>
                       </ul>
                    </div>
                 </div>
                 
                 <div className="w-full lg:w-80 space-y-3">
                    <div className="flex justify-between items-center px-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الإجمالي الفرعي</span>
                       <span className="text-sm font-black text-slate-600"><Currency amount={subtotal} size="sm" /></span>
                    </div>
                    <div className="flex justify-between items-center px-4">
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ضريبة القيمة المضافة (14%)</span>
                       <span className="text-sm font-black text-slate-600"><Currency amount={tax} size="sm" /></span>
                    </div>
                    <div className="h-px bg-slate-200 mx-4" />
                    <div className="flex justify-between items-center p-6 bg-[#003da5] rounded-[2rem] text-white shadow-xl shadow-blue-900/20">
                       <span className="text-xs font-black uppercase tracking-widest">المبلغ النهائي</span>
                       <span className="text-2xl font-black"><Currency amount={total} size="lg" /></span>
                    </div>
                 </div>
              </div>

              {/* Footer */}
              <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                 <div className="text-center md:text-right">
                    <p className="text-xs font-black text-slate-900 mb-1">شكراً لثقتكم في دهانات جوتن</p>
                    <p className="text-[10px] font-bold text-slate-400">نحن فخورون بكوننا جزءاً من جمال منزلك</p>
                 </div>
                 <div className="flex flex-col items-center gap-3">
                    <div className="h-20 w-48 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                       <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest rotate-[-15deg]">الختم الرسمي</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">توقيع المسؤول</p>
                 </div>
              </div>
           </div>
        </div>

        <style jsx>{`
          @media print {
            .printable-area {
              padding: 0 !important;
            }
            button {
              display: none !important;
            }
          }
        `}</style>
      </motion.div>
    </motion.div>
  )
}
