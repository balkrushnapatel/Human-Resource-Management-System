"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface LeaveRequest {
    id: string
    name: string
    type: string
    startDate: string
    endDate: string
    days: number
    status: "pending" | "approved" | "rejected"
    remarks?: string
}

interface LeaveContextType {
    leaveRequests: LeaveRequest[]
    addRequest: (request: Omit<LeaveRequest, "id" | "status">) => void
    updateStatus: (id: string, status: "approved" | "rejected") => void
}

const LeaveContext = createContext<LeaveContextType | undefined>(undefined)

export function LeaveProvider({ children }: { children: ReactNode }) {
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
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
    ])

    // Load from local storage on mount
    useEffect(() => {
        const storedRequests = localStorage.getItem("leave_requests")
        if (storedRequests) {
            setLeaveRequests(JSON.parse(storedRequests))
        }
    }, [])

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem("leave_requests", JSON.stringify(leaveRequests))
    }, [leaveRequests])

    const addRequest = (request: Omit<LeaveRequest, "id" | "status">) => {
        const newRequest: LeaveRequest = {
            ...request,
            id: Math.random().toString(36).substr(2, 9),
            status: "pending",
        }
        setLeaveRequests((prev) => [newRequest, ...prev])
    }

    const updateStatus = (id: string, status: "approved" | "rejected") => {
        setLeaveRequests((prev) =>
            prev.map((req) => (req.id === id ? { ...req, status } : req))
        )
    }

    return (
        <LeaveContext.Provider value={{ leaveRequests, addRequest, updateStatus }}>
            {children}
        </LeaveContext.Provider>
    )
}

export function useLeave() {
    const context = useContext(LeaveContext)
    if (context === undefined) {
        throw new Error("useLeave must be used within a LeaveProvider")
    }
    return context
}
