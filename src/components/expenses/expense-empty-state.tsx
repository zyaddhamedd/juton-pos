"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { FileSearch, Plus, RefreshCcw, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  type: "no-data" | "no-results" | "error"
  onAction?: () => void
  title?: string
  description?: string
}

export function ExpenseEmptyState({ type, onAction, title, description }: EmptyStateProps) {
  const configs = {
    "no-data": {
      icon: <Plus className="h-10 w-10" />,
      title: title || "لا توجد مصروفات مسجلة",
      description: description || "ابدأ بإضافة أول مصروف للمعرض لتتمكن من تتبع النفقات والتقارير المالية.",
      buttonLabel: "إضافة أول مصروف",
      buttonIcon: <Plus className="h-4 w-4" />
    },
    "no-results": {
      icon: <FileSearch className="h-10 w-10" />,
      title: title || "لا توجد نتائج بحث",
      description: description || "لم نجد أي مصروفات تطابق معايير البحث الحالية. جرب تغيير كلمات البحث أو الفلاتر.",
      buttonLabel: "إعادة تعيين الفلاتر",
      buttonIcon: <RefreshCcw className="h-4 w-4" />
    },
    "error": {
      icon: <AlertCircle className="h-10 w-10" />,
      title: title || "حدث خطأ أثناء التحميل",
      description: description || "واجهنا مشكلة تقنية أثناء محاولة جلب بيانات المصروفات. يرجى المحاولة مرة أخرى.",
      buttonLabel: "حاول مرة أخرى",
      buttonIcon: <RefreshCcw className="h-4 w-4" />
    }
  }

  const config = configs[type]

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-20 flex flex-col items-center text-center max-w-sm mx-auto space-y-6"
    >
      <div className="h-20 w-20 rounded-full bg-secondary/10 flex items-center justify-center text-muted-foreground opacity-30">
        {config.icon}
      </div>
      <div className="space-y-2">
         <h3 className="text-lg font-black tracking-tight">{config.title}</h3>
         <p className="text-xs font-medium text-muted-foreground leading-relaxed">{config.description}</p>
      </div>
      {onAction && (
        <Button 
          variant={type === "error" ? "danger" : "primary"}
          size="md"
          onClick={onAction}
          className="rounded-xl px-8 h-12 font-black text-xs shadow-xl shadow-primary/20"
          leftIcon={config.buttonIcon}
        >
          {config.buttonLabel}
        </Button>
      )}
    </motion.div>
  )
}
