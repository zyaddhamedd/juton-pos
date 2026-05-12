"use client"

import * as React from "react"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterGroup } from "@/components/shared/filter-group"
import { EXPENSE_CATEGORIES } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Filter, Calendar, CreditCard, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface ExpenseFiltersProps {
  onSearch: (q: string) => void
  onCategoryChange: (id: string) => void
  selectedCategory: string
  onPaymentMethodChange: (id: string) => void
  selectedPaymentMethod: string
}

export function ExpenseFilters({
  onSearch,
  onCategoryChange,
  selectedCategory,
  onPaymentMethodChange,
  selectedPaymentMethod
}: ExpenseFiltersProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const paymentMethods = [
    { id: "all", label: "الكل" },
    { id: "cash", label: "نقدي" },
    { id: "card", label: "فيزا" },
    { id: "bank", label: "تحويل بنكي" },
  ]

  return (
    <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 space-y-3 border-b border-border/20 shadow-sm">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <SearchBar 
            placeholder="ابحث عن مصروف أو ملاحظة..." 
            onSearch={onSearch}
            className="h-11 lg:h-12"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="secondary" 
            size="md" 
            className="rounded-xl h-11 lg:h-12 font-black text-[10px] hidden sm:flex"
            leftIcon={<Calendar className="h-4 w-4" />}
          >
            نطاق التاريخ
          </Button>
          <Button 
            variant="secondary" 
            size="md" 
            onClick={() => setIsExpanded(!isExpanded)}
            className={cn(
              "rounded-xl h-11 lg:h-12 font-black text-[10px] lg:hidden",
              isExpanded && "bg-secondary"
            )}
            leftIcon={<Filter className="h-4 w-4" />}
          >
            الفلاتر
          </Button>
        </div>
      </div>

      <div className={cn(
        "space-y-4 lg:block transition-all duration-300 overflow-hidden",
        isExpanded ? "max-h-[500px] opacity-100 pt-2" : "max-h-0 lg:max-h-[500px] opacity-0 lg:opacity-100"
      )}>
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 pt-2 border-t border-border/20">
          <div className="space-y-2">
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">التصنيف</p>
            <FilterGroup 
              options={EXPENSE_CATEGORIES}
              selectedId={selectedCategory}
              onChange={onCategoryChange}
              className="-mx-1"
            />
          </div>
          
          <div className="h-10 w-px bg-border/20 hidden lg:block" />

          <div className="space-y-2">
            <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest px-1">طريقة الدفع</p>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {paymentMethods.map(m => (
                <button
                  key={m.id}
                  onClick={() => onPaymentMethodChange(m.id)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black whitespace-nowrap transition-all border",
                    selectedPaymentMethod === m.id
                      ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                      : "bg-secondary/10 text-muted-foreground border-border/20 hover:bg-secondary/30"
                  )}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
