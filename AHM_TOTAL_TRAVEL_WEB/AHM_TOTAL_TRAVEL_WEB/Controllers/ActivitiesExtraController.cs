using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ActivitiesExtraController : Controller
    {
        ActivitiesServices _activitiesServices;

        public ActivitiesExtraController(ActivitiesServices activitiesServices)
        {
            _activitiesServices = activitiesServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<ActivitiesExtrasListViewModel>();
            var list = await _activitiesServices.ExtraActivitiesList(model, token);
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ActivitiesExtrasViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.acEx_UsuarioModifica = 1;
                var list = await _activitiesServices.ActivitiesExtraCreate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
