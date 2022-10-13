using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class HotelsActivitiesController : Controller
    {
        private readonly HotelsService _hotelService;

        public HotelsActivitiesController(HotelsService hotelService)
        {
            _hotelService = hotelService;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<HotelsActivitiesListViewModel>();
            var list = await _hotelService.HotelsActivitiesList(model);
            return View(list.Data);
        }
    }
}
