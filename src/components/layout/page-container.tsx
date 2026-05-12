"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface PageContainerProps {
  children: React.ReactNode
  className?: string
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "flex-1 w-full lg:max-w-7xl lg:mx-auto px-4 py-6 lg:px-8 lg:py-8",
        className
      )}
    >
      {children}
    </motion.main>
  )
}
