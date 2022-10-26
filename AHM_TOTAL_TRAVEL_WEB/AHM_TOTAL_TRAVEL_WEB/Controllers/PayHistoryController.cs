using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AHM_TOTAL_TRAVEL_WEB.Models;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class PayHistoryController :Controller
    {
        private readonly ReservationService _reservationService;
        private readonly HotelsService _hotelsService;

        public PayHistoryController(ReservationService reservationService, HotelsService hotelsService)
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
