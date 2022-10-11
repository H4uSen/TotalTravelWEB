using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class RoomsController : Controller
    {
        private readonly hotelsService _hotelsService;

        public RoomsController(hotelsService hotelsService)
        {
            _hotelsService = hotelsService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<RoomsListViewModel>();
            var list = await _hotelsService.RoomsList(model);
            return View(list.Data);
        }
    }
}
