﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class RestaurantController : Controller {

        private readonly GeneralService _generalService;
        private readonly RestaurantService _restaurantServices;
        public RestaurantController(RestaurantService restaurantServices, GeneralService generalService)
        {
            _restaurantServices = restaurantServices;
            _generalService = generalService;
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
            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<CityListViewModel> model_City = null;
            var city = await _generalService.CitiesList(model_City, token);
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            IEnumerable<CountriesListViewModel> model_Country = null;
            var country = await _generalService.CountriesList(model_Country);
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

            IEnumerable<PartnersListViewModel> model_Partners = null;
            var partners = await _generalService.PartnersList(model_Partners);
            IEnumerable<PartnersListViewModel> data_Partners = (IEnumerable<PartnersListViewModel>)partners.Data;
            ViewBag.Part_ID = new SelectList(data_Partners, "ID", "Nombre");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(RestaurantViewModel restaurant)
        {

            if (ModelState.IsValid)
            {
                string token =  HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                restaurant.Rest_UsuarioCreacion = Convert.ToInt32(UserID);
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
