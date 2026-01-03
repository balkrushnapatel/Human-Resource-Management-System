using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class SalSalaryStructure
{
    public int SalaryId { get; set; }

    public int EmployeeId { get; set; }

    public decimal BasicSalary { get; set; }

    public decimal? Hra { get; set; }

    public decimal? Allowance { get; set; }

    public decimal? Deduction { get; set; }

    public virtual EmpEmployee Employee { get; set; } = null!;
}
