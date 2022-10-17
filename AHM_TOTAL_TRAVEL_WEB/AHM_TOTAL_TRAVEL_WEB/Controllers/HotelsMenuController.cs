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
    public class HotelsMenuController : Controller
    {
        private readonly HotelsService _hotelService;
        private readonly RestaurantService _restaurantServices;

        public HotelsMenuController(HotelsService hotelService, RestaurantService restaurantServices)
        {
            _hotelService = hotelService;
            _restaurantServices = restaurantServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var type = await _hotelService.HotelsList(token);
            IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
            ViewBag.Hote_ID = new SelectList(data_type, "ID", "Hotel");
            
            var type2 = await _restaurantServices.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
            ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");

            var model = new List<HotelsMenuListViewModel>();
            var list = await _hotelService.HotelsMenuList(model);
            return View(list.Data);
        }


        [HttpGet]
        public async Task<IActionResult> Create()
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            IEnumerable<HotelListViewModel> model = null;
            var type = await _hotelService.HotelsList(token);
            IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
            ViewBag.Hote_ID = new SelectList(data_type, "ID", "Hotel");

            var type2 = await _restaurantServices.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
            ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(HotelsMenuViewModel actividad)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            actividad.HoMe_UsuarioCreacion = 1;
            RequestStatus response = (RequestStatus)(await _hotelService.HotelsMenuCreate(actividad, token)).Data;
            if (response.CodeStatus != 0)
            {
                return RedirectToAction("Index");
            }
            else
            {
                
                ViewData["Error"] = response.MessageStatus;
                IEnumerable<HotelListViewModel> model = null;
                var type = await _hotelService.HotelsList(token);
                IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
                ViewBag.Hote_ID = new SelectList(data_type, "ID", "Descripcion");

                var type2 = await _restaurantServices.TypeMenusList();
                IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
                ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");
                return View();
            };


        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {

            var item = new HotelsMenuViewModel();
            IEnumerable<HotelsMenuListViewModel> model = null;
            var list = await _hotelService.HotelsMenuList(model);
            IEnumerable<HotelsMenuListViewModel> data = (IEnumerable<HotelsMenuListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.HoMe_Descripcion = element.Menu;
            item.HoMe_Precio = element.Precio;

            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<HotelListViewModel> model2 = null;
            var type = await _hotelService.HotelsList(token);
            IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
            ViewBag.Hote_ID = new SelectList(data_type, "ID", "Descripcion");

            var type2 = await _restaurantServices.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
            ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");




            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(HotelsMenuViewModel actividad, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.HoMe_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _hotelService.HotelsMenuUpdate(actividad, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        [HttpPost]
        public async Task<IActionResult> Delete(HotelsMenuViewModel actividad, int id)
        {
            if (ModelState.IsValid)
            {
                actividad.HoMe_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _hotelService.HotelsMenuDelete(actividad, id, token);

                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }

        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (HotelsMenuListViewModel)(await _hotelService.HotelsMenuFind(id, token)).Data;
            return View(detalle);
        }


    }
}
