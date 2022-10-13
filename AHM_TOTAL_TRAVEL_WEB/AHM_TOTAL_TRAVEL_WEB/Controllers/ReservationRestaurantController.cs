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
    [Produces("multipart/form-data")]

    public class ReservationRestaurantController : Controller
    {
        ReservationService  _reservationService;
        RestaurantService _restaurantService;
        public ReservationRestaurantController(ReservationService  reservationService, RestaurantService restaurantService)
        {
            _reservationService = reservationService;
            _restaurantService = restaurantService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<ReservationRestaurantsListViewModel>();
            var list = await _reservationService.RestaurantsReservationList(model, token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<ReservationRestaurantsViewModel>();
                
            IEnumerable<RestaurantListViewModel> model_Restaurants = null;
            var Restaurants = await _restaurantService.RestaurantsList(model_Restaurants);
            IEnumerable<RestaurantListViewModel> data_Pais = (IEnumerable<RestaurantListViewModel>)Restaurants.Data;
            ViewBag.Rest_ID = new SelectList(data_Pais, "ID", "Descripcion");


            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Create(ReservationRestaurantsViewModel  reservationRestaurants)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                reservationRestaurants.ReRe_UsuarioCreacion = 1;
                var list = await _reservationService.RestaurantsReservationCreate(reservationRestaurants, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
