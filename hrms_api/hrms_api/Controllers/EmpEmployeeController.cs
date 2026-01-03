using Microsoft.AspNetCore.Mvc;

namespace hrms_api.Controllers
{
    public class EmpEmployeeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
