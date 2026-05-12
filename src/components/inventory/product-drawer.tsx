"use client"

import * as React from "react"
import { Drawer } from "@/components/shared/drawer"
import { ProductForm } from "./product-form"

import { Button } from "@/components/ui/button"

interface Product {
  id?: string
  name: string
  category: string
  price: number
  stock: number
  sku: string
}

interface ProductDrawerProps {
  isOpen: boolean
  onClose: () => void
  onSave: (product: any) => void
  product?: Product | null
  mode: "edit" | "add" | "count"
}

export function ProductDrawer({ isOpen, onClose, onSave, product, mode }: ProductDrawerProps) {
  const title = mode === "add" ? "إضافة منتج جديد" : mode === "edit" ? "تعديل منتج" : "جرد المنتج"
  
  // Use a ref to trigger save from footer
  const formRef = React.useRef<any>(null)

  return (
    <Drawer 
      isOpen={isOpen} 
      onClose={onClose} 
      title={title}
      className="max-w-md hidden lg:flex"
      footerActions={
        <div className="flex gap-3 w-full">
          <Button variant="secondary" className="flex-1 h-12 rounded-xl font-black" onClick={onClose}>إلغاء</Button>
          <Button 
            variant="primary" 
            className="flex-1 h-12 rounded-xl font-black shadow-lg shadow-primary/20" 
            onClick={() => formRef.current?.handleSave()}
          >
            {mode === "count" ? "تحديث الجرد" : "حفظ المنتج"}
          </Button>
        </div>
      }
    >
      <ProductForm 
        ref={formRef}
        product={product} 
        mode={mode} 
        onSave={(updated) => {
          onSave(updated)
          onClose()
        }} 
        onCancel={onClose} 
      />
    </Drawer>
  )
}
