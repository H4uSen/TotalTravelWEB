using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class TypeMenusController : Controller
    {
        private readonly RestaurantService _restaurantServices;

        public TypeMenusController(RestaurantService restaurantServices)
        {
            _restaurantServices = restaurantServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<TypeMenusListViewModel>();
            var list = await _restaurantServices.TypeMenusList(model);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {

            var model = new List<TypeMenusViewModel>();
            ViewData["Token"] = HttpContext.User.FindFirst("Token").Value;

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(TypeMenusViewModel typeMenus)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                typeMenus.Time_UsuarioCreacion = Convert.ToInt32(UserID);
                var list = await _restaurantServices.typeMenusCreate(typeMenus, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
    }
}
