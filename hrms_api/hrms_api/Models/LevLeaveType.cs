using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class LevLeaveType
{
    public int LeaveTypeId { get; set; }

    public string LeaveName { get; set; } = null!;

    public int MaxDays { get; set; }

    public virtual ICollection<LevLeaveRequest> LevLeaveRequests { get; set; } = new List<LevLeaveRequest>();
}
