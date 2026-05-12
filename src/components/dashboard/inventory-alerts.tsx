"use client"

import { motion } from "framer-motion"
import { Package2, AlertCircle, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PRODUCTS } from "@/lib/mock-data"
import Link from "next/link"

export function InventoryAlerts() {
  const lowStockProducts = PRODUCTS.filter(p => p.stock <= 10).slice(0, 4)

  return (
    <div className="bg-card border border-border/50 rounded-[32px] overflow-hidden shadow-sm">
      <div className="p-6 border-b border-border/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500/10 rounded-xl">
            <AlertCircle className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="font-bold">نواقص المخزون</h3>
        </div>
        <Link href="/inventory">
          <Button variant="ghost" size="sm" className="text-xs h-8">
            الكل <ChevronRight className="w-3 h-3 mr-1" />
          </Button>
        </Link>
      </div>

      <div className="divide-y divide-border/30">
        {lowStockProducts.map((product, index) => (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            key={product.id} 
            className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Package2 className="w-5 h-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-bold truncate max-w-[150px] lg:max-w-none">{product.name}</p>
                <p className="text-[10px] text-muted-foreground">SKU: {product.sku}</p>
              </div>
            </div>
            
            <div className="text-left">
              <Badge variant={product.stock === 0 ? "destructive" : "warning"} className="text-[10px] px-2 py-0.5">
                {product.stock === 0 ? "نفذ" : `${product.stock} ق`}
              </Badge>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-4 bg-muted/20 border-t border-border/50">
        <p className="text-[10px] text-center text-muted-foreground italic">
          يتم تحديث هذه القائمة تلقائياً عند كل عملية بيع
        </p>
      </div>
    </div>
  )
}
