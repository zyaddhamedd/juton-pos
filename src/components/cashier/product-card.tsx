"use client"

import { Product } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Currency } from "@/components/ui/currency"
import { Package, Plus, Info } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  product: Product
  onAdd: () => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock < 10

  return (
    <Card 
      variant="interactive"
      onClick={!isOutOfStock ? onAdd : undefined}
      className={cn(
        "group p-3 flex flex-col gap-4 h-full bg-secondary/20 backdrop-blur-sm border-border/40 hover:bg-card hover:border-accent/40 hover:shadow-[0_0_30px_rgba(247,198,0,0.05)] transition-all duration-500",
        isOutOfStock && "opacity-50 cursor-not-allowed grayscale"
      )}
    >
      <div className="relative aspect-square rounded-[18px] bg-secondary/80 overflow-hidden flex items-center justify-center shadow-inner">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        ) : (
          <Package className="h-12 w-12 text-muted-foreground opacity-10 group-hover:opacity-20 transition-opacity" />
        )}
        
        {product.colorCode && (
          <div 
            className="absolute top-3 right-3 w-10 h-10 rounded-2xl border-4 border-card shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500"
            style={{ backgroundColor: product.colorCode }}
          >
            <div className="absolute inset-0 rounded-2xl shadow-inner opacity-30 bg-gradient-to-br from-white to-transparent" />
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {isOutOfStock && <Badge variant="error" size="sm" className="shadow-lg">نفذت الكمية</Badge>}
          {isLowStock && <Badge variant="warning" size="sm" className="shadow-lg bg-yellow-500/90 text-black">تنبيه: {product.stock}</Badge>}
        </div>
      </div>

      <div className="flex flex-col flex-1 px-1">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[10px] font-black text-primary uppercase tracking-widest opacity-90">
              {product.sku}
            </p>
            <div className="h-1 w-1 rounded-full bg-border" />
          </div>
          <h3 className="font-bold text-sm leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary-light transition-colors duration-300">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex flex-col">
            <Currency amount={product.price} size="sm" className="text-foreground font-black" />
            <p className="text-[10px] text-muted-foreground font-bold">سعر الوحدة</p>
          </div>
          
          <motion.button
            whileTap={{ scale: 0.85 }}
            className={cn(
              "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 shadow-lg",
              isOutOfStock 
                ? "bg-secondary text-muted-foreground" 
                : "bg-primary text-white shadow-primary/20 hover:bg-primary-light group-hover:scale-110"
            )}
          >
            <Plus className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </Card>
  )
}
