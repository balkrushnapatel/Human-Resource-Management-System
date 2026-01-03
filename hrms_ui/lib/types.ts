export type UserRole = "employee" | "admin"

export interface User {
  id: string
  employeeId: string
  email: string
  fullName: string
  role: UserRole
  profilePicture?: string
  department?: string
  position?: string
  phone?: string
  address?: string
  joinDate?: string
}

export interface AttendanceRecord {
  id: string
  employeeId: string
  date: string
  status: "present" | "absent" | "half-day" | "leave"
  checkIn?: string
  checkOut?: string
}

export interface LeaveRequest {
  id: string
  employeeId: string
  employeeName: string
  leaveType: "paid" | "sick" | "unpaid"
  startDate: string
  endDate: string
  remarks: string
  status: "pending" | "approved" | "rejected"
  submittedDate: string
  reviewedBy?: string
  reviewComments?: string
}

export interface PayrollInfo {
  employeeId: string
  baseSalary: number
  allowances: number
  deductions: number
  netSalary: number
  currency: string
}
