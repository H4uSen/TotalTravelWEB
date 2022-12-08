using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Produces("multipart/form-data")]
    [Authorize(Policy = "MyPolicy")]
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

            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;

                var model = new List<ReservationRestaurantsListViewModel>();
                var list = await _reservationService.RestaurantsReservationList(token);
                return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            try
            {
                var model = new List<ReservationExtraActivitiesViewModel>();
                string token = HttpContext.User.FindFirst("Token").Value;

                var reservacion = await _reservationService.ReservationList(token);
                List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
                data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });

                ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto");


                var restaurant = await _restaurantService.RestaurantsList(token);
                IEnumerable<RestaurantListViewModel> data_restaurant = (IEnumerable<RestaurantListViewModel>)restaurant.Data;
                ViewBag.Rest_ID = new SelectList(data_restaurant, "ID", "Restaurante");


                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }


        [HttpPost]
        public async Task<IActionResult> Create(ReservationRestaurantsViewModel  reservationRestaurants)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    reservationRestaurants.ReRe_UsuarioCreacion = 1;
                    var list = await _reservationService.RestaurantsReservationCreate(reservationRestaurants, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/ReservationRestaurant?success=true");
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;

                var item = new ReservationRestaurantsViewModel();
                IEnumerable<ReservationRestaurantsListViewModel> model = null;
                var list = await _reservationService.RestaurantsReservationList(token);
                IEnumerable<ReservationRestaurantsListViewModel> data = (IEnumerable<ReservationRestaurantsListViewModel>)list.Data;
                var element = data.Where(x => x.Id == id).ToList()[0];
                item.Resv_ID = element.Resv_ID;
                item.Rest_ID = element.ID_Restaurante;
                item.ReRe_FechaReservacion = element.Fecha_Reservacion;
                item.ReRe_HoraReservacion = element.Hora_Reservacion;
                item.Resv_ID = element.Resv_ID;
                item.Rest_ID = element.ID_Restaurante;

                var reservacion = await _reservationService.ReservationList(token);
                List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
                data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });

                ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto");


                var restaurant = await _restaurantService.RestaurantsList(token);
                IEnumerable<RestaurantListViewModel> data_restaurant = (IEnumerable<RestaurantListViewModel>)restaurant.Data;
                ViewBag.Rest_ID = new SelectList(data_restaurant, "ID", "Restaurante", element.ID_Restaurante);

                return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Update(ReservationRestaurantsViewModel reservacionrestaurante, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    reservacionrestaurante.ReRe_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                    var lista = await _reservationService.RestaurantsReservationUpdate(reservacionrestaurante, id, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)lista.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/ReservationRestaurant?success=true");
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(ReservationRestaurantsViewModel restaurant, int id)
        {
            try
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public async Task<IActionResult> Details(string id)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var restaurante = (ReservationRestaurantsListViewModel)(await _reservationService.RestaurentReservationFind(id, token)).Data;

                return View(restaurante);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
