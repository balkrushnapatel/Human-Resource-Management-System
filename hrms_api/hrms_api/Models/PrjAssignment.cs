using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class PrjAssignment
{
    public int AssignmentId { get; set; }

    public int ProjectId { get; set; }

    public int EmployeeId { get; set; }

    public virtual EmpEmployee Employee { get; set; } = null!;

    public virtual PrjProject Project { get; set; } = null!;
}
