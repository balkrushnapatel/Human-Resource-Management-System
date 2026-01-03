using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class LevLeaveRequest
{
    public int LeaveRequestId { get; set; }

    public int EmployeeId { get; set; }

    public int LeaveTypeId { get; set; }

    public DateOnly FromDate { get; set; }

    public DateOnly ToDate { get; set; }

    public string? Reason { get; set; }

    public string? Status { get; set; }

    public DateOnly? AppliedOn { get; set; }

    public int? ApprovedBy { get; set; }

    public virtual UsrUser? ApprovedByNavigation { get; set; }

    public virtual EmpEmployee Employee { get; set; } = null!;

    public virtual LevLeaveType LeaveType { get; set; } = null!;
}
