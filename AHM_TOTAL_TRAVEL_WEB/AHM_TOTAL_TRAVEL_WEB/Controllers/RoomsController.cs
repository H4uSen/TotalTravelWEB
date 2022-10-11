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
        HotelsService _hotelsServices;

        public RoomsController(HotelsService hotelsService)
        {
            _hotelsServices = hotelsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<RoomsListViewModel>();
            var list = await _hotelsServices.RoomsList(model);
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoomsViewModel habitacion)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                habitacion.Habi_UsuarioModifica = 1;
                var list = await _hotelsServices.RoomsCreate(habitacion, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }


        [HttpPost]
        public async Task<IActionResult> Update(RoomsViewModel habitacion, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var lista = await _hotelsServices.RoomsUpdate(habitacion, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(RoomsViewModel habitacion, int id)
        {
            if (ModelState.IsValid)
            {
                habitacion.Habi_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _hotelsServices.RoomsDelete(habitacion, id, token);

                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
    }
}
