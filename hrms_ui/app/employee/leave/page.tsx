"use client"

import { useState } from "react"
import { EmployeeNav } from "@/components/employee-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, CheckCircle2, XCircle, Clock, Plus, Upload } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function EmployeeLeavePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [leaveType, setLeaveType] = useState("paid")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [remarks, setRemarks] = useState("")

  const leaveBalance = {
    paid: 12,
    sick: 8,
    unpaid: 0,
    total: 20,
  }

  const leaveRequests = [
    {
      id: "1",
      name: "John Doe",
      type: "Paid Leave",
      startDate: "2025-01-20",
      endDate: "2025-01-22",
      days: 3,
      status: "pending",
      remarks: "Family vacation",
    },
    {
      id: "2",
      name: "John Doe",
      type: "Sick Leave",
      startDate: "2025-01-05",
      endDate: "2025-01-06",
      days: 2,
      status: "approved",
      remarks: "Medical appointment",
    },
    {
      id: "3",
      name: "John Doe",
      type: "Paid Leave",
      startDate: "2024-12-25",
      endDate: "2024-12-27",
      days: 3,
      status: "approved",
      remarks: "Holiday break",
    },
  ]

  const handleSubmitLeave = () => {
    // Handle leave submission
    console.log({ leaveType, startDate, endDate, remarks })
    setIsDialogOpen(false)
    // Reset form
    setLeaveType("paid")
    setStartDate("")
    setEndDate("")
    setRemarks("")
  }

  return (
    <div className="min-h-screen bg-background">
      <EmployeeNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Time Off</h1>
            <p className="mt-2 text-muted-foreground">Manage your leave requests and balance</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-pink-500 hover:bg-pink-600">
                <Plus className="h-4 w-4" />
                NEW
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Time off Type Request</DialogTitle>
                <DialogDescription className="text-right">
                  <Badge variant="secondary" className="bg-cyan-100 text-cyan-800 hover:bg-cyan-100">Silky Pheasant</Badge>
                  {/* Mock user badge from design */}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Employee</Label>
                  <Input value="[Employee]" disabled className="col-span-3 bg-muted" />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="leaveType" className="text-right">Time off Type</Label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger id="leaveType" className="col-span-3">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid Time Off</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="unpaid">Unpaid Leaves</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Validity Period</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <Input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full"
                    />
                    <span>To</span>
                    <Input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Allocation</Label>
                  <div className="col-span-3 flex items-center gap-2">
                    <span className="font-mono">01.00</span> Days
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right">Attachment</Label>
                  <div className="col-span-3">
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon">
                        <Upload className="h-4 w-4" />
                      </Button>
                      <span className="text-xs text-muted-foreground">(For sick leave certificate)</span>
                    </div>
                  </div>
                </div>

              </div>
              <div className="flex justify-start gap-3">
                <Button onClick={handleSubmitLeave} className="bg-purple-500 hover:bg-purple-600">Submit</Button>
                <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>Discard</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Leave Balance */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-end border-b pb-2 mb-2">
                <span className="text-blue-500 font-medium">Paid Time Off</span>
                <span className="text-blue-500 font-medium">Sick time off</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{leaveBalance.paid} Days Available</span>
                <span>{leaveBalance.sick} Days Available</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Table */}
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Time off Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaveRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">[{request.name}]</TableCell>
                  <TableCell>{request.startDate}</TableCell>
                  <TableCell>{request.endDate}</TableCell>
                  <TableCell className="text-blue-500">{request.type}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        request.status === "approved"
                          ? "default"
                          : request.status === "rejected"
                            ? "destructive"
                            : "secondary"
                      }
                      className={
                        request.status === "approved" ? "bg-green-500 hover:bg-green-600" :
                          request.status === "rejected" ? "bg-red-500 hover:bg-red-600" :
                            "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }
                    >
                      {/* Status box as simple colored rect/badge */}
                      <span className="sr-only">{request.status}</span>
                      <div className="h-2 w-8" />
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
