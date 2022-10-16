﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{

    public class ActivitiesController : Controller
    {
        ActivitiesServices _activitiesServices;
        HotelsService _HotelsService;

        public ActivitiesController(ActivitiesServices activitiesServices, HotelsService hotelsService)
        {
            _activitiesServices = activitiesServices;
            _HotelsService = hotelsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var type = await _activitiesServices.TypesActivitiesList();
            IEnumerable<TypesActivitiesListViewModel> data_type = (IEnumerable<TypesActivitiesListViewModel>)type.Data;
            ViewBag.TiAc_ID = new SelectList(data_type, "ID", "Descripcion");
            var model = new List<ActivitiesListViewModel>();
            var list = await _activitiesServices.ActivityList();
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            IEnumerable<TypesActivitiesListViewModel> model = null;
            var type = await _activitiesServices.TypesActivitiesList();
            IEnumerable<TypesActivitiesListViewModel> data_type = (IEnumerable<TypesActivitiesListViewModel>)type.Data;
            ViewBag.TiAc_ID = new SelectList(data_type, "ID", "Descripcion");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ActivitiesViewModel actividad)
        {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.actv_UsuarioCreacion = 1;
                RequestStatus response = (RequestStatus)(await _activitiesServices.ActivitiesCreate(actividad, token)).Data;
                if (response.CodeStatus != 0)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    ViewData["Error"] = response.MessageStatus;
                    IEnumerable<TypesActivitiesListViewModel> model = null;
                    var type = await _activitiesServices.TypesActivitiesList();
                    IEnumerable<TypesActivitiesListViewModel> data_type = (IEnumerable<TypesActivitiesListViewModel>)type.Data;
                    ViewBag.TiAc_ID = new SelectList(data_type, "ID", "Descripcion");
                    return View();
                };
          

        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {

            var item = new ActivitiesViewModel();
            IEnumerable<ActivitiesListViewModel> model = null;
            var list = await _activitiesServices.ActivityList();
            IEnumerable<ActivitiesListViewModel> data = (IEnumerable<ActivitiesListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.actv_Descripcion = element.Descripcion;


            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(ActivitiesViewModel actividad, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.actv_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _activitiesServices.ActivitiesUpdate(actividad, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(ActivitiesViewModel actividad, int id)
        {
            if (ModelState.IsValid)
            {
                actividad.actv_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _activitiesServices.ActivitiesDelete(actividad, id, token);
                
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
            var detalle = (ActivitiesListViewModel)(await _activitiesServices.ActivitiesFind(id, token)).Data;
            return View(detalle);
        }
    }
}
