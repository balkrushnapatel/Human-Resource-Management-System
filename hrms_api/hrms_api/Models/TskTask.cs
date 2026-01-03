using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class TskTask
{
    public int TaskId { get; set; }

    public int ProjectId { get; set; }

    public int AssignedTo { get; set; }

    public string TaskName { get; set; } = null!;

    public DateOnly? Deadline { get; set; }

    public string? Status { get; set; }

    public virtual EmpEmployee AssignedToNavigation { get; set; } = null!;

    public virtual PrjProject Project { get; set; } = null!;
}
