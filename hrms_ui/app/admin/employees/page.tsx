"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Filter, UserPlus } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminEmployeesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterDepartment, setFilterDepartment] = useState("all")

  const employees = [
    {
      id: "EMP001",
      name: "John Doe",
      email: "john.doe@company.com",
      department: "Engineering",
      position: "Software Engineer",
      status: "active",
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      department: "Sales",
      position: "Sales Manager",
      status: "active",
    },
    {
      id: "EMP003",
      name: "Michael Chen",
      email: "michael.c@company.com",
      department: "Engineering",
      position: "Senior Developer",
      status: "active",
    },
    {
      id: "EMP004",
      name: "Emily Davis",
      email: "emily.d@company.com",
      department: "Marketing",
      position: "Marketing Specialist",
      status: "active",
    },
    {
      id: "EMP005",
      name: "Robert Wilson",
      email: "robert.w@company.com",
      department: "HR",
      position: "HR Executive",
      status: "active",
    },
    {
      id: "EMP006",
      name: "Lisa Anderson",
      email: "lisa.a@company.com",
      department: "Engineering",
      position: "DevOps Engineer",
      status: "active",
    },
  ]

  const stats = [
    { label: "Total Employees", value: "248" },
    { label: "Active", value: "234" },
    { label: "On Leave", value: "12" },
    { label: "New This Month", value: "8" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Employee Management</h1>
            <p className="mt-2 text-muted-foreground">Manage employee information and records</p>
          </div>
          <Button className="gap-2">
            <UserPlus className="h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
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
          </CardContent>
        </Card>

        {/* Employee Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {employees.map((employee) => (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{employee.name}</h3>
                      <p className="text-sm text-muted-foreground">{employee.id}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{employee.status}</Badge>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <p className="text-muted-foreground">{employee.position}</p>
                  <p className="text-muted-foreground">{employee.department}</p>
                  <p className="text-muted-foreground">{employee.email}</p>
                </div>

                <Button variant="outline" className="mt-4 w-full bg-transparent">
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
