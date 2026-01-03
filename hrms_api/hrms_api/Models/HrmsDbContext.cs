using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace hrms_api.Models;

public partial class HrmsDbContext : DbContext
{
    public HrmsDbContext()
    {
    }

    public HrmsDbContext(DbContextOptions<HrmsDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AprApproval> AprApprovals { get; set; }

    public virtual DbSet<AttAttendance> AttAttendances { get; set; }

    public virtual DbSet<AudAuditLog> AudAuditLogs { get; set; }

    public virtual DbSet<DepDepartment> DepDepartments { get; set; }

    public virtual DbSet<DesDesignation> DesDesignations { get; set; }

    public virtual DbSet<EmpEmployee> EmpEmployees { get; set; }

    public virtual DbSet<LevLeaveRequest> LevLeaveRequests { get; set; }

    public virtual DbSet<LevLeaveType> LevLeaveTypes { get; set; }

    public virtual DbSet<PrjAssignment> PrjAssignments { get; set; }

    public virtual DbSet<PrjProject> PrjProjects { get; set; }

    public virtual DbSet<RolRole> RolRoles { get; set; }

    public virtual DbSet<SalSalaryPayment> SalSalaryPayments { get; set; }

    public virtual DbSet<SalSalaryStructure> SalSalaryStructures { get; set; }

    public virtual DbSet<TofTimeOff> TofTimeOffs { get; set; }

    public virtual DbSet<TskTask> TskTasks { get; set; }

    public virtual DbSet<UsrUser> UsrUsers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AprApproval>(entity =>
        {
            entity.HasKey(e => e.ApprovalId).HasName("PK__APR_Appr__328477D49C932A35");

            entity.ToTable("APR_Approval");

            entity.Property(e => e.ApprovalId).HasColumnName("ApprovalID");
            entity.Property(e => e.ApprovedOn).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.RequestId).HasColumnName("RequestID");
            entity.Property(e => e.RequestType)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.ApprovedByNavigation).WithMany(p => p.AprApprovals)
                .HasForeignKey(d => d.ApprovedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_APR_ApprovedBy");
        });

