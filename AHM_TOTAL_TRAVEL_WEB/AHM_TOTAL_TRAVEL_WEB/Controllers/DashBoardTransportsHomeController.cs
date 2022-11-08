using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class DashBoardTransportsHomeController : Controller
    {
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;
        public DashBoardTransportsHomeController(TransportService transportService, GeneralService generalService)
        {
            _transportService = transportService;
            _generalService = generalService;
        }
        public IActionResult Index()
        {
            try
            {
              
                return View();
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }
       
    }
}
