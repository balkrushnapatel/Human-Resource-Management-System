"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, XCircle, Clock, Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function AdminLeavePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [reviewComments, setReviewComments] = useState("")

  const leaveRequests = [
    {
      id: "1",
      employeeId: "EMP234",
      employeeName: "Sarah Johnson",
      department: "Sales",
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
      employeeId: "EMP145",
      employeeName: "Michael Chen",
      department: "Engineering",
      type: "Sick Leave",
      startDate: "Jan 18, 2025",
      endDate: "Jan 19, 2025",
      days: 2,
      status: "pending",
      remarks: "Medical checkup",
      submittedDate: "Jan 15, 2025",
    },
    {
      id: "3",
      employeeId: "EMP089",
      employeeName: "Emily Davis",
      department: "Marketing",
      type: "Unpaid Leave",
      startDate: "Feb 1, 2025",
      endDate: "Feb 5, 2025",
      days: 5,
      status: "pending",
      remarks: "Personal reasons",
      submittedDate: "Jan 12, 2025",
    },
    {
      id: "4",
      employeeId: "EMP067",
      employeeName: "John Doe",
      department: "Engineering",
      type: "Paid Leave",
      startDate: "Jan 5, 2025",
      endDate: "Jan 6, 2025",
      days: 2,
      status: "approved",
      remarks: "Family event",
      submittedDate: "Jan 1, 2025",
      reviewedBy: "HR Manager",
      reviewComments: "Approved",
    },
  ]

  const stats = [
    { label: "Total Requests", value: "45", color: "text-blue-600", bgColor: "bg-blue-50" },
    { label: "Pending", value: "8", color: "text-amber-600", bgColor: "bg-amber-50" },
    { label: "Approved", value: "32", color: "text-green-600", bgColor: "bg-green-50" },
    { label: "Rejected", value: "5", color: "text-red-600", bgColor: "bg-red-50" },
  ]

  const handleApprove = (request: any) => {
    setSelectedRequest({ ...request, action: "approve" })
  }

  const handleReject = (request: any) => {
    setSelectedRequest({ ...request, action: "reject" })
  }

  const handleSubmitReview = () => {
    console.log("Review submitted:", {
      requestId: selectedRequest.id,
      action: selectedRequest.action,
      comments: reviewComments,
    })
    setSelectedRequest(null)
    setReviewComments("")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Leave Management</h1>
          <p className="mt-2 text-muted-foreground">Review and approve employee leave requests</p>
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

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by employee name or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Review and manage employee leave applications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{request.employeeName}</h3>
                      <span className="text-sm text-muted-foreground">({request.employeeId})</span>
                      <Badge variant="outline">{request.department}</Badge>
                    </div>

                    <div className="grid gap-2 text-sm sm:grid-cols-2">
                      <div>
                        <span className="text-muted-foreground">Leave Type:</span> {request.type}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Duration:</span> {request.days} days
                      </div>
                      <div>
                        <span className="text-muted-foreground">Dates:</span> {request.startDate} - {request.endDate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Submitted:</span> {request.submittedDate}
                      </div>
                    </div>

                    <p className="text-sm">
                      <span className="font-medium">Remarks:</span> {request.remarks}
                    </p>

                    {request.status !== "pending" && request.reviewComments && (
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium">Review:</span> {request.reviewComments}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 sm:flex-col">
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

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(request)}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(request)}
                          className="text-red-600 border-red-600 bg-transparent hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Review Dialog */}
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedRequest?.action === "approve" ? "Approve" : "Reject"} Leave Request</DialogTitle>
              <DialogDescription>
                {selectedRequest?.employeeName} - {selectedRequest?.type}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Request Details</Label>
                <div className="rounded-lg border p-3 text-sm space-y-1">
                  <p>
                    <span className="font-medium">Duration:</span> {selectedRequest?.startDate} -{" "}
                    {selectedRequest?.endDate}
                  </p>
                  <p>
                    <span className="font-medium">Days:</span> {selectedRequest?.days}
                  </p>
                  <p>
                    <span className="font-medium">Reason:</span> {selectedRequest?.remarks}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reviewComments">Comments (Optional)</Label>
                <Textarea
                  id="reviewComments"
                  placeholder="Add your comments..."
                  value={reviewComments}
                  onChange={(e) => setReviewComments(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedRequest(null)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitReview}
                className={selectedRequest?.action === "approve" ? "bg-green-600 hover:bg-green-700" : ""}
                variant={selectedRequest?.action === "reject" ? "destructive" : "default"}
              >
                {selectedRequest?.action === "approve" ? "Approve" : "Reject"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
