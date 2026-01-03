"use client"

import type React from "react"

import { AuthGuard } from "@/components/auth-guard"
import { Providers } from "@/app/providers"

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <AuthGuard>{children}</AuthGuard>
    </Providers>
  )
}
