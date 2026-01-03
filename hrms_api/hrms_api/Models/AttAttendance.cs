using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class AttAttendance
{
    public int AttendanceId { get; set; }

    public int EmployeeId { get; set; }

    public DateOnly AttendanceDate { get; set; }

    public TimeOnly? CheckIn { get; set; }

    public TimeOnly? CheckOut { get; set; }

    public string? Status { get; set; }

    public int MarkedBy { get; set; }

    public virtual EmpEmployee Employee { get; set; } = null!;

    public virtual UsrUser MarkedByNavigation { get; set; } = null!;
}
