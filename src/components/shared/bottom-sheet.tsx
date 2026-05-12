"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footerActions?: React.ReactNode
  className?: string
  fullscreen?: boolean
}

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  footerActions,
  className,
  fullscreen = false,
}: BottomSheetProps) {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm lg:hidden"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={cn(
              "fixed inset-x-0 bottom-0 z-[100] flex flex-col bg-card border-t border-border shadow-2xl lg:hidden",
              "left-0 right-0 w-full",
              fullscreen ? "h-[100dvh] rounded-t-none" : "rounded-t-[32px] max-h-[92vh]",
              className
            )}
            style={{ left: 0, right: 0 }}
          >
            {!fullscreen && <div className="w-12 h-1.5 bg-border rounded-full self-center my-4 shrink-0" />}
            
            <div className={cn(
              "flex items-center justify-between px-6 py-4 border-b border-border/50",
              fullscreen ? "pt-12 bg-card/80 backdrop-blur-md sticky top-0 z-10" : "pt-2"
            )}>
              <div className="flex-1">
                {title && <h2 className="text-lg font-black tracking-tight">{title}</h2>}
              </div>
              <button
                onClick={onClose}
                className="h-10 w-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className={cn(
              "flex-1 overflow-y-auto px-4 py-6",
              fullscreen ? "h-full" : "max-h-[90vh]"
            )}>
              {children}
            </div>

            {footerActions && (
              <div className="p-4 border-t border-border bg-card pb-[calc(1rem+env(safe-area-inset-bottom,1rem))]">
                {footerActions}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
