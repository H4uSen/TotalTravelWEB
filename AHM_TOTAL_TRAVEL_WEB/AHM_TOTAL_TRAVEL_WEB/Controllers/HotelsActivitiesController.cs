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

        [HttpPost]
        public async Task<IActionResult> Delete(HotelsActivitiesViewModel actividad, int id)
        {
            if (ModelState.IsValid)
            {
                actividad.HoAc_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _hotelService.HotelsActivitiesDelete(actividad, id, token);

                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }

        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (HotelsActivitiesListViewModel)(await _hotelService.HotelsActivitiesFind(id, token)).Data;
            return View(detalle);
        }
    }
}
