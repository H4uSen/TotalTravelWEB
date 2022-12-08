using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
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
            try { 
            var model = new List<TypeMenusListViewModel>();
            var list = await _restaurantServices.TypeMenusList();
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
            try { 
            var model = new List<TypeMenusViewModel>();
            ViewData["Token"] = HttpContext.User.FindFirst("Token").Value;

            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(TypeMenusViewModel typeMenus)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                typeMenus.Time_UsuarioCreacion = Convert.ToInt32(UserID);
                var list = await _restaurantServices.typeMenusCreate(typeMenus, token);
                var listData = await _restaurantServices.TypeMenusList();
                return Redirect("~/TypeMenus?success-c=true");
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
            try { 
            var item = new TypeMenusViewModel();
            var list = await _restaurantServices.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data = (IEnumerable<TypeMenusListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];

            item.Time_ID = element.ID;
            item.Time_Descripcion = element.descripcion;

            return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(TypeMenusViewModel TypeMenus)
        {
            try {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                TypeMenus.Time_UsuarioModifica = int.Parse(idd);
                var lista = await _restaurantServices.TypeMenusUpdate(TypeMenus, token);
                return Redirect("~/TypeMenus?success-u=true");
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
        public async Task<IActionResult> Delete(TypeMenusViewModel TypeMenus, int id)
        {
            try { 
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (TypeMenusListViewModel)(await _restaurantServices.TypeMenusFind(id, token)).Data;
            return View(detalle);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

    }
}
