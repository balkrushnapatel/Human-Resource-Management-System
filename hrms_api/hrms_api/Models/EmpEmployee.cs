using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class EmpEmployee
{
    public int EmployeeId { get; set; }

    public int UserId { get; set; }

    public string EmployeeCode { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public string? Gender { get; set; }

    public DateOnly? DateOfBirth { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }

    public int DepartmentId { get; set; }

    public int DesignationId { get; set; }

    public DateOnly? JoiningDate { get; set; }

    public string? ProfilePhoto { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<AttAttendance> AttAttendances { get; set; } = new List<AttAttendance>();

    public virtual DepDepartment Department { get; set; } = null!;

    public virtual DesDesignation Designation { get; set; } = null!;

    public virtual ICollection<LevLeaveRequest> LevLeaveRequests { get; set; } = new List<LevLeaveRequest>();

    public virtual ICollection<PrjAssignment> PrjAssignments { get; set; } = new List<PrjAssignment>();

    public virtual ICollection<SalSalaryPayment> SalSalaryPayments { get; set; } = new List<SalSalaryPayment>();

    public virtual SalSalaryStructure? SalSalaryStructure { get; set; }

    public virtual ICollection<TofTimeOff> TofTimeOffs { get; set; } = new List<TofTimeOff>();

    public virtual ICollection<TskTask> TskTasks { get; set; } = new List<TskTask>();

    public virtual UsrUser User { get; set; } = null!;
}
