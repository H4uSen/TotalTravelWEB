﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{

    public class ActivitiesController : Controller
    {
        ActivitiesServices _activitiesServices;

        public ActivitiesController(ActivitiesServices activitiesServices)
        {
            _activitiesServices = activitiesServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<ActivitiesListViewModel>();
            var list = await _activitiesServices.ActivityList(model);
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ActivitiesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.actv_UsuarioCreacion = 1;
                var list = await _activitiesServices.ActivitiesCreate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {

            var item = new ActivitiesViewModel();
            IEnumerable<ActivitiesListViewModel> model = null;
            var list = await _activitiesServices.ActivityList(model);
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
                //actividad.actv_UsuarioModifica = 1;
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
    }
}