        modelBuilder.Entity<AttAttendance>(entity =>
        {
            entity.HasKey(e => e.AttendanceId).HasName("PK__ATT_Atte__8B69263C2DE40CE9");

            entity.ToTable("ATT_Attendance");

            entity.HasIndex(e => new { e.EmployeeId, e.AttendanceDate }, "UQ_ATT_EmployeeDate").IsUnique();

            entity.Property(e => e.AttendanceId).HasColumnName("AttendanceID");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Employee).WithMany(p => p.AttAttendances)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ATT_Employee");

            entity.HasOne(d => d.MarkedByNavigation).WithMany(p => p.AttAttendances)
                .HasForeignKey(d => d.MarkedBy)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_ATT_MarkedBy");
        });

        modelBuilder.Entity<AudAuditLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK__AUD_Audi__5E5499A8D4429DD2");

            entity.ToTable("AUD_AuditLog");

            entity.Property(e => e.LogId).HasColumnName("LogID");
            entity.Property(e => e.Action)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.ActionTime)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.User).WithMany(p => p.AudAuditLogs)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_AUD_User");
        });

        modelBuilder.Entity<DepDepartment>(entity =>
        {
            entity.HasKey(e => e.DepartmentId).HasName("PK__DEP_Depa__B2079BCD8DCB1C7E");

            entity.ToTable("DEP_Department");

            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DepartmentName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Description).HasColumnType("text");
        });

        modelBuilder.Entity<DesDesignation>(entity =>
        {
            entity.HasKey(e => e.DesignationId).HasName("PK__DES_Desi__BABD603E59A8D509");

            entity.ToTable("DES_Designation");

            entity.Property(e => e.DesignationId).HasColumnName("DesignationID");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DesignationName)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.Department).WithMany(p => p.DesDesignations)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DES_Department");
        });

        modelBuilder.Entity<EmpEmployee>(entity =>
        {
            entity.HasKey(e => e.EmployeeId).HasName("PK__EMP_Empl__7AD04FF163CD2D2C");

            entity.ToTable("EMP_Employee");

            entity.HasIndex(e => e.UserId, "UQ__EMP_Empl__1788CCADAF8A31B5").IsUnique();

            entity.HasIndex(e => e.EmployeeCode, "UQ__EMP_Empl__1F642548E86F5940").IsUnique();

            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Address).HasColumnType("text");
            entity.Property(e => e.DepartmentId).HasColumnName("DepartmentID");
            entity.Property(e => e.DesignationId).HasColumnName("DesignationID");
            entity.Property(e => e.EmployeeCode)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.FirstName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.LastName)
                .HasMaxLength(50)
                .IsUnicode(false);
            entity.Property(e => e.Phone)
                .HasMaxLength(15)
                .IsUnicode(false);
            entity.Property(e => e.ProfilePhoto)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.UserId).HasColumnName("UserID");

            entity.HasOne(d => d.Department).WithMany(p => p.EmpEmployees)
                .HasForeignKey(d => d.DepartmentId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EMP_Department");

            entity.HasOne(d => d.Designation).WithMany(p => p.EmpEmployees)
                .HasForeignKey(d => d.DesignationId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EMP_Designation");

            entity.HasOne(d => d.User).WithOne(p => p.EmpEmployee)
                .HasForeignKey<EmpEmployee>(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_EMP_User");
        });

        modelBuilder.Entity<LevLeaveRequest>(entity =>
        {
            entity.HasKey(e => e.LeaveRequestId).HasName("PK__LEV_Leav__6094218E5DA39B01");

            entity.ToTable("LEV_LeaveRequest");

            entity.Property(e => e.LeaveRequestId).HasColumnName("LeaveRequestID");
            entity.Property(e => e.AppliedOn).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.LeaveTypeId).HasColumnName("LeaveTypeID");
            entity.Property(e => e.Reason).HasColumnType("text");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Pending");

            entity.HasOne(d => d.ApprovedByNavigation).WithMany(p => p.LevLeaveRequests)
                .HasForeignKey(d => d.ApprovedBy)
                .HasConstraintName("FK_LEV_ApprovedBy");

            entity.HasOne(d => d.Employee).WithMany(p => p.LevLeaveRequests)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LEV_Employee");

            entity.HasOne(d => d.LeaveType).WithMany(p => p.LevLeaveRequests)
                .HasForeignKey(d => d.LeaveTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_LEV_Type");
        });

        modelBuilder.Entity<LevLeaveType>(entity =>
        {
            entity.HasKey(e => e.LeaveTypeId).HasName("PK__LEV_Leav__43BE8FF4DE39A252");

            entity.ToTable("LEV_LeaveType");

            entity.Property(e => e.LeaveTypeId).HasColumnName("LeaveTypeID");
            entity.Property(e => e.LeaveName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<PrjAssignment>(entity =>
        {
            entity.HasKey(e => e.AssignmentId).HasName("PK__PRJ_Assi__32499E57413863FA");

            entity.ToTable("PRJ_Assignment");

            entity.HasIndex(e => new { e.ProjectId, e.EmployeeId }, "UQ_PRJ_Assignment").IsUnique();

            entity.Property(e => e.AssignmentId).HasColumnName("AssignmentID");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");

            entity.HasOne(d => d.Employee).WithMany(p => p.PrjAssignments)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PRJ_Employee");

            entity.HasOne(d => d.Project).WithMany(p => p.PrjAssignments)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_PRJ_Project");
        });

        modelBuilder.Entity<PrjProject>(entity =>
        {
            entity.HasKey(e => e.ProjectId).HasName("PK__PRJ_Proj__761ABED0A77C9402");

            entity.ToTable("PRJ_Project");

            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.ProjectName)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false);
        });

        modelBuilder.Entity<RolRole>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PK__ROL_Role__8AFACE3A60722C96");

            entity.ToTable("ROL_Role");

            entity.HasIndex(e => e.RoleName, "UQ__ROL_Role__8A2B616027D7ADC9").IsUnique();

            entity.Property(e => e.RoleId).HasColumnName("RoleID");
            entity.Property(e => e.RoleName)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<SalSalaryPayment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__SAL_Sala__9B556A587C3D807E");

            entity.ToTable("SAL_SalaryPayment");

            entity.Property(e => e.PaymentId).HasColumnName("PaymentID");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.NetSalary).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.PaymentDate).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.SalaryMonth)
                .HasMaxLength(20)
                .IsUnicode(false);

            entity.HasOne(d => d.Employee).WithMany(p => p.SalSalaryPayments)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SAL_PaymentEmployee");
        });

        modelBuilder.Entity<SalSalaryStructure>(entity =>
        {
            entity.HasKey(e => e.SalaryId).HasName("PK__SAL_Sala__4BE204B7141D78C2");

            entity.ToTable("SAL_SalaryStructure");

            entity.HasIndex(e => e.EmployeeId, "UQ__SAL_Sala__7AD04FF0A153C0CA").IsUnique();

            entity.Property(e => e.SalaryId).HasColumnName("SalaryID");
            entity.Property(e => e.Allowance)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(10, 2)");
            entity.Property(e => e.BasicSalary).HasColumnType("decimal(10, 2)");
            entity.Property(e => e.Deduction)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(10, 2)");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Hra)
                .HasDefaultValue(0m)
                .HasColumnType("decimal(10, 2)")
                .HasColumnName("HRA");

            entity.HasOne(d => d.Employee).WithOne(p => p.SalSalaryStructure)
                .HasForeignKey<SalSalaryStructure>(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_SAL_Employee");
        });

        modelBuilder.Entity<TofTimeOff>(entity =>
        {
            entity.HasKey(e => e.TimeOffId).HasName("PK__TOF_Time__B9CB0C11AC45970C");

            entity.ToTable("TOF_TimeOff");

            entity.Property(e => e.TimeOffId).HasColumnName("TimeOffID");
            entity.Property(e => e.EmployeeId).HasColumnName("EmployeeID");
            entity.Property(e => e.Reason).HasColumnType("text");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Pending");

            entity.HasOne(d => d.Employee).WithMany(p => p.TofTimeOffs)
                .HasForeignKey(d => d.EmployeeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TOF_Employee");
        });

        modelBuilder.Entity<TskTask>(entity =>
        {
            entity.HasKey(e => e.TaskId).HasName("PK__TSK_Task__7C6949D1009138BA");

            entity.ToTable("TSK_Task");

            entity.Property(e => e.TaskId).HasColumnName("TaskID");
            entity.Property(e => e.ProjectId).HasColumnName("ProjectID");
            entity.Property(e => e.Status)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasDefaultValue("Pending");
            entity.Property(e => e.TaskName)
                .HasMaxLength(100)
                .IsUnicode(false);

            entity.HasOne(d => d.AssignedToNavigation).WithMany(p => p.TskTasks)
                .HasForeignKey(d => d.AssignedTo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TSK_AssignedTo");

            entity.HasOne(d => d.Project).WithMany(p => p.TskTasks)
                .HasForeignKey(d => d.ProjectId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TSK_Project");
        });

        modelBuilder.Entity<UsrUser>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__USR_User__1788CCACAAAD81C9");

            entity.ToTable("USR_User");

            entity.HasIndex(e => e.Email, "UQ__USR_User__A9D1053468D6BAEC").IsUnique();

            entity.Property(e => e.UserId).HasColumnName("UserID");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .IsUnicode(false);
            entity.Property(e => e.RoleId).HasColumnName("RoleID");

            entity.HasOne(d => d.Role).WithMany(p => p.UsrUsers)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_USR_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
