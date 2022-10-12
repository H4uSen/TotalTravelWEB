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

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(HotelViewModel hotel)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                hotel.Hote_UsuarioCreacion=int.Parse(id);
                var list = await _hotelService.HotelCreate(hotel, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        //[HttpGet]
        //public async Task<IActionResult> Update(int id)
        //{

        //    var item = new ActivitiesViewModel();
        //    IEnumerable<ActivitiesListViewModel> model = null;
        //    var list = await _activitiesServices.ActivityList(model);
        //    IEnumerable<ActivitiesListViewModel> data = (IEnumerable<ActivitiesListViewModel>)list.Data;
        //    var element = data.Where(x => x.ID == id).ToList()[0];
        //    item.actv_Descripcion = element.Descripcion;


        //    return View(item);

        //}

        //[HttpPost]
        //public async Task<IActionResult> Update(ActivitiesViewModel actividad, int id)
        //{

        //    if (ModelState.IsValid)
        //    {
        //        string token = HttpContext.User.FindFirst("Token").Value;
        //        //actividad.actv_UsuarioModifica = 1;
        //        var lista = await _activitiesServices.ActivitiesUpdate(actividad, id, token);
        //        return RedirectToAction("Index");
        //    }
        //    else
        //    {
        //        return View();
        //    }

        //}

        //[HttpPost]
        //public async Task<IActionResult> Delete(ActivitiesViewModel actividad, int id)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        actividad.actv_UsuarioModifica = 1;

        //        string token = HttpContext.User.FindFirst("Token").Value;
        //        var list = await _activitiesServices.ActivitiesDelete(actividad, id, token);

        //        return RedirectToAction("Index");
        //    }
        //    else
        //    {
        //        return View();
        //    }
        //}
    }
}
