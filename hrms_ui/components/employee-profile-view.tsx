"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Calendar, Briefcase, Building } from "lucide-react"

interface EmployeeProfileViewProps {
    employee: any
}

export function EmployeeProfileView({ employee }: EmployeeProfileViewProps) {
    if (!employee) return null

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                        {employee.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")}
                    </AvatarFallback>
                </Avatar>
                <h2 className="mt-4 text-2xl font-bold">{employee.name}</h2>
                <p className="text-muted-foreground">{employee.position}</p>
                <div className="mt-2 flex gap-2">
                    <Badge variant={employee.status === "active" ? "default" : "secondary"}>
                        {employee.status}
                    </Badge>
                    <Badge variant="outline">{employee.department}</Badge>
                </div>
            </div>

            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="details">Contact Details</TabsTrigger>
                    <TabsTrigger value="job">Job Information</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="pt-4 space-y-4">
                    <div className="grid gap-4">
                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <div className="rounded-md bg-primary/10 p-2">
                                <Mail className="h-4 w-4 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm text-muted-foreground">Email Address</p>
                                <p className="font-medium">{employee.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <div className="rounded-md bg-primary/10 p-2">
                                <Phone className="h-4 w-4 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm text-muted-foreground">Phone Number</p>
                                <p className="font-medium">{employee.phone || "Not provided"}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-lg border p-3">
                            <div className="rounded-md bg-primary/10 p-2">
                                <MapPin className="h-4 w-4 text-primary" />
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm text-muted-foreground">Location</p>
                                <p className="font-medium">{employee.workLocation || "Main Office"}</p>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="job" className="pt-4 space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Employee ID</p>
                            <p className="font-medium">{employee.id}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Department</p>
                            <p className="font-medium">{employee.department}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Position</p>
                            <p className="font-medium">{employee.position}</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Join Date</p>
                            <p className="font-medium">{employee.joinDate || "Jan 1, 2023"}</p>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
