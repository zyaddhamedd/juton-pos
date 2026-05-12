"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Package, Hash, Tag, Coins, Image as ImageIcon, Scale } from "lucide-react"
import { cn } from "@/lib/utils"

interface Product {
  id?: string
  name: string
  category: string
  price: number
  stock: number
  sku: string
}

interface ProductFormProps {
  onSave: (product: any) => void
  onCancel: () => void
  product?: Product | null
  mode: "edit" | "add" | "count"
}

export const ProductForm = React.forwardRef<any, ProductFormProps>(({ onSave, onCancel, product, mode }, ref) => {
  const [formData, setFormData] = React.useState<Product>({
    name: "",
    category: "paints",
    price: 0,
    stock: 0,
    sku: "",
  })

  const [actualQuantity, setActualQuantity] = React.useState<number | "">("")

  React.useImperativeHandle(ref, () => ({
    handleSave
  }))

  React.useEffect(() => {
    if (product) {
      setFormData(product)
      if (mode === "count") setActualQuantity("")
    } else {
      setFormData({
        name: "",
        category: "paints",
        price: 0,
        stock: 0,
        sku: `JTN-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      })
    }
  }, [product, mode])

  const handleSave = () => {
    if (mode === "count") {
      onSave({ ...formData, stock: Number(actualQuantity) })
    } else {
      onSave(formData)
    }
  }

  return (
    <div className="space-y-10 pb-20">
      {mode === "count" ? (
        <div className="space-y-8 py-2">
          {/* System vs Actual Comparison */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-secondary/20 border border-border/40 rounded-3xl p-5 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-60">رصيد السيستم</span>
              <span className="text-3xl font-black text-foreground tracking-tighter">{formData.stock}</span>
              <span className="text-[10px] font-bold text-muted-foreground mt-1">قطعة</span>
            </div>
            <div className={cn(
              "border rounded-3xl p-5 flex flex-col items-center justify-center text-center transition-all duration-500",
              actualQuantity === "" 
                ? "bg-secondary/10 border-border/20 opacity-40" 
                : (Number(actualQuantity) - formData.stock === 0)
                  ? "bg-success/5 border-success/30"
                  : "bg-warning/5 border-warning/30"
            )}>
              <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 opacity-60">الفرق</span>
              <span className={cn(
                "text-3xl font-black tracking-tighter",
                actualQuantity === "" ? "text-muted-foreground" : (Number(actualQuantity) - formData.stock >= 0 ? "text-success" : "text-destructive")
              )}>
                {actualQuantity === "" ? "--" : (Number(actualQuantity) - formData.stock >= 0 ? "+" : "") + (Number(actualQuantity) - formData.stock)}
              </span>
              <span className="text-[10px] font-bold text-muted-foreground mt-1">الزيادة / العجز</span>
            </div>
          </div>

          {/* Large Quantity Input */}
          <div className="space-y-4">
            <div className="text-center">
              <label className="text-[11px] font-black text-muted-foreground uppercase tracking-[0.3em] opacity-70">أدخل الكمية الفعلية المكتشفة</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/5 rounded-[2.5rem] blur-2xl group-focus-within:bg-primary/10 transition-all" />
              <input 
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={actualQuantity}
                onChange={(e) => setActualQuantity(e.target.value ? Number(e.target.value) : "")}
                className="relative w-full h-24 bg-card border-2 border-border/40 rounded-[2.5rem] text-center text-5xl font-black text-foreground focus:border-primary focus:ring-8 focus:ring-primary/5 outline-none transition-all placeholder:text-muted-foreground/10"
                placeholder="0"
                autoFocus
              />
              <Scale className="absolute right-8 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground/10 pointer-events-none group-focus-within:text-primary/20 transition-colors" />
            </div>
          </div>

          {/* Quick Adjustment Helpers */}
          <div className="flex justify-center gap-2">
            {[0, 5, 10, 20, 50].map((val) => (
              <button
                key={val}
                onClick={() => setActualQuantity(val)}
                className="px-4 py-2 rounded-xl bg-secondary/30 text-[10px] font-black text-muted-foreground hover:bg-secondary/50 transition-colors"
              >
                {val === 0 ? "صفر" : val}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-12">
          {/* SECTION 1: Identity & Visuals */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-r-4 border-primary pr-3">
               <h3 className="text-sm font-black text-foreground uppercase tracking-widest">هوية المنتج والصورة</h3>
            </div>
            
            {/* LARGE TACTILE Image Picker */}
            <label className="block cursor-pointer group">
              <div className="aspect-[16/10] bg-secondary/10 border-2 border-dashed border-border/40 rounded-[2rem] flex flex-col items-center justify-center gap-4 group-hover:border-primary/40 transition-all relative overflow-hidden">
                <input type="file" className="hidden" accept="image/*" />
                <div className="h-16 w-16 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-all shadow-inner">
                  <ImageIcon className="h-8 w-8" />
                </div>
                <div className="text-center space-y-1">
                  <p className="text-[11px] font-black text-foreground uppercase tracking-widest">رفع صورة المنتج</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">PNG, JPG up to 5MB</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </label>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1 opacity-60">اسم المنتج التجاري</label>
              <div className="relative group">
                <Package className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                <input 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-14 bg-secondary/20 border border-border/40 rounded-2xl pr-12 pl-4 text-sm font-bold focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  placeholder="مثال: جوتن فينوماستيك مطفي..."
                />
              </div>
            </div>
          </section>

          {/* SECTION 2: Classification */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-r-4 border-primary pr-3">
               <h3 className="text-sm font-black text-foreground uppercase tracking-widest">التصنيف والنوع</h3>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1 opacity-60">اختر تصنيف المنتج</label>
              <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
                {[
                  { id: "paints", label: "دهانات", icon: Package },
                  { id: "putty", label: "معجون", icon: Package },
                  { id: "tools", label: "أدوات", icon: Package },
                  { id: "additives", label: "إضافات", icon: Package }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFormData({ ...formData, category: cat.id })}
                    className={cn(
                      "px-6 py-4 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all border flex items-center gap-3 shrink-0",
                      formData.category === cat.id 
                        ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.05]" 
                        : "bg-secondary/20 text-muted-foreground border-border/30 hover:bg-secondary/40"
                    )}
                  >
                    <cat.icon className="h-4 w-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: Financials */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-r-4 border-primary pr-3">
               <h3 className="text-sm font-black text-foreground uppercase tracking-widest">بيانات التسعير</h3>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1 opacity-60">سعر الوحدة (ريال)</label>
              <div className="relative group">
                <Coins className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                <input 
                  type="number"
                  value={formData.price || ""}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  className="w-full h-14 bg-secondary/20 border border-border/40 rounded-2xl pr-12 pl-4 text-lg font-black focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                  placeholder="0.00"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-muted-foreground/40">SAR</span>
              </div>
            </div>
          </section>

          {/* SECTION 4: Logistics */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 border-r-4 border-primary pr-3">
               <h3 className="text-sm font-black text-foreground uppercase tracking-widest">بيانات المخزون</h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1 opacity-60">الكمية الافتتاحية</label>
                <div className="relative group">
                  <Hash className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <input 
                    type="number"
                    value={formData.stock || ""}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full h-14 bg-secondary/20 border border-border/40 rounded-2xl pr-12 pl-4 text-sm font-bold focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] px-1 opacity-60">SKU / كود المنتج</label>
                <div className="relative group">
                  <Tag className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-primary transition-colors" />
                  <input 
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                    className="w-full h-14 bg-secondary/20 border border-border/40 rounded-2xl pr-12 pl-4 text-sm font-bold focus:border-primary focus:bg-card focus:ring-4 focus:ring-primary/5 outline-none transition-all uppercase tracking-wider"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
})

ProductForm.displayName = "ProductForm"
