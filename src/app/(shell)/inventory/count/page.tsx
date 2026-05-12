"use client"

import * as React from "react"
import { PageContainer } from "@/components/layout/page-container"
import { CountSessionHeader } from "@/components/inventory/count/count-session-header"
import { CountProductCard } from "@/components/inventory/count/count-product-card"
import { CountActionFooter } from "@/components/inventory/count/count-action-footer"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterGroup } from "@/components/shared/filter-group"
import { PRODUCTS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

import { useInventory } from "@/store/use-inventory"
import { useToast } from "@/store/use-toast"
import { useRouter } from "next/navigation"

export default function InventoryCountPage() {
  const { products, bulkUpdateStock } = useInventory()
  const { addToast } = useToast()
  const router = useRouter()
  
  const [counts, setCounts] = React.useState<Record<string, number | "">>({})
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("all")
  const [focusedId, setFocusedId] = React.useState<string | null>(null)

  const handleCountChange = (id: string, value: number | "") => {
    setCounts(prev => ({ ...prev, [id]: value }))
  }

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Enter") {
      const nextCard = filteredProducts[index + 1]
      if (nextCard) {
        setFocusedId(nextCard.id)
      }
    }
  }

  // Filtering Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const count = counts[p.id]
    const isCounted = count !== undefined && count !== ""
    
    if (!matchesSearch) return false

    if (activeFilter === "not_counted") return !isCounted
    if (activeFilter === "difference") return isCounted && Number(count) !== p.stock
    if (activeFilter === "match") return isCounted && Number(count) === p.stock

    return true
  })

  // Summary Logic
  const summary = React.useMemo(() => {
    const s = { shortages: 0, increases: 0, matches: 0, counted: 0, remaining: products.length }
    Object.entries(counts).forEach(([id, val]) => {
      if (val === "") return
      const p = products.find(prod => prod.id === id)
      if (!p) return
      
      s.counted++
      s.remaining--
      const diff = Number(val) - p.stock
      if (diff === 0) s.matches++
      else if (diff > 0) s.increases++
      else s.shortages++
    })
    return s
  }, [counts, products])

  const handleFinalize = () => {
    // Only update products that have a count value
    const updates: Record<string, number> = {}
    Object.entries(counts).forEach(([id, val]) => {
      if (val !== "") updates[id] = Number(val)
    })

    if (Object.keys(updates).length === 0) {
      addToast("لم يتم إدخال أي نتائج للجرد بعد", "warning")
      return
    }

    bulkUpdateStock(updates)
    addToast("تم اعتماد نتائج الجرد وتحديث المخزن بنجاح", "success")
    router.push("/inventory")
  }

  const filters = [
    { id: "all", label: "الكل" },
    { id: "not_counted", label: "غير مجرود" },
    { id: "difference", label: "يوجد فرق" },
    { id: "match", label: "مطابق" },
  ]

  return (
    <div className="min-h-screen bg-background pb-32">
      <PageContainer>
        <div className="space-y-4 lg:space-y-6">
          {/* Header & Progress */}
          <CountSessionHeader 
            totalItems={products.length}
            countedItems={summary.counted}
            startTime="10:30 AM"
          />

          {/* Operational Toolbar */}
          <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 space-y-3 border-b border-border/20 shadow-sm">
             <div className="flex flex-col lg:flex-row gap-2">
                <div className="flex-1">
                  <SearchBar 
                    placeholder="ابحث سريعا بالاسم أو الكود..." 
                    onSearch={setSearchQuery}
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                   {filters.map(f => (
                     <button
                       key={f.id}
                       onClick={() => setActiveFilter(f.id)}
                       className={cn(
                         "px-4 py-1.5 rounded-lg text-[9px] font-black whitespace-nowrap transition-all border",
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

          {/* Product Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
            {filteredProducts.map((product, index) => (
              <CountProductCard 
                key={product.id}
                product={product}
                countedValue={counts[product.id] ?? ""}
                onCountChange={handleCountChange}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={() => setFocusedId(product.id)}
                isFocused={focusedId === product.id}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center space-y-4">
               <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto text-muted-foreground opacity-10">
                  <ClipboardList className="h-10 w-10" />
               </div>
               <p className="text-sm font-black text-muted-foreground uppercase tracking-widest opacity-30">لا توجد منتجات مطابقة</p>
            </div>
          )}
        </div>
      </PageContainer>

      {/* Persistent Action Bar */}
      <CountActionFooter 
        summary={summary}
        onSaveDraft={() => addToast("تم حفظ مسودة الجرد بنجاح", "success")}
        onFinalize={handleFinalize}
      />
    </div>
  )
}

function ClipboardList(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <path d="M12 11h4" />
      <path d="M12 16h4" />
      <path d="M8 11h.01" />
      <path d="M8 16h.01" />
    </svg>
  )
}
