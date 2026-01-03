using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class SalSalaryPayment
{
    public int PaymentId { get; set; }

    public int EmployeeId { get; set; }

    public string SalaryMonth { get; set; } = null!;

    public int SalaryYear { get; set; }

    public decimal NetSalary { get; set; }

    public DateOnly? PaymentDate { get; set; }

    public virtual EmpEmployee Employee { get; set; } = null!;
}
