using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ReservationController : Controller
    {
        private readonly ReservationService _reservationService;
        private readonly HotelsService _hotelsService;

        public ReservationController(ReservationService reservationService, HotelsService hotelsService)
        {
            _reservationService = reservationService;
            _hotelsService = hotelsService;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var list = await _reservationService.ReservationList(token);

            return View(list.Data);
        }
    }
}
