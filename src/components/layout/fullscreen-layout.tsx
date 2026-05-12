"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export function FullscreenLayout({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("fixed inset-0 z-[100] bg-background flex flex-col", className)}
    >
      {children}
    </motion.div>
  )
}
