"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, XCircle, Search, Download, Filter } from "lucide-react"

export default function AdminAttendancePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")

  // Mock employee attendance data
  const employees = [
    {
      id: "EMP001",
      name: "John Doe",
      department: "Engineering",
      status: "present",
      checkIn: "9:00 AM",
      checkOut: "6:00 PM",
      hours: "9h",
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      department: "Sales",
      status: "present",
      checkIn: "8:45 AM",
      checkOut: "5:30 PM",
      hours: "8h 45m",
    },
    {
      id: "EMP003",
      name: "Michael Chen",
      department: "Engineering",
      status: "leave",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      department: "Marketing",
      status: "present",
      checkIn: "9:15 AM",
      checkOut: "6:15 PM",
      hours: "9h",
    },
    {
      id: "EMP005",
      name: "Robert Wilson",
      department: "HR",
      status: "absent",
      checkIn: "-",
      checkOut: "-",
      hours: "-",
    },
    {
      id: "EMP006",
      name: "Lisa Anderson",
      department: "Engineering",
      status: "present",
      checkIn: "8:30 AM",
      checkOut: "5:45 PM",
      hours: "9h 15m",
    },
  ]

  const stats = [
    { label: "Total Employees", value: "248", color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Present Today", value: "234", color: "text-green-600", bgColor: "bg-green-50" },
    { label: "On Leave", value: "12", color: "text-amber-600", bgColor: "bg-amber-50" },
    { label: "Absent", value: "2", color: "text-red-600", bgColor: "bg-red-50" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Attendance Management</h1>
            <p className="mt-2 text-muted-foreground">Monitor employee attendance across the organization</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                    <div className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Departments</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="sales">Sales</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="hr">HR</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>Real-time attendance tracking for all employees</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell className="font-medium">{employee.id}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          employee.status === "present"
                            ? "default"
                            : employee.status === "leave"
                              ? "secondary"
                              : "destructive"
                        }
                        className="gap-1"
                      >
                        {employee.status === "present" ? (
                          <CheckCircle2 className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {employee.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{employee.checkIn}</TableCell>
                    <TableCell>{employee.checkOut}</TableCell>
                    <TableCell className="font-medium">{employee.hours}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
