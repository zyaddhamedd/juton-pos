"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useToast, ToastType } from "@/store/use-toast"
import { CheckCircle2, AlertCircle, Info, X, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

const icons: Record<ToastType, any> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertTriangle,
}

const styles: Record<ToastType, string> = {
  success: "bg-green-600 text-white shadow-green-600/20",
  error: "bg-danger text-white shadow-danger/20",
  info: "bg-blue-600 text-white shadow-blue-600/20",
  warning: "bg-accent text-accent-foreground shadow-accent/20",
}

export function ToastProvider() {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-2 w-full max-w-xs md:left-auto md:right-8 md:bottom-8 md:translate-x-0">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = icons[toast.type]
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              layout
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl border border-white/10",
                styles[toast.type]
              )}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <p className="flex-1 text-sm font-bold leading-tight">{toast.message}</p>
              <button
                onClick={() => removeToast(toast.id)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
