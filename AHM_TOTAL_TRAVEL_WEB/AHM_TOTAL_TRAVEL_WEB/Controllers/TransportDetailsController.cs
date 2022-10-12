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
    public class TransportDetailsController : Controller
    {
        private readonly TransportService _transportService;

        public TransportDetailsController(TransportService transportService)
        {
            _transportService = transportService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<TransportDetailsListViewModel>();
            var list = await _transportService.TransportDetailsList(model);
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
           

            //IEnumerable<RestaurantViewModel> model_restaurant = null;
            //var restaurant = await _restaurantServices.RestaurantCreate(model_restaurant);
            //IEnumerable<PaisesListViewModel> data_Pais = (IEnumerable<PaisesListViewModel>)pais.Data;
            //ViewBag.Pais_ID = new SelectList(data_Pais, "ID", "Descripcion");


            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(TransportDetailsViewModel transportdetails)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                transportdetails.DeTr_UsuarioCreacion = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _transportService.TransportDetailsCreate(transportdetails, token);
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

            var item = new TransportDetailsViewModel();
            IEnumerable<TransportDetailsListViewModel> model = null;
            var list = await _transportService.TransportDetailsList(model);
            IEnumerable<TransportDetailsListViewModel> data = (IEnumerable<TransportDetailsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];


            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(TransportDetailsViewModel transportdetails, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                transportdetails.DeTr_UsuarioModifica = 1;
                var lista = await _transportService.TransportDetailsUpdate(transportdetails, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(TransportDetailsViewModel transportdetails, int id)
        {
            if (ModelState.IsValid)
            {
                transportdetails.DeTr_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _transportService.TransportDetailsDelete(transportdetails, id, token);

                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
    }
}
