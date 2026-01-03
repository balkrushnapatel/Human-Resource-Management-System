using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class DepDepartment
{
    public int DepartmentId { get; set; }

    public string DepartmentName { get; set; } = null!;

    public string? Description { get; set; }

    public virtual ICollection<DesDesignation> DesDesignations { get; set; } = new List<DesDesignation>();

    public virtual ICollection<EmpEmployee> EmpEmployees { get; set; } = new List<EmpEmployee>();
}
