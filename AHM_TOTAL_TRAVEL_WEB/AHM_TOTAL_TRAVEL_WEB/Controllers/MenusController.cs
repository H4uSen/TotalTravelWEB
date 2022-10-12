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
    public class MenusController : Controller
    {
        private readonly RestaurantService _restaurantServices;
        private readonly GeneralService _generalService;

        public MenusController(RestaurantService restaurantServices, GeneralService generalService)
        {
            _restaurantServices = restaurantServices;
            _generalService = generalService;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<MenusListViewModel>();
            var list = await _restaurantServices.MenusList(model);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {

            var model = new List<MenusViewModel>();
            ViewData["Token"] = HttpContext.User.FindFirst("Token").Value;
            ViewData["UserID"] = HttpContext.User.FindFirst("User_Id").Value;

            IEnumerable<RestaurantListViewModel> model_Restaurant= null;
            var city = await _restaurantServices.RestaurantsList(model_Restaurant);
            IEnumerable<RestaurantListViewModel> data_Rest = (IEnumerable<RestaurantListViewModel>)city.Data;
            ViewBag.Rest_ID = new SelectList(data_Rest, "ID", "Restaurante");

            return View();
        }
    }
}
