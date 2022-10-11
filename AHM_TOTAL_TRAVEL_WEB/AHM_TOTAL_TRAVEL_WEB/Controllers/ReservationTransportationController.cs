using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Produces("multipart/form-data")]

    public class ReservationTransportationController : Controller
    {
        ReservationService _reservationService;
        public ReservationTransportationController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<ReservationTransportationListViewModel>();
            var list = await _reservationService.transportationReservationList(model, token);
            return View(list.Data);
        }
    }
}
