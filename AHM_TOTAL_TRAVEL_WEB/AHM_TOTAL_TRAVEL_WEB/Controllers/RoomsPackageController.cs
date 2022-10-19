using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class RoomsPackageController : Controller
    {
        SaleServices _saleServices;

        public RoomsPackageController(SaleServices saleServices, HotelsService hotelsService, RestaurantService restaurantService)
        {
            _saleServices = saleServices;
            //_HotelsService = hotelsService;
            //_RestaurantService = restaurantService;
        }
        [HttpGet]

        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<RoomsPackagesListViewModel>();
            var list = await _saleServices.RoomsPackagesList(token);
            return View(list.Data);
        }
    }
}
