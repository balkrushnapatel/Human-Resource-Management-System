using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class UsrUser
{
    public int UserId { get; set; }

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public int RoleId { get; set; }

    public bool? IsActive { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<AprApproval> AprApprovals { get; set; } = new List<AprApproval>();

    public virtual ICollection<AttAttendance> AttAttendances { get; set; } = new List<AttAttendance>();

    public virtual ICollection<AudAuditLog> AudAuditLogs { get; set; } = new List<AudAuditLog>();

    public virtual EmpEmployee? EmpEmployee { get; set; }

    public virtual ICollection<LevLeaveRequest> LevLeaveRequests { get; set; } = new List<LevLeaveRequest>();

    public virtual RolRole Role { get; set; } = null!;
}
