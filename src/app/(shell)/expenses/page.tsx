"use client"

import * as React from "react"
import { PageContainer } from "@/components/layout/page-container"
import { ExpenseStats } from "@/components/expenses/expense-stats"
import { ExpenseFilters } from "@/components/expenses/expense-filters"
import { ExpenseList } from "@/components/expenses/expense-list"
import { ExpenseForm } from "@/components/expenses/expense-form"
import { ExpenseCharts } from "@/components/expenses/expense-charts"
import { ExpenseDetailsDrawer } from "@/components/expenses/expense-details-drawer"
import { ExpenseAdvancedFilters } from "@/components/expenses/expense-advanced-filters"
import { ExpenseStatsSkeleton, ExpenseListSkeleton, ExpenseChartsSkeleton } from "@/components/expenses/expense-skeletons"
import { ExpenseEmptyState } from "@/components/expenses/expense-empty-state"
import { Drawer } from "@/components/shared/drawer"
import { BottomSheet } from "@/components/shared/bottom-sheet"
import { Button } from "@/components/ui/button"
import { Plus, Download, FileText, Filter, LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { useExpensesEngine } from "@/hooks/use-expenses-engine"
import { useToast } from "@/store/use-toast"
import { Expense } from "@/lib/mock-data"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export default function ExpensesPage() {
  const { 
    expenses, 
    allExpenses,
    isLoading, 
    error, 
    searchQuery, 
    setSearchQuery, 
    filters, 
    setFilters, 
    resetFilters,
    actions 
  } = useExpensesEngine()
  
  const { addToast } = useToast()
  
  const [isFormOpen, setIsFormOpen] = React.useState(false)
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [viewingExpense, setViewingExpense] = React.useState<Expense | null>(null)
  const [editingExpense, setEditingExpense] = React.useState<Expense | null>(null)

  const handleAddClick = () => {
    setEditingExpense(null)
    setIsFormOpen(true)
  }

  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense)
    setIsFormOpen(true)
  }

  const handleSubmit = (data: any) => {
    if (editingExpense) {
      actions.update(editingExpense.id, data)
      addToast("تم تحديث المصروف بنجاح", "success")
    } else {
      actions.add(data)
      addToast("تم إضافة المصروف بنجاح", "success")
    }
    setIsFormOpen(false)
  }

  const handleDelete = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المصروف؟")) {
      actions.delete(id)
      addToast("تم حذف المصروف", "warning")
      if (viewingExpense?.id === id) setViewingExpense(null)
    }
  }

  if (error) {
    return (
      <PageContainer>
        <ExpenseEmptyState type="error" onAction={() => window.location.reload()} />
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <div className="space-y-6 lg:space-y-10 pb-32">
        
        {/* Enterprise Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl lg:text-3xl font-black text-foreground tracking-tight">المصروفات</h1>
            <div className="flex items-center gap-2">
               <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
               <p className="text-[10px] lg:text-xs text-muted-foreground font-bold uppercase tracking-widest opacity-60">تحديث مالي مباشر • 2026</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="secondary" 
              size="md" 
              className="flex-1 sm:flex-none rounded-xl font-black text-[10px] h-11 px-4 border-border/40"
              leftIcon={<Download className="h-4 w-4" />}
            >
              تصدير التقارير
            </Button>
            <Button 
              variant="primary" 
              size="md" 
              className="flex-1 sm:flex-none h-11 px-6 rounded-xl font-black text-[10px] shadow-xl shadow-primary/20"
              onClick={handleAddClick}
              leftIcon={<Plus className="h-4 w-4" />}
            >
              إضافة مصروف
            </Button>
          </div>
        </div>


        {/* Analytics Section */}
        <div className="space-y-6">
          {isLoading ? (
            <>
              <ExpenseStatsSkeleton />
              <ExpenseChartsSkeleton />
            </>
          ) : (
            <>
              <ExpenseStats expenses={allExpenses} />
              <ExpenseCharts expenses={allExpenses} />
            </>
          )}
        </div>

        {/* Operational Section */}
        <div className="space-y-6">
           <div className="sticky top-0 z-30 bg-background/95 backdrop-blur-md pt-2 pb-4 -mx-4 px-4 border-b border-border/20 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-3">
                 <div className="flex-1">
                    <ExpenseFilters 
                      onSearch={setSearchQuery}
                      onCategoryChange={(val) => setFilters({...filters, category: val})}
                      selectedCategory={filters.category}
                      onPaymentMethodChange={(val) => setFilters({...filters, paymentMethod: val})}
                      selectedPaymentMethod={filters.paymentMethod}
                    />
                 </div>
                 <Button 
                   variant="secondary" 
                   size="md" 
                   onClick={() => setIsFilterOpen(true)}
                   className={cn(
                     "rounded-xl h-11 lg:h-12 font-black text-[10px] px-6",
                     Object.values(filters).some(v => v !== 'all' && v !== 'month') && "border-primary/50 text-primary bg-primary/5"
                   )}
                   leftIcon={<SlidersHorizontal className="h-4 w-4" />}
                 >
                    فلاتر متقدمة
                 </Button>
              </div>
           </div>

           <div className="space-y-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-sm lg:text-xl font-black text-foreground tracking-tight">سجل المصروفات</h2>
                  <span className="px-1.5 py-0.5 bg-secondary/50 text-muted-foreground text-[10px] font-black rounded-lg border border-border/50">
                    {expenses.length} من {allExpenses.length}
                  </span>
                </div>
              </div>

              {isLoading ? (
                <ExpenseListSkeleton />
              ) : expenses.length > 0 ? (
                <ExpenseList 
                  expenses={expenses} 
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                  onView={setViewingExpense}
                />
              ) : (
                <ExpenseEmptyState 
                  type={allExpenses.length === 0 ? "no-data" : "no-results"} 
                  onAction={allExpenses.length === 0 ? handleAddClick : resetFilters}
                />
              )}
           </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Actions (Mobile) */}
      {!isLoading && (
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent lg:hidden z-40 flex justify-center"
        >
          <div className="flex items-center gap-3 bg-card border border-border/50 p-2 rounded-2xl shadow-2xl backdrop-blur-xl">
             <Button variant="ghost" size="icon" className="h-12 w-12 rounded-xl" onClick={() => setIsFilterOpen(true)}>
                <Filter className="h-5 w-5" />
             </Button>
             <div className="h-8 w-px bg-border/50" />
             <Button variant="primary" size="md" className="h-12 px-8 rounded-xl font-black text-xs shadow-xl shadow-primary/20" onClick={handleAddClick} leftIcon={<Plus className="h-4 w-4" />}>
                مصروف جديد
             </Button>
          </div>
        </motion.div>
      )}

      {/* Overlays & Modals */}
      <Drawer
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingExpense ? "تعديل مصروف" : "إضافة مصروف جديد"}
        className="max-w-2xl"
      >
        <ExpenseForm 
          expense={editingExpense}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Drawer>

      <BottomSheet
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingExpense ? "تعديل مصروف" : "إضافة مصروف جديد"}
      >
        <ExpenseForm 
          expense={editingExpense}
          onSubmit={handleSubmit}
          onCancel={() => setIsFormOpen(false)}
        />
      </BottomSheet>

      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="الفلاتر المتقدمة"
        className="max-w-md"
      >
        <ExpenseAdvancedFilters 
          activeFilters={filters}
          onFilterChange={(k, v) => setFilters({...filters, [k]: v})}
          onReset={resetFilters}
        />
      </Drawer>

      <BottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="الفلاتر المتقدمة"
      >
        <ExpenseAdvancedFilters 
          activeFilters={filters}
          onFilterChange={(k, v) => setFilters({...filters, [k]: v})}
          onReset={resetFilters}
        />
      </BottomSheet>

      <ExpenseDetailsDrawer 
        expense={viewingExpense}
        isOpen={!!viewingExpense}
        onClose={() => setViewingExpense(null)}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

    </PageContainer>
  )
}
