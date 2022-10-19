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
    public class DefaultPackagesController : Controller
    {
        SaleServices _saleServices;
        HotelsService _HotelsService;
        RestaurantService _RestaurantService;

        public DefaultPackagesController(SaleServices saleServices, HotelsService hotelsService, RestaurantService restaurantService)
        {
            _saleServices = saleServices;
            _HotelsService = hotelsService;
            _RestaurantService = restaurantService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            var model = new List<DefaultPackagesListViewModel>();
            var list = await _saleServices.DefaultPackagesList(token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<RestaurantListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;


            var hotel = await _HotelsService.HotelsList(token);
            IEnumerable<HotelListViewModel> data_hotel = (IEnumerable<HotelListViewModel>)hotel.Data;
            ViewBag.hote_ID = new SelectList(data_hotel, "ID", "Hotel");

            var rest = await _RestaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data_restaurant = (IEnumerable<RestaurantListViewModel>)rest.Data;
            ViewBag.rest_ID = new SelectList(data_restaurant, "ID", "Restaurante");

            return View();


        }

        [HttpPost]
        public async Task<IActionResult> Create(DefaultPackagesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.paqu_UsuarioCreacion = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _saleServices.DefaultPackagesCreate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {

            string token = HttpContext.User.FindFirst("Token").Value;

            var item = new DefaultPackagesViewModel();
            IEnumerable<DefaultPackagesListViewModel> model = null;
            var list = await _saleServices.DefaultPackagesList(token);
            IEnumerable<DefaultPackagesListViewModel> data = (IEnumerable<DefaultPackagesListViewModel>)list.Data;
            var element = data.Where(x => x.Id == id).ToList()[0];
            item.paqu_ID = element.Id;
            item.paqu_Descripcion = element.Descripcion_Paquete;
            item.paqu_Duracion=element.Duracion_Paquete;
            item.paqu_Nombre = element.Nombre;
            item.paqu_Precio = element.precio;
            item.hote_ID = element.ID_Hotel;
            item.rest_ID = element.ID_Restaurante;

            var hotel = await _HotelsService.HotelsList(token);
            IEnumerable<HotelListViewModel> data_hotel = (IEnumerable<HotelListViewModel>)hotel.Data;
            ViewBag.hote_ID = new SelectList(data_hotel, "ID", "Hotel",element.ID_Hotel);

            var rest = await _RestaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data_restaurant = (IEnumerable<RestaurantListViewModel>)rest.Data;
            ViewBag.rest_ID = new SelectList(data_restaurant, "ID", "Restaurante",element.ID_Restaurante);

          
            
                   
            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(DefaultPackagesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.paqu_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _saleServices.DefaultPackagesUpdate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public async Task<IActionResult> Delete(DefaultPackagesViewModel DePa, int id)
        {
            if (ModelState.IsValid)
            {
                DePa.paqu_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _saleServices.DefaultPackagesDelete(DePa, id, token);

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
            var transporte = (DefaultPackagesListViewModel)(await _saleServices.DefaultPackagesFind(id, token)).Data;

            return View(transporte);
        }
    }
}
