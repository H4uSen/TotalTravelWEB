using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize]
    public class DashBoardHotelHomeController : Controller
    {
        public DashBoardHotelHomeController( HotelsService HotelsService)
        {
            
            _HotelsService = HotelsService;
          
        }
        private readonly HotelsService _HotelsService;
        public IActionResult Index()
        {
            return View();
        }
    }
}
