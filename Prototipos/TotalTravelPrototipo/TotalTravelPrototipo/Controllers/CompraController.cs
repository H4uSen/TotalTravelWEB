using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TotalTravelPrototipo.Controllers
{
    public class CompraController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Historial()
        {
            return View();
        }
    }
}
