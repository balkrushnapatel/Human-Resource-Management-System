"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, role: "employee" | "admin") => Promise<void>
  signup: (data: {
    employeeId: string
    email: string
    password: string
    fullName: string
    role: "employee" | "admin"
  }) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("dayflow_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string, role: "employee" | "admin") => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser: User = {
      id: "1",
      employeeId: "EMP001",
      email,
      fullName: role === "admin" ? "Admin User" : "John Doe",
      role,
      department: "Engineering",
      position: role === "admin" ? "HR Manager" : "Software Engineer",
      phone: "+1 234 567 8900",
      joinDate: "2023-01-15",
    }

    setUser(mockUser)
    localStorage.setItem("dayflow_user", JSON.stringify(mockUser))
  }

  const signup = async (data: {
    employeeId: string
    email: string
    password: string
    fullName: string
    role: "employee" | "admin"
  }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: data.employeeId,
      email: data.email,
      fullName: data.fullName,
      role: data.role,
    }

    setUser(newUser)
    localStorage.setItem("dayflow_user", JSON.stringify(newUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("dayflow_user")
  }

  return <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
