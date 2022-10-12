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
            var model = new List<DefaultPackagesListViewModel>();
            var list = await _saleServices.DefaultPackagesList(model);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            //var model = new List<ActivitiesViewModel>();
            //string token = HttpContext.User.FindFirst("Token").Value;

            //var hotel = await _HotelsService.HotelsList(token);
            //IEnumerable<HotelListViewModel> data_Hotel = (IEnumerable<HotelListViewModel>)hotel.Data;
            //ViewBag.Hote_ID = new SelectList(data_Hotel, "ID", "Hotel");

            //IEnumerable<RestaurantListViewModel> model_Partners = null;
            //var restaurant = await _RestaurantService.RestaurantsList(model_Partners);
            //IEnumerable<RestaurantListViewModel> data_Restaurant = (IEnumerable<RestaurantListViewModel>)restaurant.Data;
            //ViewBag.Rest_ID = new SelectList(data_Restaurant, "ID", "Nombre");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(DefaultPackagesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.paqu_UsuarioCreacion = 1;
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

            var item = new DefaultPackagesViewModel();
            IEnumerable<DefaultPackagesListViewModel> model = null;
            var list = await _saleServices.DefaultPackagesList(model);
            IEnumerable<DefaultPackagesListViewModel> data = (IEnumerable<DefaultPackagesListViewModel>)list.Data;
            var element = data.Where(x => x.Id == id).ToList()[0];
            item.paqu_ID = element.Id;
            item.paqu_Descripcion = element.Descripcion_Paquete;
            item.paqu_Duracion=element.Duracion_Paquete;
            item.paqu_Nombre = element.Nombre;
            

            //IEnumerable<EstablecimientoListViewModel> model_Est = null;
            //var Establecimiento = await _generalServices.EstablecimientosList(model_Est);
            //IEnumerable<EstablecimientoListViewModel> data_Establecimiento = (IEnumerable<EstablecimientoListViewModel>)Establecimiento.Data;
            //ViewBag.Est_ID = new SelectList(data_Establecimiento, "ID", "Descripcion", element.EstablecimientoID);

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(DefaultPackagesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.paqu_UsuarioModifica = 1;
                var list = await _saleServices.DefaultPackagesUpdate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
