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
using Microsoft.AspNetCore.Authorization;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
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
            try
            {
                var id = HttpContext.User.FindFirst("User_Id").Value;
                var token = HttpContext.User.FindFirst("Token").Value;
                var list = await _reservationService.ReservationList(token);
                IEnumerable<ReservationListViewModel> lista = (IEnumerable<ReservationListViewModel>)list.Data;
                var element = lista.ToList()[0];

                if (string.IsNullOrEmpty(id))
                {
                    return View(lista);
                }
                else
                {
                    var list2 = lista.Where(c => c.Id_Cliente == Convert.ToInt32(id)).ToList();
                    return View(list2);

                }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }
    }
}
