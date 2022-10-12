using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class HotelController : Controller
    {
        private readonly HotelsService _hotelService;

        public HotelController(HotelsService hotelService)
        {
            _hotelService = hotelService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            //var model = new List<HotelListViewModel>();
            var list = await _hotelService.HotelsList(token);
            return View(list.Data);
        }
    }
}
