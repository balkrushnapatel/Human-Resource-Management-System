"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AttendanceRecord {
    date: string
    status: "present" | "absent" | "leave"
    checkIn: string
    checkOut: string
    hours: string
}

interface AttendanceContextType {
    isCheckedIn: boolean
    checkInTime: string | null
    history: AttendanceRecord[]
    checkIn: () => void
    checkOut: () => void
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined)

export function AttendanceProvider({ children }: { children: ReactNode }) {
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [checkInTime, setCheckInTime] = useState<string | null>(null)
    const [history, setHistory] = useState<AttendanceRecord[]>([])

    // Load state from localStorage on mount
    useEffect(() => {
        const storedStatus = localStorage.getItem("attendance_status")
        const storedTime = localStorage.getItem("attendance_time")
        const storedHistory = localStorage.getItem("attendance_history")

        if (storedStatus === "true") {
            setIsCheckedIn(true)
        }
        if (storedTime) {
            setCheckInTime(storedTime)
        }
        if (storedHistory) {
            setHistory(JSON.parse(storedHistory))
        }
    }, [])

    const checkIn = () => {
        const now = new Date()
        const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        setIsCheckedIn(true)
        setCheckInTime(timeString)

        localStorage.setItem("attendance_status", "true")
        localStorage.setItem("attendance_time", timeString)
    }

    const checkOut = () => {
        const now = new Date()
        const checkOutString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        const dateString = now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

        // Calculate hours (simplified)
        let hoursWorked = "-"
        if (checkInTime) {
            // This is a very rough calculation assuming same day
            // ideally we'd store full ISO strings for calculation
            hoursWorked = "9h" // Mock duration for demo
        }

        const newRecord: AttendanceRecord = {
            date: dateString,
            status: "present",
            checkIn: checkInTime || "-",
            checkOut: checkOutString,
            hours: hoursWorked
        }

        const newHistory = [newRecord, ...history]
        setHistory(newHistory)
        localStorage.setItem("attendance_history", JSON.stringify(newHistory))

        setIsCheckedIn(false)
        setCheckInTime(null)

        localStorage.removeItem("attendance_status")
        localStorage.removeItem("attendance_time")
    }

    return (
        <AttendanceContext.Provider value={{ isCheckedIn, checkInTime, history, checkIn, checkOut }}>
            {children}
        </AttendanceContext.Provider>
    )
}

export function useAttendance() {
    const context = useContext(AttendanceContext)
    if (context === undefined) {
        throw new Error("useAttendance must be used within an AttendanceProvider")
    }
    return context
}
