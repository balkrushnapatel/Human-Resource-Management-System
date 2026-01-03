using System;
using System.Collections.Generic;

namespace hrms_api.Models;

public partial class RolRole
{
    public int RoleId { get; set; }

    public string RoleName { get; set; } = null!;

    public virtual ICollection<UsrUser> UsrUsers { get; set; } = new List<UsrUser>();
}
