"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Building2, LayoutDashboard, Calendar, FileText, User, LogOut, Clock, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function EmployeeNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)

  const handleCheckIn = () => {
    if (isCheckedIn) {
      setIsCheckedIn(false)
      setCheckInTime(null)
    } else {
      setIsCheckedIn(true)
      const now = new Date()
      setCheckInTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    }
  }

  const navigation = [
    { name: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    { name: "Attendance", href: "/employee/attendance", icon: Clock },
    { name: "Leave Requests", href: "/employee/leave", icon: Calendar },
    { name: "Profile", href: "/employee/profile", icon: User },
    { name: "Payroll", href: "/employee/payroll", icon: FileText },
  ]

  return (
    <nav className="border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/employee/dashboard" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">Dayflow</span>
            </Link>
            <div className="hidden md:flex md:gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className={cn("gap-2", isActive && "bg-secondary")}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Attendance Status Section */}
            <div className="hidden md:flex items-center gap-4 mr-2">
              <div className="flex items-center gap-2">
                <div className={cn("h-3 w-3 rounded-full animate-pulse", isCheckedIn ? "bg-green-500" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]")} />
                <span className="text-sm font-medium text-muted-foreground">
                  {isCheckedIn ? "Present" : "Absent"}
                </span>
              </div>

              {isCheckedIn && (
                <div className="px-3 py-1 rounded-md bg-muted text-xs font-medium">
                  Since {checkInTime}
                </div>
              )}

              <Button
                variant={isCheckedIn ? "destructive" : "default"}
                size="sm"
                onClick={handleCheckIn}
                className="min-w-[100px]"
              >
                {isCheckedIn ? (
                  <>Check Out <LogOut className="ml-2 h-3 w-3" /></>
                ) : (
                  <>Check In <ArrowRight className="ml-2 h-3 w-3" /></>
                )}
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {user?.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user?.fullName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                    <p className="text-xs text-muted-foreground">ID: {user?.employeeId}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/employee/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="cursor-pointer text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
