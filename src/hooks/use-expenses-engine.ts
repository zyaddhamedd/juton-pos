"use client"

import * as React from "react"
import { useExpenses } from "@/store/use-expenses"
import { Expense } from "@/lib/mock-data"

export function useExpensesEngine() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses()
  
  const [isLoading, setIsLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const [filters, setFilters] = React.useState({
    category: "all",
    paymentMethod: "all",
    status: "all",
    dateRange: "month",
    amountRange: [0, 50000]
  })

  // Mock initial load
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const filteredExpenses = React.useMemo(() => {
    return expenses.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           e.id.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesCategory = filters.category === "all" || e.category === filters.category
      const matchesPayment = filters.paymentMethod === "all" || e.paymentMethod === filters.paymentMethod
      const matchesStatus = filters.status === "all" || e.status === filters.status
      
      // Date filtering logic could be added here
      
      return matchesSearch && matchesCategory && matchesPayment && matchesStatus
    })
  }, [expenses, searchQuery, filters])

  const stats = React.useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + e.amount, 0)
    const today = expenses
      .filter(e => new Date(e.date).toDateString() === new Date().toDateString())
      .reduce((sum, e) => sum + e.amount, 0)
      
    const categoryTotals = expenses.reduce((acc: any, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount
      return acc
    }, {})
    
    const topCategory = Object.entries(categoryTotals).sort((a: any, b: any) => b[1] - a[1])[0]

    return {
      total,
      today,
      topCategory: topCategory ? { id: topCategory[0], amount: topCategory[1] } : null,
      avgDaily: total / 30
    }
  }, [expenses])

  const resetFilters = () => {
    setFilters({
      category: "all",
      paymentMethod: "all",
      status: "all",
      dateRange: "month",
      amountRange: [0, 50000]
    })
    setSearchQuery("")
  }

  return {
    expenses: filteredExpenses,
    allExpenses: expenses,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    setFilters,
    stats,
    resetFilters,
    actions: {
      add: addExpense,
      update: updateExpense,
      delete: deleteExpense
    }
  }
}
