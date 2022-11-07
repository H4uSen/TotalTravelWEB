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
            var list = await _restaurantServices.TypeMenusList();
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
                var listData = await _restaurantServices.TypeMenusList();
                return View("Index",listData.Data);
            }
            else
            {
                return View();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var item = new TypeMenusViewModel();
            var list = await _restaurantServices.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data = (IEnumerable<TypeMenusListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];

            item.Time_ID = element.ID;
            item.Time_Descripcion = element.descripcion;

            return View(item);
        }

        [HttpPost]
        public async Task<IActionResult> Update(TypeMenusViewModel TypeMenus)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                TypeMenus.Time_UsuarioModifica = int.Parse(idd);
                var lista = await _restaurantServices.TypeMenusUpdate(TypeMenus, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(TypeMenusViewModel TypeMenus, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                TypeMenus.Time_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _restaurantServices.TypeMenusDelete(TypeMenus, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
        }
        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (TypeMenusListViewModel)(await _restaurantServices.TypeMenusFind(id, token)).Data;
            return View(detalle);
        }

    }
}
