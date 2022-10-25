using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ModulePartnersActivitiesController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Activities()
        {
            return View();
        }
    }
}
