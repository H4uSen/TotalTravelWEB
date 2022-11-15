﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Http;
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
        ActivitiesServices _activitiesServices;

        public HotelsActivitiesController(HotelsService hotelService, ActivitiesServices activitiesServices)
        {
            _hotelService = hotelService;
            _activitiesServices = activitiesServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {


                var id = HttpContext.Session.GetInt32("PartnerID");
                var rol = HttpContext.Session.GetString("Role");
                string token = HttpContext.User.FindFirst("Token").Value;
                var type = await _hotelService.HotelsList(token);
                IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
                ViewBag.Hote_ID = new SelectList(data_type, "ID", "Hotel");

                var ac = await _activitiesServices.ActivityList(token);
                IEnumerable<ActivitiesListViewModel> data_act = (IEnumerable<ActivitiesListViewModel>)ac.Data;
                ViewBag.Actv_ID = new SelectList(data_act, "ID", "Descripcion");

                var model = new List<HotelsActivitiesListViewModel>();
                var list = await _hotelService.HotelsActivitiesList(token);
                IEnumerable<HotelsActivitiesListViewModel> lista = (IEnumerable<HotelsActivitiesListViewModel>)list.Data;

                if (string.IsNullOrEmpty(id.ToString()))
                {
                    return View(lista);
                }
                else
                {
                    if (rol == "Cliente" || rol == "Administrador")
                    {
                        return View(lista);
                    }

                    else
                    {
                        var list2 = lista.Where(c => c.PartnerID == Convert.ToInt32(id)).ToList();
                        return View(list2);
                    }

                }
            }
            catch
            {
                return RedirectToAction("LogOut", "Access");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<HotelListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;


            var type = await _hotelService.HotelsList(token);
            IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
            ViewBag.Hote_ID = new SelectList(data_type, "ID", "Hotel");

            var ac = await _activitiesServices.ActivityList(token);
            IEnumerable<ActivitiesListViewModel> data_act = (IEnumerable<ActivitiesListViewModel>)ac.Data;
            ViewBag.Actv_ID = new SelectList(data_act, "ID", "Descripcion");

            return View();

        }
        [HttpPost]
        public async Task<IActionResult> Create(HotelsActivitiesViewModel package)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                package.HoAc_UsuarioCreacion = int.Parse(id);
                var list = await _hotelService.HotelsActivitiesCreate(package, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }


        [HttpPost]
        public async Task<IActionResult> Delete(HotelsActivitiesViewModel actividad, int id)
        {
            if (ModelState.IsValid)
            {
                actividad.HoAc_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _hotelService.HotelsActivitiesDelete(actividad, id, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/HotelsActivities?success=true");
                }
                else
                {
                    return View();
                }
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
