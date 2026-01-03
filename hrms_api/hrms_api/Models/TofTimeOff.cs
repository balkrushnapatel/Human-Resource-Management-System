using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class TofTimeOff
{
    public int TimeOffId { get; set; }

    public int EmployeeId { get; set; }

    public DateOnly TimeOffDate { get; set; }

    public string? Reason { get; set; }

    public string? Status { get; set; }

    public virtual EmpEmployee Employee { get; set; } = null!;
}
