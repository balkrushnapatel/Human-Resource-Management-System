using hrms_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
//using OfficeOpenXml;
using System.ComponentModel;
using System.Drawing;

namespace hrms_api.Controllers
{
    [Route("/api/[controller]/[action]")]
    [ApiController]
    public class AprApprovalController : ControllerBase // Changed from Controller to ControllerBase for API
    {
        // Replace 'YourDbContext' with the actual name of your DbContext class (e.g., NrvdemoContext)
        private readonly HrmsDbContext context;

        public AprApprovalController(HrmsDbContext _context)
        {
            context = _context;
        }

        #region Get All Approvals
        [HttpGet]
        public IActionResult GetAllApprovals()
        {
            var approvals = context.AprApprovals
                .Select(a => new
                {
                    a.ApprovalId,
                    a.RequestType,
                    a.RequestId,
                    a.Status,
                    a.ApprovedOn,
                }).ToList();

            return Ok(approvals);
        }
        #endregion

        #region Export Approvals to Excel
        [HttpGet]
        //public IActionResult ExportToExcel()
        //{
        //    try
        //    {
        //        ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

        //        var data = context.AprApprovals.Include(a => a.ApprovedByNavigation).ToList();

        //        if (data.Count == 0)
        //            return BadRequest("No approval data found.");

        //        using (var package = new ExcelPackage())
        //        {
        //            var worksheet = package.Workbook.Worksheets.Add("Approvals");

        //            // Add and Style headers
        //            string[] headers = { "Approval ID", "Request Type", "Request ID", "Status", "Approved On", "Approved By" };
        //            for (int i = 0; i < headers.Length; i++)
        //            {
        //                var cell = worksheet.Cells[1, i + 1];
        //                cell.Value = headers[i];
        //                cell.Style.Font.Bold = true;
        //                cell.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
        //                cell.Style.Fill.BackgroundColor.SetColor(Color.LightBlue);
        //            }

        //            // Add data
        //            for (int i = 0; i < data.Count; i++)
        //            {
        //                worksheet.Cells[i + 2, 1].Value = data[i].ApprovalId;
        //                worksheet.Cells[i + 2, 2].Value = data[i].RequestType;
        //                worksheet.Cells[i + 2, 3].Value = data[i].RequestId;
        //                worksheet.Cells[i + 2, 4].Value = data[i].Status;
        //                worksheet.Cells[i + 2, 5].Value = data[i].ApprovedOn?.ToString("yyyy-MM-dd");
        //                worksheet.Cells[i + 2, 6].Value = data[i].ApprovedByNavigation?.UserName;
        //            }

        //            worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();
        //            var excelBytes = package.GetAsByteArray();

        //            return File(excelBytes,
        //                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        //                "Approvals_Report.xlsx");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Error exporting: {ex.Message}");
        //    }
        //}
        #endregion

        #region Get Approval By Id
        [HttpGet("{id}")]
        public IActionResult GetApprovalById(int id)
        {
            var approval = context.AprApprovals
                .Include(a => a.ApprovedByNavigation)
                .FirstOrDefault(a => a.ApprovalId == id);

            if (approval == null) return NotFound();

            return Ok(approval);
        }
        #endregion

        #region Add Approval
        [HttpPost]
        public IActionResult AddApproval([FromBody] AprApproval approval)
        {
            if (approval == null) return BadRequest("Data is null");

            // Set default date if not provided
            if (approval.ApprovedOn == null)
            {
                approval.ApprovedOn = DateOnly.FromDateTime(DateTime.Now);
            }

            context.AprApprovals.Add(approval);
            context.SaveChanges();

            return CreatedAtAction(nameof(GetApprovalById), new { id = approval.ApprovalId }, approval);
        }
        #endregion

        #region Update Approval
        [HttpPut("{id}")]
        public IActionResult UpdateApproval(int id, [FromBody] AprApproval approval)
        {
            if (id != approval.ApprovalId) return BadRequest("ID mismatch");

            var existing = context.AprApprovals.Find(id);
            if (existing == null) return NotFound();

            existing.RequestType = approval.RequestType;
            existing.RequestId = approval.RequestId;
            existing.Status = approval.Status;
            existing.ApprovedBy = approval.ApprovedBy;
            existing.ApprovedOn = approval.ApprovedOn;

            context.SaveChanges();
            return NoContent();
        }
        #endregion

        #region Delete Approval
        [HttpDelete("{id}")]
        public IActionResult DeleteApproval(int id)
        {
            var approval = context.AprApprovals.Find(id);
            if (approval == null) return NotFound();

            context.AprApprovals.Remove(approval);
            context.SaveChanges();

            return NoContent();
        }
        #endregion
    }
}