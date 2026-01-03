using Microsoft.AspNetCore.Mvc;

namespace hrms_api.Controllers
{
    public class AudAuditLogController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
