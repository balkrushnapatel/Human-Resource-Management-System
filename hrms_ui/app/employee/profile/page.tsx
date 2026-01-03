"use client"

import { useState } from "react"
import { EmployeeNav } from "@/components/employee-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { Mail, Phone, MapPin, Calendar, FileText, Edit2 } from "lucide-react"

export default function EmployeeProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: user?.phone || "+1 234 567 8900",
    address: user?.address || "123 Main St, New York, NY 10001",
  })

  const handleSave = () => {
    console.log("Saving profile:", formData)
    setIsEditing(false)
  }

  const profileData = {
    employeeId: user?.employeeId || "EMP001",
    fullName: user?.fullName || "John Doe",
    email: user?.email || "john.doe@company.com",
    phone: user?.phone || "+1 234 567 8900",
    address: user?.address || "123 Main St, New York, NY 10001",
    department: user?.department || "Engineering",
    position: user?.position || "Software Engineer",
    joinDate: user?.joinDate || "Jan 15, 2023",
    reportingTo: "Jane Smith",
    employmentType: "Full-time",
    workLocation: "New York Office",
  }

  const documents = [
    { name: "Employment Contract", type: "PDF", date: "Jan 15, 2023", size: "245 KB" },
    { name: "ID Proof", type: "PDF", date: "Jan 15, 2023", size: "128 KB" },
    { name: "Address Proof", type: "PDF", date: "Jan 15, 2023", size: "156 KB" },
  ]

  return (
    <div className="min-h-screen bg-background">
      <EmployeeNav />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="mt-2 text-muted-foreground">View and manage your personal information</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="lg:col-span-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user?.fullName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-xl font-bold">{profileData.fullName}</h2>
                <p className="text-sm text-muted-foreground">{profileData.position}</p>
                <Badge className="mt-2">{profileData.employeeId}</Badge>

                <div className="mt-6 w-full space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profileData.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{profileData.workLocation}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Joined {profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>Your personal and job information</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  {isEditing ? "Save" : "Edit"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="job">Job Details</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="personal" className="space-y-4 pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="job" className="space-y-4 pt-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Employee ID</Label>
                      <Input value={profileData.employeeId} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Department</Label>
                      <Input value={profileData.department} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input value={profileData.position} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Employment Type</Label>
                      <Input value={profileData.employmentType} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Reporting To</Label>
                      <Input value={profileData.reportingTo} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label>Join Date</Label>
                      <Input value={profileData.joinDate} disabled />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4 pt-4">
                  <div className="space-y-3">
                    {documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-primary/10 p-2">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • {doc.size} • Uploaded {doc.date}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
