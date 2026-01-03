"use client"

import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Clock,
  Calendar,
  TrendingUp,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const stats = [
    {
      name: "Total Employees",
      value: "248",
      change: "+12",
      changeType: "increase",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      name: "Present Today",
      value: "234",
      change: "94.4%",
      changeType: "increase",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      name: "On Leave",
      value: "12",
      change: "4.8%",
      changeType: "neutral",
      icon: Calendar,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      name: "Pending Approvals",
      value: "8",
      change: "-2 from yesterday",
      changeType: "decrease",
      icon: AlertCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  const pendingLeaveRequests = [
    {
      id: "1",
      employee: "Sarah Johnson",
      employeeId: "EMP234",
      leaveType: "Paid Leave",
      dates: "Jan 20 - Jan 22",
      days: "3 days",
      status: "pending",
    },
    {
      id: "2",
      employee: "Michael Chen",
      employeeId: "EMP145",
      leaveType: "Sick Leave",
      dates: "Jan 18 - Jan 19",
      days: "2 days",
      status: "pending",
    },
    {
      id: "3",
      employee: "Emily Davis",
      employeeId: "EMP089",
      leaveType: "Unpaid Leave",
      dates: "Feb 1 - Feb 5",
      days: "5 days",
      status: "pending",
    },
  ]

  const recentActivity = [
    { action: "John Doe marked attendance", time: "5 minutes ago", type: "attendance" },
    { action: "Leave request approved for Sarah Johnson", time: "1 hour ago", type: "leave" },
    { action: "New employee added: Mike Wilson", time: "2 hours ago", type: "employee" },
    { action: "Payroll processed for December", time: "1 day ago", type: "payroll" },
  ]

  const departmentStats = [
    { name: "Engineering", total: 85, present: 82, absent: 3 },
    { name: "Sales", total: 52, present: 48, absent: 4 },
    { name: "Marketing", total: 38, present: 37, absent: 1 },
    { name: "HR", total: 25, present: 25, absent: 0 },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 text-muted-foreground">Monitor and manage your workforce</p>
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
                  <div className="mt-1 flex items-center gap-1 text-xs">
                    {stat.changeType === "increase" && <ArrowUpRight className="h-3 w-3 text-green-600" />}
                    {stat.changeType === "decrease" && <ArrowDownRight className="h-3 w-3 text-red-600" />}
                    <span
                      className={
                        stat.changeType === "increase"
                          ? "text-green-600"
                          : stat.changeType === "decrease"
                            ? "text-red-600"
                            : "text-muted-foreground"
                      }
                    >
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Pending Leave Requests */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Pending Leave Requests</CardTitle>
                  <CardDescription>Requires your approval</CardDescription>
                </div>
                <Link href="/admin/leave">
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingLeaveRequests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{request.employee}</p>
                        <span className="text-xs text-muted-foreground">({request.employeeId})</span>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {request.leaveType} • {request.dates}
                      </p>
                      <Badge variant="outline" className="mt-2">
                        {request.days}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="text-green-600 border-green-600 bg-transparent">
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 border-red-600 bg-transparent">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 rounded-full p-1.5 ${
                        activity.type === "attendance"
                          ? "bg-blue-100"
                          : activity.type === "leave"
                            ? "bg-green-100"
                            : activity.type === "employee"
                              ? "bg-purple-100"
                              : "bg-amber-100"
                      }`}
                    >
                      {activity.type === "attendance" && <Clock className="h-3 w-3 text-blue-600" />}
                      {activity.type === "leave" && <Calendar className="h-3 w-3 text-green-600" />}
                      {activity.type === "employee" && <Users className="h-3 w-3 text-purple-600" />}
                      {activity.type === "payroll" && <TrendingUp className="h-3 w-3 text-amber-600" />}
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

        {/* Department Overview */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Attendance breakdown by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{dept.name}</span>
                    <span className="text-muted-foreground">
                      {dept.present} / {dept.total} present
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(dept.present / dept.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
