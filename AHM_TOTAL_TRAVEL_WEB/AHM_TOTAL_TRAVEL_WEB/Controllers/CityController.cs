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
    public class CityController : Controller
    {
        GeneralService  _generalService;
        public CityController(GeneralService  generalService)
        {
            _generalService = generalService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<CityListViewModel>();
            var list = await _generalService.CitiesList(model, token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<CityViewModel>();

            //IEnumerable<RestaurantViewModel> model_restaurant = null;
            //var restaurant = await _restaurantServices.RestaurantCreate(model_restaurant);
            //IEnumerable<PaisesListViewModel> data_Pais = (IEnumerable<PaisesListViewModel>)pais.Data;
            //ViewBag.Pais_ID = new SelectList(data_Pais, "ID", "Descripcion");


            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CityViewModel restaurant)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                restaurant.Ciud_UsuarioCreacion = 1.ToString();
                var list = await _generalService.CitiesCreate(restaurant, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
