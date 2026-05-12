"use client"

import * as React from "react"
import { useCashierView } from "@/store/use-cashier-view"
import { useCart } from "@/store/use-cart"
import { PRODUCTS, CATEGORIES } from "@/lib/mock-data"
import { SearchBar } from "@/components/shared/search-bar"
import { FilterGroup } from "@/components/shared/filter-group"
import { ProductCard } from "@/components/cashier/product-card"
import { CartItem } from "@/components/cashier/cart-item"
import { CustomerSelector } from "@/components/cashier/customer-selector"
import { PaymentWorkflow } from "@/components/cashier/payment-workflow"
import { SuccessScreen } from "@/components/cashier/success-screen"
import { ColorPicker } from "@/components/cashier/color-picker"
import { Drawer } from "@/components/shared/drawer"
import { BottomSheet } from "@/components/shared/bottom-sheet"
import { Currency } from "@/components/ui/currency"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ShoppingCart, 
  Maximize2, 
  Minimize2, 
  Home, 
  Trash2, 
  CreditCard, 
  Palette,
  ChevronLeft,
  ChevronRight,
  Plus
} from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function CashierPage() {
  const { view, setView, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useCashierView()
  const { items, addItem, removeItem, updateQuantity, getTotal, getItemCount, clearCart, customer } = useCart()
  
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [isColorPickerOpen, setIsColorPickerOpen] = React.useState(false)
  const [isPaymentOpen, setIsPaymentOpen] = React.useState(false)

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
      setIsFullscreen(true)
    } else {
      document.exitFullscreen().catch(() => {})
      setIsFullscreen(false)
    }
  }

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.includes(searchQuery) || p.sku.includes(searchQuery)
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Main Layout
  if (view === 'success') {
    return (
      <SuccessScreen 
        total={getTotal() * 1.14}
        invoiceId={`JOT-${new Date().getTime().toString().slice(-6)}`}
        items={items}
        customer={customer}
        onNewInvoice={() => {
          clearCart()
          setView('products')
        }} 
      />
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background text-foreground overflow-hidden font-sans">
      {/* Dense Operational Header */}
      <header className="flex h-14 shrink-0 items-center justify-between px-4 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-secondary rounded-lg transition-all text-muted-foreground hover:text-foreground">
            <Home className="h-4 w-4" />
          </Link>
          <div className="h-6 w-px bg-border/50" />
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 bg-accent rounded-lg flex items-center justify-center text-accent-foreground text-[10px] font-black shadow-lg shadow-accent/20">J</div>
            <h1 className="text-xs font-black tracking-tight hidden sm:block">JOTUN <span className="text-accent uppercase">Cashier</span></h1>
          </div>
        </div>

        {/* Desktop Search */}
        <div className="flex-1 max-w-xl mx-8 hidden lg:block">
          <SearchBar 
            placeholder="البحث عن منتج" 
            onSearch={setSearchQuery}
            className="h-10 scale-90 origin-center"
          />
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsColorPickerOpen(true)}
            className="group relative flex items-center gap-2 px-3 py-1.5 bg-accent text-accent-foreground rounded-lg font-black text-[10px] transition-all duration-500 hover:brightness-110 active:scale-95 shadow-lg shadow-accent/20"
          >
            <Palette className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">خلاط الألوان</span>
          </button>
          
          <div className="h-6 w-px bg-border/50 hidden md:block" />

          <button onClick={toggleFullscreen} className="p-2 hover:bg-secondary rounded-lg transition-all text-muted-foreground hover:text-foreground hidden md:block">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
        </div>
      </header>
      <main className="flex-1 flex overflow-hidden">
        {/* Product Browser Area */}
        <section className="flex-1 flex flex-col overflow-hidden">
          {/* Category & Mobile Search Bar */}
          <div className="p-3 lg:px-6 border-b border-border/30 bg-card/20 backdrop-blur-xl shrink-0">
            <div className="lg:hidden mb-3">
              <input 
                type="text" 
                placeholder="البحث عن منتج"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 bg-secondary/50 border border-border/50 rounded-xl px-4 text-xs font-bold outline-none focus:ring-4 focus:ring-danger/5 focus:border-danger/40 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between px-1">
                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-[0.2em]">التصنيفات</p>
              </div>
              <FilterGroup 
                options={CATEGORIES}
                selectedId={selectedCategory}
                onChange={setSelectedCategory}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-6 no-scrollbar">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAdd={() => addItem(product)}
                  />
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-xs font-bold text-muted-foreground">لا توجد نتائج</p>
              </div>
            )}
          </div>
        </section>

        {/* Desktop Cart Sidebar (Fixed Right) */}
        <aside className="w-[380px] border-r border-border bg-card/40 backdrop-blur-2xl hidden lg:flex flex-col shrink-0">
          <div className="p-4 border-b border-border bg-card/50">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-3.5 w-3.5 text-accent" />
                <h2 className="text-sm font-black tracking-tight">تجهيز الفاتورة</h2>
              </div>
              <Badge variant="neutral" size="sm" className="font-black h-5 px-1.5">{getItemCount()} منتجات</Badge>
            </div>
            <CustomerSelector />
          </div>

          <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
            <AnimatePresence mode="popLayout">
              {items.length > 0 ? (
                <div className="space-y-0.5">
                  {items.map((item) => (
                    <CartItem 
                      key={item.id} 
                      item={item} 
                      onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                      onRemove={() => removeItem(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                  <ShoppingCart className="h-10 w-10 mb-2" />
                  <p className="text-[10px] font-black uppercase">السلة فارغة</p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Compact Totals */}
          <div className="p-4 border-t border-border/30 bg-secondary/10 space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between items-center px-1">
                <span className="text-muted-foreground font-black uppercase tracking-widest text-[8px]">الإجمالي</span>
                <Currency amount={getTotal()} size="sm" className="font-bold opacity-80" />
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="text-muted-foreground font-black uppercase tracking-widest text-[8px]">الضريبة (14%)</span>
                <Currency amount={getTotal() * 0.14} size="sm" className="font-bold opacity-80" />
              </div>
              <div className="pt-3 border-t border-border/50 flex justify-between items-center px-1">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-accent uppercase tracking-[0.2em] mb-0.5">المبلغ النهائي</span>
                  <Currency amount={getTotal() * 1.14} size="lg" className="text-foreground tracking-tighter" />
                </div>
                <button 
                  onClick={clearCart}
                  className="p-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-lg transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <Button 
              variant="primary" 
              size="xl" 
              className="w-full h-14 rounded-xl text-sm font-black shadow-xl shadow-primary/20 transition-all duration-500 hover:scale-[1.01] active:scale-95 border-2 border-accent/20"
              disabled={items.length === 0}
              onClick={() => setIsPaymentOpen(true)}
              leftIcon={<CreditCard className="h-5 w-5 text-accent" />}
            >
              تأكيد ومتابعة الدفع
            </Button>
          </div>
        </aside>
      </main>

      {/* Mobile Floating Cart Action */}
      <AnimatePresence>
        {items.length > 0 && view === 'products' && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent lg:hidden z-40"
          >
            <Button 
              variant="primary" 
              size="xl" 
              className="w-full h-16 rounded-2xl shadow-2xl shadow-primary/40 relative overflow-hidden group"
              onClick={() => setView('cart')}
            >
              <div className="absolute inset-0 bg-white/10 translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <div className="flex items-center justify-between w-full px-2 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 h-10 w-10 rounded-xl flex items-center justify-center font-black">
                    {getItemCount()}
                  </div>
                  <span className="font-black text-lg">عرض السلة</span>
                </div>
                <Currency amount={getTotal() * 1.14} size="md" className="text-white" />
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Cart View (Overlay) */}
      <AnimatePresence>
        {view === 'cart' && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-background lg:hidden flex flex-col"
          >
            <header className="h-14 flex items-center justify-between px-4 border-b border-border shrink-0">
              <button onClick={() => setView('products')} className="p-2 hover:bg-secondary rounded-xl">
                <ChevronRight className="h-5 w-5" />
              </button>
              <h2 className="text-sm font-black uppercase tracking-tight">مراجعة الفاتورة</h2>
              <div className="w-10" />
            </header>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
               <div>
                  <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3 px-1">العميل</p>
                  <CustomerSelector />
               </div>
               
               <div>
                 <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest mb-3 px-1">المنتجات ({items.length})</p>
                 <div className="space-y-0.5">
                   {items.map((item) => (
                      <CartItem 
                        key={item.id} 
                        item={item} 
                        onUpdateQuantity={(q) => updateQuantity(item.id, q)}
                        onRemove={() => removeItem(item.id)}
                      />
                    ))}
                 </div>
               </div>
            </div>

            <div className="p-4 border-t border-border bg-card space-y-4 pb-8">
              <div className="flex justify-between items-center px-1">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-wider">الإجمالي المستحق</span>
                  <Currency amount={getTotal() * 1.14} size="lg" className="text-accent tracking-tighter" />
                </div>
                <div className="px-3 py-1.5 bg-accent/10 rounded-lg border border-accent/20">
                  <span className="text-[10px] font-black text-accent">{getItemCount()} قطع</span>
                </div>
              </div>
              <Button 
                variant="primary" 
                size="xl" 
                className="w-full h-16 rounded-2xl text-base font-black border-2 border-accent/20"
                onClick={() => setIsPaymentOpen(true)}
              >
                الذهاب للدفع
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlays */}
      <Drawer
        isOpen={isColorPickerOpen}
        onClose={() => setIsColorPickerOpen(false)}
        title="خلاط الألوان الذكي"
      >
        <ColorPicker onSelect={(hex) => {
          setIsColorPickerOpen(false)
          // Integration logic would go here
        }} />
      </Drawer>

      <Drawer
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title="إتمام عملية الدفع"
        className="max-w-lg"
      >
        <PaymentWorkflow onComplete={() => {
          setIsPaymentOpen(false)
          setView('success')
        }} />
      </Drawer>

      <BottomSheet
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        title="إتمام عملية الدفع"
      >
        <PaymentWorkflow onComplete={() => {
          setIsPaymentOpen(false)
          setView('success')
        }} />
      </BottomSheet>
    </div>
  )
}

function SearchIcon(props: any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
