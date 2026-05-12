import { create } from 'zustand'
import { Product, Customer } from '@/lib/mock-data'

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  customer: Customer | null
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  setCustomer: (customer: Customer | null) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  customer: null,
  
  addItem: (product) => {
    const items = get().items
    const existingItem = items.find(item => item.id === product.id)
    
    if (existingItem) {
      set({
        items: items.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] })
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter(item => item.id !== productId) })
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    set({
      items: get().items.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    })
  },

  setCustomer: (customer) => set({ customer }),
  
  clearCart: () => set({ items: [], customer: null }),

  getTotal: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
  },

  getItemCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0)
  }
}))
