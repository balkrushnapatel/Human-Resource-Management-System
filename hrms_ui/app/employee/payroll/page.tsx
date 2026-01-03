"use client"

import { EmployeeNav } from "@/components/employee-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, DollarSign, TrendingUp } from "lucide-react"

export default function EmployeePayrollPage() {
  const currentSalary = {
    baseSalary: 75000,
    allowances: 5000,
    deductions: 8000,
    netSalary: 72000,
    currency: "USD",
  }

  const salaryBreakdown = [
    { label: "Base Salary", amount: 75000, type: "earning" },
    { label: "Housing Allowance", amount: 3000, type: "earning" },
    { label: "Transport Allowance", amount: 2000, type: "earning" },
    { label: "Tax", amount: -6000, type: "deduction" },
    { label: "Insurance", amount: -2000, type: "deduction" },
  ]

  const payrollHistory = [
    { month: "December 2024", netPay: 72000, status: "paid", date: "Dec 31, 2024" },
    { month: "November 2024", netPay: 72000, status: "paid", date: "Nov 30, 2024" },
    { month: "October 2024", netPay: 72000, status: "paid", date: "Oct 31, 2024" },
    { month: "September 2024", netPay: 72000, status: "paid", date: "Sep 30, 2024" },
    { month: "August 2024", netPay: 72000, status: "paid", date: "Aug 31, 2024" },
  ]

  const ytdSummary = {
    totalEarnings: 900000,
    totalDeductions: 96000,
    netPay: 804000,
    taxPaid: 72000,
  }

  return (
    <div className="min-h-screen bg-background">
      <EmployeeNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Payroll</h1>
          <p className="mt-2 text-muted-foreground">View your salary details and payment history</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Current Salary Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Salary</CardTitle>
                  <CardDescription>January 2025</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  Download Slip
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Net Salary */}
                <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6">
                  <p className="text-sm text-muted-foreground">Net Salary</p>
                  <p className="mt-2 text-4xl font-bold text-primary">${currentSalary.netSalary.toLocaleString()}</p>
                  <p className="mt-1 text-sm text-muted-foreground">per month</p>
                </div>

                {/* Salary Breakdown */}
                <div className="space-y-3">
                  <h3 className="font-semibold">Salary Breakdown</h3>
                  {salaryBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground">{item.label}</span>
                      <span className={`font-medium ${item.type === "deduction" ? "text-red-600" : ""}`}>
                        {item.amount >= 0 ? "+" : ""}${Math.abs(item.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Net Salary</span>
                      <span className="text-lg font-bold text-primary">
                        ${currentSalary.netSalary.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* YTD Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Year-to-Date Summary</CardTitle>
              <CardDescription>2024 Financial Year</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg border bg-green-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-green-100 p-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Total Earnings</p>
                      <p className="text-lg font-bold text-green-600">${ytdSummary.totalEarnings.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-red-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-red-100 p-2">
                      <DollarSign className="h-4 w-4 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Total Deductions</p>
                      <p className="text-lg font-bold text-red-600">${ytdSummary.totalDeductions.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-blue-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-blue-100 p-2">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Net Pay</p>
                      <p className="text-lg font-bold text-blue-600">${ytdSummary.netPay.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border bg-amber-50 p-4">
                  <div className="flex items-center gap-2">
                    <div className="rounded-lg bg-amber-100 p-2">
                      <FileText className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">Tax Paid</p>
                      <p className="text-lg font-bold text-amber-600">${ytdSummary.taxPaid.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment History */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>Your past salary payments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {payrollHistory.map((payment, index) => (
                <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-primary/10 p-3">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.month}</p>
                      <p className="text-sm text-muted-foreground">Paid on {payment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-bold">${payment.netPay.toLocaleString()}</p>
                      <Badge variant="outline" className="mt-1">
                        {payment.status}
                      </Badge>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
