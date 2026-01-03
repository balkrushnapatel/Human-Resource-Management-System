"use client"

import { EmployeeNav } from "@/components/employee-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Calendar, Clock, FileText, User, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function EmployeeDashboard() {
  const { user } = useAuth()

  const stats = [
    {
      name: "Present Days",
      value: "22",
      description: "This month",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "Leave Balance",
      value: "12",
      description: "Days remaining",
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Pending Requests",
      value: "2",
      description: "Awaiting approval",
      icon: AlertCircle,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      name: "Hours This Week",
      value: "40",
      description: "5 days logged",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const quickActions = [
    { name: "View Profile", href: "/employee/profile", icon: User },
    { name: "Mark Attendance", href: "/employee/attendance", icon: Clock },
    { name: "Apply for Leave", href: "/employee/leave", icon: Calendar },
    { name: "View Payroll", href: "/employee/payroll", icon: FileText },
  ]

  const recentActivity = [
    { action: "Attendance marked", time: "Today, 9:00 AM", status: "success" },
    { action: "Leave request approved", time: "Yesterday", status: "success" },
    { action: "Profile updated", time: "2 days ago", status: "info" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <EmployeeNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Welcome back, {user?.fullName?.split(" ")[0]}!
          </h1>
          <p className="mt-2 text-muted-foreground">Here's what's happening with your workday today.</p>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.name}</CardTitle>
                  <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used features</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <Link key={action.name} href={action.href}>
                    <Button variant="outline" className="w-full justify-start gap-3 h-auto py-3 bg-transparent">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="flex-1 text-left">{action.name}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </Link>
                )
              })}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-full p-1 ${
                        activity.status === "success" ? "bg-green-100" : "bg-blue-100"
                      }`}
                    >
                      {activity.status === "success" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Your schedule for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-xs font-medium text-primary">JAN</span>
                    <span className="text-lg font-bold text-primary">15</span>
                  </div>
                  <div>
                    <p className="font-medium">Team Meeting</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                  </div>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-accent/10">
                    <span className="text-xs font-medium text-accent-foreground">JAN</span>
                    <span className="text-lg font-bold text-accent-foreground">20</span>
                  </div>
                  <div>
                    <p className="font-medium">Performance Review</p>
                    <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                  </div>
                </div>
                <Badge variant="outline">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
