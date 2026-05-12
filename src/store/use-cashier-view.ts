import { create } from 'zustand'

export type CashierView = 'products' | 'cart' | 'payment' | 'success'

interface CashierViewState {
  view: CashierView
  setView: (view: CashierView) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedCategory: string
  setSelectedCategory: (category: string) => void
}

export const useCashierView = create<CashierViewState>((set) => ({
  view: 'products',
  setView: (view) => set({ view }),
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}))
