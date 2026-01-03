using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class AprApproval
{
    public int ApprovalId { get; set; }

    public string RequestType { get; set; } = null!;

    public int RequestId { get; set; }

    public int ApprovedBy { get; set; }

    public string Status { get; set; } = null!;

    public DateOnly? ApprovedOn { get; set; }

    public virtual UsrUser ApprovedByNavigation { get; set; } = null!;
}
