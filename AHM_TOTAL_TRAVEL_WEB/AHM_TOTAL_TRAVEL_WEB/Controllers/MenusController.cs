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
            var list = await _restaurantServices.MenusList();
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {

            var model = new List<MenusViewModel>();
            ViewData["Token"] = HttpContext.User.FindFirst("Token").Value;
            ViewData["UserID"] = HttpContext.User.FindFirst("User_Id").Value;

            string token = HttpContext.User.FindFirst("Token").Value;
            var rest = await _restaurantServices.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data_Rest = (IEnumerable<RestaurantListViewModel>)rest.Data;
            ViewBag.Rest_ID = new SelectList(data_Rest, "ID", "Restaurante");

            var typeMenus = await _restaurantServices.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data_TypeMenus = (IEnumerable<TypeMenusListViewModel>)typeMenus.Data;
            ViewBag.TiMe_ID = new SelectList(data_TypeMenus, "ID", "descripcion");

            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Delete(MenusViewModel Menus, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                Menus.Menu_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _restaurantServices.MenusDelete(Menus, id, token)).Data;

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
            var detalle = (MenusListViewModel)(await _restaurantServices.MenusFind(id, token)).Data;
            ViewData["MenusFolder"] = $"Restaurants/Restaurant-{detalle.ID_Restaurante}/Food";
            ViewData["MenuID"] = id;
            return View(detalle);
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            ViewData["Token"] = HttpContext.User.FindFirst("Token").Value;
            ViewData["UserID"] = HttpContext.User.FindFirst("User_Id").Value;

            string token = HttpContext.User.FindFirst("Token").Value;
            var rest = await _restaurantServices.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data_Rest = (IEnumerable<RestaurantListViewModel>)rest.Data;
            ViewBag.Rest_ID = new SelectList(data_Rest, "ID", "Restaurante");

            var typeMenus = await _restaurantServices.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data_TypeMenus = (IEnumerable<TypeMenusListViewModel>)typeMenus.Data;
            ViewBag.TiMe_ID = new SelectList(data_TypeMenus, "ID", "descripcion");

            var item = new MenusListViewModel();
            var list = await _restaurantServices.MenusList();
            IEnumerable<MenusListViewModel> data = (IEnumerable<MenusListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];

            item.Menu = element.Menu;
            item.Descripcion = element.Descripcion;
            string precio = Convert.ToString(element.Precio);
            item.Precio = Convert.ToInt32(precio.Remove(precio.Length - 5, 5));

            ViewData["MenusFolder"] = $"Restaurants/Restaurant-{element.ID_Restaurante}/Food";
            ViewData["MenusImage"] = element.Image_Url;
            ViewData["RestaurantID"] = element.ID_Restaurante;
            ViewData["TipoMenuID"] = element.ID_TipoMenu;
            ViewData["MenuID"] = id;


            return View(item);
        }
    }
}
