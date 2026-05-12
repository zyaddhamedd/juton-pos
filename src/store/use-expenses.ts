"use client"

import { create } from "zustand"
import { EXPENSES, Expense } from "@/lib/mock-data"

interface ExpensesStore {
  expenses: Expense[]
  addExpense: (expense: Omit<Expense, "id">) => void
  updateExpense: (id: string, updates: Partial<Expense>) => void
  deleteExpense: (id: string) => void
}

export const useExpenses = create<ExpensesStore>((set) => ({
  expenses: EXPENSES,
  addExpense: (expense) =>
    set((state) => ({
      expenses: [
        { 
          ...expense, 
          id: `EXP-${Math.random().toString(36).substr(2, 9).toUpperCase()}` 
        },
        ...state.expenses
      ],
    })),
  updateExpense: (id, updates) =>
    set((state) => ({
      expenses: state.expenses.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    })),
  deleteExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),
}))
