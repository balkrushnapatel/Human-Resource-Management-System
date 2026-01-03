"use client"

import { useState } from "react"
import { EmployeeNav } from "@/components/employee-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { CheckCircle2, XCircle, Clock, CalendarIcon } from "lucide-react"

export default function EmployeeAttendancePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null)

  const handleCheckIn = () => {
    const now = new Date()
    setCheckInTime(now.toLocaleTimeString())
    setIsCheckedIn(true)
  }

  const handleCheckOut = () => {
    const now = new Date()
    setCheckOutTime(now.toLocaleTimeString())
  }

  // Mock attendance data
  const attendanceRecords = [
    { date: "Jan 15, 2025", status: "present", checkIn: "9:00 AM", checkOut: "6:00 PM", hours: "9h" },
    { date: "Jan 14, 2025", status: "present", checkIn: "8:45 AM", checkOut: "5:30 PM", hours: "8h 45m" },
    { date: "Jan 13, 2025", status: "present", checkIn: "9:15 AM", checkOut: "6:15 PM", hours: "9h" },
    { date: "Jan 12, 2025", status: "leave", checkIn: "-", checkOut: "-", hours: "-" },
    { date: "Jan 11, 2025", status: "present", checkIn: "8:30 AM", checkOut: "5:45 PM", hours: "9h 15m" },
    { date: "Jan 10, 2025", status: "present", checkIn: "9:00 AM", checkOut: "6:00 PM", hours: "9h" },
  ]

  const stats = {
    presentDays: 22,
    absentDays: 2,
    leaveDays: 1,
    totalWorkingDays: 25,
  }

  return (
    <div className="min-h-screen bg-background">
      <EmployeeNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
          <p className="mt-2 text-muted-foreground">Track your daily attendance and work hours</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Check In/Out Card */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Attendance</CardTitle>
                <CardDescription>Mark your check-in and check-out time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Check In</p>
                    <div className="flex items-center gap-2">
                      {checkInTime ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <span className="text-2xl font-bold">{checkInTime}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-muted-foreground">--:--</span>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Check Out</p>
                    <div className="flex items-center gap-2">
                      {checkOutTime ? (
                        <>
                          <Clock className="h-5 w-5 text-blue-600" />
                          <span className="text-2xl font-bold">{checkOutTime}</span>
                        </>
                      ) : (
                        <span className="text-2xl font-bold text-muted-foreground">--:--</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  {!isCheckedIn ? (
                    <Button onClick={handleCheckIn} className="flex-1">
                      Check In
                    </Button>
                  ) : !checkOutTime ? (
                    <Button onClick={handleCheckOut} variant="outline" className="flex-1 bg-transparent">
                      Check Out
                    </Button>
                  ) : (
                    <Button disabled className="flex-1">
                      Attendance Marked
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Stats */}
            <Card>
              <CardHeader>
                <CardTitle>This Month's Summary</CardTitle>
                <CardDescription>January 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-4">
                  <div className="rounded-lg border bg-green-50 p-4">
                    <p className="text-sm text-muted-foreground">Present</p>
                    <p className="mt-1 text-2xl font-bold text-green-600">{stats.presentDays}</p>
                  </div>
                  <div className="rounded-lg border bg-red-50 p-4">
                    <p className="text-sm text-muted-foreground">Absent</p>
                    <p className="mt-1 text-2xl font-bold text-red-600">{stats.absentDays}</p>
                  </div>
                  <div className="rounded-lg border bg-blue-50 p-4">
                    <p className="text-sm text-muted-foreground">Leave</p>
                    <p className="mt-1 text-2xl font-bold text-blue-600">{stats.leaveDays}</p>
                  </div>
                  <div className="rounded-lg border bg-purple-50 p-4">
                    <p className="text-sm text-muted-foreground">Total Days</p>
                    <p className="mt-1 text-2xl font-bold text-purple-600">{stats.totalWorkingDays}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance History */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance History</CardTitle>
                <CardDescription>Your recent attendance records</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {attendanceRecords.map((record, index) => (
                    <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`rounded-lg p-2 ${
                            record.status === "present"
                              ? "bg-green-50"
                              : record.status === "leave"
                                ? "bg-blue-50"
                                : "bg-red-50"
                          }`}
                        >
                          {record.status === "present" ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : record.status === "leave" ? (
                            <CalendarIcon className="h-5 w-5 text-blue-600" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{record.date}</p>
                          <p className="text-sm text-muted-foreground">
                            {record.checkIn} - {record.checkOut}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            record.status === "present"
                              ? "default"
                              : record.status === "leave"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {record.status}
                        </Badge>
                        <p className="mt-1 text-sm text-muted-foreground">{record.hours}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Calendar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View attendance by date</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Attendance Rate</CardTitle>
                <CardDescription>This month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">88%</div>
                    <p className="mt-1 text-sm text-muted-foreground">Overall attendance</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">22/25 days</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                      <div className="h-full bg-primary transition-all" style={{ width: "88%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
