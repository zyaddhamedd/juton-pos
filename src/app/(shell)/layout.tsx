"use client"

import { ShellLayout } from "@/components/layout/shell-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <ShellLayout>{children}</ShellLayout>
}
