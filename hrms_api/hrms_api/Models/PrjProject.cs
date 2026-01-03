using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class PrjProject
{
    public int ProjectId { get; set; }

    public string ProjectName { get; set; } = null!;

    public string? Description { get; set; }

    public DateOnly? StartDate { get; set; }

    public DateOnly? EndDate { get; set; }

    public string? Status { get; set; }

    public virtual ICollection<PrjAssignment> PrjAssignments { get; set; } = new List<PrjAssignment>();

    public virtual ICollection<TskTask> TskTasks { get; set; } = new List<TskTask>();
}
