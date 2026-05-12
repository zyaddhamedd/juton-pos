"use client"

import * as React from "react"
import { PageContainer } from "@/components/layout/page-container"
import { InventorySummary } from "@/components/inventory/inventory-summary"
import { ProductList } from "@/components/inventory/product-list"
import { ProductDrawer } from "@/components/inventory/product-drawer"
import { ProductForm } from "@/components/inventory/product-form"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterGroup } from "@/components/shared/filter-group"
import { BottomSheet } from "@/components/shared/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Plus, Download, AlertCircle, Filter, LayoutGrid, List, ClipboardList } from "lucide-react"
import { PRODUCTS, CATEGORIES } from "@/lib/mock-data"
import { cn } from "@/lib/utils"
import Link from "next/link"

import { useInventory } from "@/store/use-inventory"

export default function InventoryPage() {
  const { products, addProduct, editProduct, updateStock } = useInventory()
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedCategory, setSelectedCategory] = React.useState("all")
  const [showLowStockOnly, setShowLowStockOnly] = React.useState(false)
  
  const [drawerConfig, setDrawerConfig] = React.useState<{
    isOpen: boolean
    mode: "add" | "edit" | "count"
    product: any | null
  }>({
    isOpen: false,
    mode: "add",
    product: null,
  })

  // Ref for mobile form
  const mobileFormRef = React.useRef<any>(null)

  // Filtering Logic
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || p.category === selectedCategory
    const matchesLowStock = !showLowStockOnly || (p.stock <= 10)
    return matchesSearch && matchesCategory && matchesLowStock
  })

  const handleSaveProduct = (updatedProduct: any) => {
    if (drawerConfig.mode === "add") {
      addProduct(updatedProduct)
    } else {
      editProduct(updatedProduct)
    }
  }

  const handleAdjustStock = (product: any, delta: number) => {
    updateStock(product.id, Math.max(0, product.stock + delta))
  }

  return (
    <PageContainer>
      <div className="space-y-4 lg:space-y-8 pb-10">
        {/* 1. Integrated Operational Header */}
      <div className="space-y-4 lg:space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl lg:text-2xl font-black text-foreground tracking-tight">المخزن</h1>
            <p className="text-[9px] text-muted-foreground font-black uppercase tracking-widest opacity-40">Operational Inventory</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="md" 
              className="h-10 px-4 rounded-xl font-black text-[10px] bg-accent/10 border-accent/20 text-accent hover:bg-accent hover:text-accent-foreground"
              asChild
            >
              <Link href="/inventory/count">
                <ClipboardList className="h-4 w-4 ml-2" />
                بدء الجرد
              </Link>
            </Button>
            <Button variant="secondary" size="md" className="hidden sm:flex rounded-xl font-black text-[10px] h-10 px-4">
              <Download className="h-3.5 w-3.5" />
              تصدير
            </Button>
            <Button 
              variant="primary" 
              size="md" 
              className="h-10 px-4 lg:px-5 rounded-xl font-black text-[10px] shadow-lg shadow-primary/10"
              onClick={() => setDrawerConfig({ isOpen: true, mode: "add", product: null })}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              منتج جديد
            </Button>
          </div>
        </div>

        {/* Operational Command Bar */}
        <div className="space-y-3 bg-secondary/10 border border-border/30 rounded-2xl p-2 lg:p-3 backdrop-blur-sm relative z-30 overflow-visible">
          <div className="flex flex-col lg:flex-row gap-2">
            <div className="flex-1">
              <SearchBar 
                placeholder="البحث عن منتج أو SKU..." 
                onSearch={setSearchQuery}
                className="h-10 lg:h-12"
              />
            </div>
            <button 
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
              className={cn(
                "flex items-center justify-center gap-2 px-4 h-10 lg:h-12 rounded-xl border transition-all text-[10px] font-black",
                showLowStockOnly 
                  ? "bg-warning/20 border-warning/40 text-warning shadow-inner" 
                  : "bg-secondary/20 border-border/40 text-muted-foreground hover:bg-secondary/40"
              )}
             >
               <AlertCircle className="h-3.5 w-3.5" />
               النواقص
             </button>
          </div>

          <div className="pt-2 border-t border-border/20">
             <FilterGroup 
               options={CATEGORIES}
               selectedId={selectedCategory}
               onChange={setSelectedCategory}
               className="-mx-1"
             />
          </div>
        </div>
      </div>

        {/* 3. Summary Stats - Compact & Premium */}
        <div className="lg:block">
           <InventorySummary products={products} />
        </div>

        {/* 4. Products Area */}
        <div className="space-y-3 lg:space-y-4">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 lg:gap-3">
              <h2 className="text-sm lg:text-xl font-black text-foreground tracking-tight">قائمة المنتجات</h2>
              <span className="px-1.5 py-0.5 bg-secondary text-muted-foreground text-[8px] lg:text-[10px] font-black rounded-md lg:rounded-lg border border-border/50">
                {filteredProducts.length}
              </span>
            </div>
            <div className="flex items-center gap-1.5 lg:gap-2 text-[7px] lg:text-[9px] font-bold text-muted-foreground uppercase tracking-[0.2em] bg-secondary/10 px-2 lg:px-3 py-1 lg:py-1.5 rounded-full border border-border/20 backdrop-blur-md">
              <div className="h-1.5 w-1.5 lg:h-2 lg:w-2 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              تحديث المخزون
            </div>
          </div>

          <ProductList 
            products={filteredProducts}
            onEdit={(p) => setDrawerConfig({ isOpen: true, mode: "edit", product: p })}
            onAdjustStock={handleAdjustStock}
            onInventory={(p) => setDrawerConfig({ isOpen: true, mode: "count", product: p })}
          />
        </div>
      </div>

      {/* 5. Drawers & Mobile Sheets */}
      <ProductDrawer 
        isOpen={drawerConfig.isOpen}
        onClose={() => setDrawerConfig({ ...drawerConfig, isOpen: false })}
        mode={drawerConfig.mode}
        product={drawerConfig.product}
        onSave={handleSaveProduct}
      />

      <BottomSheet
        isOpen={drawerConfig.isOpen}
        onClose={() => setDrawerConfig({ ...drawerConfig, isOpen: false })}
        title={drawerConfig.mode === "add" ? "إضافة منتج" : drawerConfig.mode === "edit" ? "تعديل منتج" : "جرد المخزون"}
        fullscreen={drawerConfig.mode === "add" || drawerConfig.mode === "edit"}
        footerActions={
          <div className="flex gap-3 w-full">
            <Button variant="secondary" className="flex-1 h-12 rounded-xl font-black" onClick={() => setDrawerConfig({ ...drawerConfig, isOpen: false })}>إلغاء</Button>
            <Button 
              variant="primary" 
              className="flex-1 h-12 rounded-xl font-black shadow-lg shadow-primary/20" 
              onClick={() => mobileFormRef.current?.handleSave()}
            >
              {drawerConfig.mode === "count" ? "تحديث الجرد" : "حفظ المنتج"}
            </Button>
          </div>
        }
      >
        <ProductForm 
          ref={mobileFormRef}
          product={drawerConfig.product}
          mode={drawerConfig.mode}
          onSave={(updated) => {
            handleSaveProduct(updated)
            setDrawerConfig({ ...drawerConfig, isOpen: false })
          }}
          onCancel={() => setDrawerConfig({ ...drawerConfig, isOpen: false })}
        />
      </BottomSheet>
    </PageContainer>
  )
}
