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
        private readonly ReservationService _reservationService;
        private readonly RestaurantService _restaurantService;
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
            var list = await _reservationService.RestaurantsReservationList(token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<ReservationExtraActivitiesViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;

            var reservasion = await _reservationService.ReservationList(token);
            IEnumerable<ReservationListViewModel> data_reservacion = (IEnumerable<ReservationListViewModel>)reservasion.Data;
            ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "DescripcionPaquete");


            var restaurant = await _restaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data_restaurant = (IEnumerable<RestaurantListViewModel>)restaurant.Data;
            ViewBag.Rest_ID = new SelectList(data_restaurant, "ID", "Restaurante");


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
                if (list.Success)
                {
                    return RedirectToAction("Index");
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

        [HttpPost]
        public async Task<IActionResult> Delete(ReservationRestaurantsViewModel restaurant, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                restaurant.ReRe_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _reservationService.RestaurentReservationDelete(restaurant, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
        }
    }
}
