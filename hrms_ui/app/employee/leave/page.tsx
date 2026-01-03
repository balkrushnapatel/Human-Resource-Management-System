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
import { Calendar, CheckCircle2, XCircle, Clock, Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
      type: "Paid Leave",
      startDate: "Jan 20, 2025",
      endDate: "Jan 22, 2025",
      days: 3,
      status: "pending",
      remarks: "Family vacation",
      submittedDate: "Jan 10, 2025",
    },
    {
      id: "2",
      type: "Sick Leave",
      startDate: "Jan 5, 2025",
      endDate: "Jan 6, 2025",
      days: 2,
      status: "approved",
      remarks: "Medical appointment",
      submittedDate: "Jan 3, 2025",
      reviewedBy: "HR Manager",
    },
    {
      id: "3",
      type: "Paid Leave",
      startDate: "Dec 25, 2024",
      endDate: "Dec 27, 2024",
      days: 3,
      status: "approved",
      remarks: "Holiday break",
      submittedDate: "Dec 15, 2024",
      reviewedBy: "HR Manager",
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
            <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
            <p className="mt-2 text-muted-foreground">Apply for time off and track your leave requests</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Apply for Leave
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
                <DialogDescription>Submit a new leave request for approval</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="leaveType">Leave Type</Label>
                  <Select value={leaveType} onValueChange={setLeaveType}>
                    <SelectTrigger id="leaveType">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="paid">Paid Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="unpaid">Unpaid Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Textarea
                    id="remarks"
                    placeholder="Reason for leave..."
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitLeave}>Submit Request</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Leave Balance */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paid Leave</p>
                  <p className="mt-2 text-3xl font-bold text-blue-600">{leaveBalance.paid}</p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Sick Leave</p>
                  <p className="mt-2 text-3xl font-bold text-amber-600">{leaveBalance.sick}</p>
                </div>
                <div className="rounded-lg bg-amber-50 p-3">
                  <Calendar className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unpaid Leave</p>
                  <p className="mt-2 text-3xl font-bold text-purple-600">{leaveBalance.unpaid}</p>
                </div>
                <div className="rounded-lg bg-purple-50 p-3">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Available</p>
                  <p className="mt-2 text-3xl font-bold text-green-600">{leaveBalance.total}</p>
                </div>
                <div className="rounded-lg bg-green-50 p-3">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Your submitted leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-start">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{request.type}</h3>
                          <Badge
                            variant={
                              request.status === "approved"
                                ? "default"
                                : request.status === "rejected"
                                  ? "destructive"
                                  : "secondary"
                            }
                            className="gap-1"
                          >
                            {request.status === "approved" && <CheckCircle2 className="h-3 w-3" />}
                            {request.status === "rejected" && <XCircle className="h-3 w-3" />}
                            {request.status === "pending" && <Clock className="h-3 w-3" />}
                            {request.status}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {request.startDate} - {request.endDate} ({request.days} days)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Remarks:</span> {request.remarks}
                      </p>
                      <p className="text-sm text-muted-foreground">Submitted on {request.submittedDate}</p>
                      {request.reviewedBy && (
                        <p className="text-sm text-muted-foreground">Reviewed by {request.reviewedBy}</p>
                      )}
                    </div>
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
