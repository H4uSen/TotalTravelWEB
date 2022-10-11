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
    public class RestaurantController : Controller {

        RestaurantService _restaurantServices;
        public RestaurantController(RestaurantService restaurantServices)
        {
            _restaurantServices = restaurantServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<RestaurantListViewModel>();
            var list = await _restaurantServices.RestaurantsList(model);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<RestaurantViewModel>();

            //IEnumerable<RestaurantViewModel> model_restaurant = null;
            //var restaurant = await _restaurantServices.RestaurantCreate(model_restaurant);
            //IEnumerable<PaisesListViewModel> data_Pais = (IEnumerable<PaisesListViewModel>)pais.Data;
            //ViewBag.Pais_ID = new SelectList(data_Pais, "ID", "Descripcion");


            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(RestaurantViewModel restaurant)
        {

            if (ModelState.IsValid)
            {
                string token =  HttpContext.User.FindFirst("Token").Value;
                restaurant.Rest_UsuarioCreacion = 1.ToString();
                var list = await _restaurantServices.RestaurantCreate(restaurant, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

    }
}
