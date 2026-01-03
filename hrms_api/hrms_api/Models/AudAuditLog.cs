using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class AudAuditLog
{
    public int LogId { get; set; }

    public int UserId { get; set; }

    public string Action { get; set; } = null!;

    public DateTime? ActionTime { get; set; }

    public virtual UsrUser User { get; set; } = null!;
}
