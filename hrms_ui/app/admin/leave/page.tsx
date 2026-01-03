"use client"

import { useState } from "react"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check, X, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [reviewComments, setReviewComments] = useState("")

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      startDate: "28/10/2025",
      endDate: "28/10/2025",
      type: "Paid time Off",
      status: "pending",
    },
    {
      id: "2",
      name: "Michael Chen",
      startDate: "15/11/2025",
      endDate: "18/11/2025",
      type: "Sick time off",
      status: "approved",
    },
    {
      id: "3",
      name: "Emily Davis",
      startDate: "01/12/2025",
      endDate: "05/12/2025",
      type: "Paid time Off",
      status: "rejected",
    },
    {
      id: "4",
      name: "Sarah Johnson",
      startDate: "28/10/2025",
      endDate: "28/10/2025",
      type: "Paid time Off",
      status: "pending",
    }
  ])

  const handleApprove = (request: any) => {
    setSelectedRequest({ ...request, action: "approve" })
  }

  const handleReject = (request: any) => {
    setSelectedRequest({ ...request, action: "reject" })
  }

  const handleSubmitReview = () => {
    // Mock update logic
    setLeaveRequests(prev => prev.map(req =>
      req.id === selectedRequest.id
        ? { ...req, status: selectedRequest.action === "approve" ? "approved" : "rejected" }
        : req
    ))
    setSelectedRequest(null)
    setReviewComments("")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Searchbar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-red-500" /> {/* Mock User Avatar from design */}
          </div>
        </div>

        <Tabs defaultValue="time-off" className="w-full">
          <TabsList className="bg-transparent border-b w-full justify-start rounded-none h-auto p-0 mb-6">
            <TabsTrigger
              value="time-off"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2"
            >
              Time Off
            </TabsTrigger>
            <TabsTrigger
              value="allocation"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-2"
            >
              Allocation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="time-off">
            {/* Leave Balance Header Mock */}
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              <Card className="bg-transparent shadow-none border-none">
                <CardContent className="p-0">
                  <div className="flex justify-between items-end border-b pb-2 mb-2">
                    <span className="text-blue-500 font-medium text-lg">Paid time Off</span>
                    <span className="text-blue-500 font-medium text-lg">Sick time off</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>24 Days Available</span>
                    <span>09 Days Available</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="rounded-md border bg-card">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Time off Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-[100px]"></TableHead>
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
                        <div className="flex gap-2">
                          {/* Status Indicator Blocks */}
                          <div className={`h-4 w-6 rounded-sm ${request.status === 'approved' ? 'bg-green-500' : 'bg-gray-200'}`} />
                          <div className={`h-4 w-6 rounded-sm ${request.status === 'rejected' ? 'bg-red-500' : 'bg-gray-200'}`} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            className="h-6 w-6 bg-red-500 hover:bg-red-600 rounded-sm"
                            onClick={() => handleReject(request)}
                          >
                            <X className="h-3 w-3 text-white" />
                          </Button>
                          <Button
                            size="icon"
                            className="h-6 w-6 bg-green-500 hover:bg-green-600 rounded-sm"
                            onClick={() => handleApprove(request)}
                          >
                            <Check className="h-3 w-3 text-white" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* Empty rows to match design height if needed */}
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={`empty-${i}`} className="h-12 hover:bg-transparent">
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{selectedRequest?.action === "approve" ? "Approve" : "Reject"} Leave Request</DialogTitle>
                  <DialogDescription>
                    {selectedRequest?.name} - {selectedRequest?.type}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
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

          </TabsContent>

          <TabsContent value="allocation">
            <div className="p-8 text-center text-muted-foreground">
              Allocation content goes here.
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
