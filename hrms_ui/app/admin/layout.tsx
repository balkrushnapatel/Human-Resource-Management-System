"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { Providers } from "@/app/providers"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AuthGuard requireAdmin>{children}</AuthGuard>
    </Providers>
  )
}
