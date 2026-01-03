import type React from "react"

import { AuthProvider } from "@/lib/auth-context"
import { AttendanceProvider } from "@/lib/attendance-context"
import { LeaveProvider } from "@/lib/leave-context"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AttendanceProvider>
        <LeaveProvider>{children}</LeaveProvider>
      </AttendanceProvider>
    </AuthProvider>
  )
}
