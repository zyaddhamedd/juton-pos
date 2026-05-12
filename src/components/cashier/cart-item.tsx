"use client"

import { CartItem as ICartItem } from "@/store/use-cart"
import { QuantityPicker } from "@/components/ui/quantity-picker"
import { Currency } from "@/components/ui/currency"
import { Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CartItemProps {
  item: ICartItem
  onUpdateQuantity: (quantity: number) => void
  onRemove: () => void
}

export function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={cn(
        "group py-3 lg:py-2.5 border-b border-border/50 last:border-0 transition-colors hover:bg-secondary/5 px-0.5",
        "flex flex-col lg:grid lg:grid-cols-[minmax(0,1fr)_85px_60px_80px_32px] lg:items-start lg:gap-0"
      )}
    >
      {/* 1. Product Info - Flexible & Wrapping */}
      <div className="flex items-start justify-between lg:block min-w-0 px-1">
        <div className="min-w-0">
          <h4 className="font-bold text-xs lg:text-[13px] text-foreground leading-tight lg:leading-snug lg:whitespace-normal break-words">
            {item.name}
          </h4>
          <div className="flex items-center gap-1.5 mt-1 lg:mt-0.5">
            <span className="text-[9px] text-muted-foreground/70 uppercase tracking-widest font-black">
              {item.sku}
            </span>
            <span className="hidden lg:inline-flex h-0.5 w-0.5 rounded-full bg-border" />
            <span className="hidden lg:inline text-[9px] text-muted-foreground/40 font-medium">
              متوفر
            </span>
          </div>
        </div>
        
        {/* Mobile Trash (Hidden on Desktop Grid) */}
        <button 
          onClick={onRemove}
          className="p-2 -mr-2 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-lg transition-all lg:hidden"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>

      {/* 2. Quantity Controls - Fixed & Aligned */}
      <div className="flex lg:justify-center items-center h-full bg-secondary/15 lg:bg-transparent p-2.5 lg:p-0 rounded-xl lg:rounded-none mt-3 lg:mt-0">
        <div className="flex items-center justify-between w-full lg:w-fit gap-3">
          <QuantityPicker 
            value={item.quantity} 
            onChange={onUpdateQuantity}
            size="sm"
            className="lg:border-none lg:bg-transparent lg:p-0"
          />
          
          {/* Mobile Unit Price Label */}
          <div className="flex flex-col lg:hidden items-end">
            <span className="text-[8px] font-black text-muted-foreground/60 uppercase tracking-wider">سعر الوحدة</span>
            <Currency amount={item.price} size="sm" className="font-bold text-foreground/80" />
          </div>
        </div>
      </div>
      
      {/* 3. Unit Price - Desktop Column */}
      <div className="hidden lg:flex flex-col items-end h-full px-1 border-x border-border/10">
        <span className="text-[7px] font-black text-muted-foreground/40 uppercase mb-1 tracking-tighter">الوحدة</span>
        <Currency amount={item.price} size="sm" className="font-medium text-foreground/50 scale-90 origin-right" />
      </div>

      {/* 4. Subtotal - Aligned & High Weight */}
      <div className="flex flex-col items-end h-full px-1 lg:pl-1.5 bg-secondary/10 lg:bg-transparent p-2.5 lg:p-0 rounded-xl lg:rounded-none lg:contents">
        <div className="flex flex-col items-end lg:w-full">
          <span className="text-[8px] lg:text-[7px] font-black text-accent/60 lg:text-muted-foreground/40 uppercase tracking-[0.2em] mb-1 lg:mb-0.5">
            {item.quantity > 1 ? "الإجمالي" : "السعر"}
          </span>
          <Currency amount={item.price * item.quantity} size="sm" className="text-foreground font-black lg:text-accent lg:text-[14px]" />
        </div>
      </div>

      {/* 5. Desktop Trash - End Column */}
      <div className="hidden lg:flex items-center justify-center h-full">
        <button 
          onClick={onRemove}
          className="p-1.5 text-muted-foreground hover:text-danger hover:bg-danger/10 rounded-lg transition-all lg:opacity-0 lg:group-hover:opacity-100"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </motion.div>
  )
}
