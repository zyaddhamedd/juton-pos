"use client"

import { create } from "zustand"
import { PRODUCTS } from "@/lib/mock-data"

interface Product {
  id: string
  name: string
  sku: string
  category: string
  stock: number
  price: number
  minStock?: number
  unit?: string
}

interface InventoryStore {
  products: Product[]
  updateStock: (id: string, newStock: number) => void
  bulkUpdateStock: (updates: Record<string, number>) => void
  addProduct: (product: Omit<Product, "id">) => void
  editProduct: (product: Product) => void
}

export const useInventory = create<InventoryStore>((set) => ({
  products: PRODUCTS,
  updateStock: (id, newStock) => 
    set((state) => ({
      products: state.products.map((p) => 
        p.id === id ? { ...p, stock: newStock } : p
      )
    })),
  bulkUpdateStock: (updates) =>
    set((state) => ({
      products: state.products.map((p) => 
        updates[p.id] !== undefined ? { ...p, stock: Number(updates[p.id]) } : p
      )
    })),
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, { ...product, id: Math.random().toString(36).substr(2, 9) }]
    })),
  editProduct: (product) =>
    set((state) => ({
      products: state.products.map((p) => p.id === product.id ? product : p)
    }))
}))
