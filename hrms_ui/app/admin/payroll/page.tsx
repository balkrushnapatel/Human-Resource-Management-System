"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, DollarSign, TrendingUp, Users } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminPayrollPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")

  const payrollData = [
    {
      employeeId: "EMP001",
      name: "John Doe",
      department: "Engineering",
      baseSalary: 75000,
      allowances: 5000,
      deductions: 8000,
      netSalary: 72000,
      status: "processed",
    },
    {
      employeeId: "EMP002",
      name: "Sarah Johnson",
      department: "Sales",
      baseSalary: 68000,
      allowances: 4500,
      deductions: 7200,
      netSalary: 65300,
      status: "processed",
    },
    {
      employeeId: "EMP003",
      name: "Michael Chen",
      department: "Engineering",
      baseSalary: 85000,
      allowances: 6000,
      deductions: 9500,
      netSalary: 81500,
      status: "processed",
    },
    {
      employeeId: "EMP004",
      name: "Emily Davis",
      department: "Marketing",
      baseSalary: 62000,
      allowances: 4000,
      deductions: 6800,
      netSalary: 59200,
      status: "pending",
    },
    {
      employeeId: "EMP005",
      name: "Robert Wilson",
      department: "HR",
      baseSalary: 58000,
      allowances: 3500,
      deductions: 6100,
      netSalary: 55400,
      status: "processed",
    },
  ]

  const stats = [
    {
      label: "Total Payroll",
      value: "$1.2M",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      label: "Avg. Salary",
      value: "$68.5K",
      icon: TrendingUp,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      label: "Employees",
      value: "248",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      label: "Pending",
      value: "12",
      icon: DollarSign,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ]

  const totalPayroll = payrollData.reduce((sum, employee) => sum + employee.netSalary, 0)

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payroll Management</h1>
            <p className="mt-2 text-muted-foreground">Manage employee salaries and payroll processing</p>
          </div>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Filters */}
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

        {/* Payroll Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Employee Payroll</CardTitle>
                <CardDescription>Current month salary details</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total This Month</p>
                <p className="text-2xl font-bold text-primary">${totalPayroll.toLocaleString()}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Base Salary</TableHead>
                  <TableHead className="text-right">Allowances</TableHead>
                  <TableHead className="text-right">Deductions</TableHead>
                  <TableHead className="text-right">Net Salary</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payrollData.map((employee) => (
                  <TableRow key={employee.employeeId}>
                    <TableCell className="font-medium">{employee.employeeId}</TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.department}</TableCell>
                    <TableCell className="text-right">${employee.baseSalary.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-green-600">
                      +${employee.allowances.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right text-red-600">-${employee.deductions.toLocaleString()}</TableCell>
                    <TableCell className="text-right font-bold">${employee.netSalary.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge variant={employee.status === "processed" ? "default" : "secondary"}>
                        {employee.status}
                      </Badge>
                    </TableCell>
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
