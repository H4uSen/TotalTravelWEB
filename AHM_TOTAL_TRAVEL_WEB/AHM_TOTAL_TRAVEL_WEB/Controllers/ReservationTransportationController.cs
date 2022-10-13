using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Produces("multipart/form-data")]

    public class ReservationTransportationController : Controller
    {
        ReservationService _reservationService;
        public ReservationTransportationController(ReservationService reservationService)
        {
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<ReservationTransportationListViewModel>();
            var list = await _reservationService.transportationReservationList(model, token);
            return View(list.Data);
        }



        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<ReservationTransportationViewModel>();

            //IEnumerable<RestaurantViewModel> model_restaurant = null;
            //var restaurant = await _restaurantServices.RestaurantCreate(model_restaurant);
            //IEnumerable<PaisesListViewModel> data_Pais = (IEnumerable<PaisesListViewModel>)pais.Data;
            //ViewBag.Pais_ID = new SelectList(data_Pais, "ID", "Descripcion");


            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Create(ReservationTransportationViewModel  reservationTransportation)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                reservationTransportation.ReTr_UsuarioCreacion = 1;
                var list = await _reservationService.transportationReservationCreate(reservationTransportation, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
