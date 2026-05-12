"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, X, FileImage, FileText, CheckCircle2, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface ReceiptUploadProps {
  onUpload: (file: File) => void
  onRemove: () => void
  currentFile?: string | null
}

export function ExpenseReceiptUpload({ onUpload, onRemove, currentFile }: ReceiptUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [file, setFile] = React.useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      startUpload(selectedFile)
    }
  }

  const startUpload = (file: File) => {
    setIsUploading(true)
    setProgress(0)
    
    // Mock upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          onUpload(file)
          return 100
        }
        return prev + 10
      })
    }, 100)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    setFile(null)
    onRemove()
  }

  return (
    <div className="space-y-2">
       <label className="text-[10px] font-black text-muted-foreground uppercase tracking-widest px-1">إرفاق الإيصال</label>
       
       <div 
         className={cn(
           "relative h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-all group cursor-pointer overflow-hidden",
           file || currentFile ? "border-primary/50 bg-primary/5" : "border-border/50 bg-secondary/5 hover:bg-secondary/10 hover:border-primary/30"
         )}
         onClick={() => !file && document.getElementById('receipt-upload')?.click()}
       >
          <input 
            id="receipt-upload" 
            type="file" 
            className="hidden" 
            accept="image/*,application/pdf" 
            onChange={handleFileChange}
          />

          <AnimatePresence mode="wait">
            {isUploading ? (
              <motion.div 
                key="uploading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-2"
              >
                <Loader2 className="h-6 w-6 text-primary animate-spin" />
                <div className="w-32 h-1.5 bg-secondary rounded-full overflow-hidden">
                   <motion.div 
                     className="h-full bg-primary"
                     initial={{ width: 0 }}
                     animate={{ width: `${progress}%` }}
                   />
                </div>
                <p className="text-[10px] font-black text-primary">جاري الرفع... {progress}%</p>
              </motion.div>
            ) : file || currentFile ? (
              <motion.div 
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-4 px-4 w-full"
              >
                <div className="h-16 w-16 rounded-xl bg-card border border-border/50 flex items-center justify-center text-primary shadow-lg">
                   <FileImage className="h-8 w-8" />
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-xs font-black truncate">{file?.name || 'receipt_preview.jpg'}</p>
                   <p className="text-[10px] font-bold text-muted-foreground uppercase">{(file?.size ? (file.size / 1024).toFixed(1) : '245')} KB</p>
                   <div className="mt-1 flex items-center gap-1 text-[9px] font-black text-success uppercase">
                      <CheckCircle2 className="h-3 w-3" />
                      Uploaded Successfully
                   </div>
                </div>
                <button 
                  onClick={handleRemove}
                  className="p-2 hover:bg-danger/10 rounded-lg text-danger transition-colors"
                >
                   <X className="h-4 w-4" />
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                   <Upload className="h-5 w-5" />
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-black">اسحب وأفلت أو تصفح الملفات</p>
                  <p className="text-[9px] font-bold text-muted-foreground mt-0.5">PNG, JPG, PDF up to 10MB</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
       </div>
    </div>
  )
}
