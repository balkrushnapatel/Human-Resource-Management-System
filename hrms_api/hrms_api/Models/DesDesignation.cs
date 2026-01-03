using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class DesDesignation
{
    public int DesignationId { get; set; }

    public string DesignationName { get; set; } = null!;

    public int DepartmentId { get; set; }

    public virtual DepDepartment Department { get; set; } = null!;

    public virtual ICollection<EmpEmployee> EmpEmployees { get; set; } = new List<EmpEmployee>();
}
