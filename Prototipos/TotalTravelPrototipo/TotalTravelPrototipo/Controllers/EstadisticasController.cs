using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TotalTravelPrototipo.Controllers
{
    public class EstadisticasController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
