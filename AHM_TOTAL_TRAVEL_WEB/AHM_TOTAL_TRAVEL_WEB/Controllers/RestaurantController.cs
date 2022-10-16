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
            string token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<RestaurantListViewModel>();
            var list = await _restaurantServices.RestaurantsList(token);

            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<RestaurantViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;

            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");


            var partners = await _generalService.PartnersList();
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

        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (RestaurantListViewModel)(await _restaurantServices.RestaurantFind(id, token)).Data;
            return View(detalle);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(RestaurantViewModel restaurant, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                restaurant.Rest_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _restaurantServices.RestaurantDelete(restaurant, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var item = new RestaurantListViewModel();
            var address = new AddressListViewModel();
            string token = HttpContext.User.FindFirst("Token").Value;
            var list = await _restaurantServices.RestaurantsList(token);
            var addressList = await _generalService.AddressesList();
            IEnumerable<RestaurantListViewModel> data = (IEnumerable<RestaurantListViewModel>)list.Data;
            IEnumerable<AddressListViewModel> addressData = (IEnumerable<AddressListViewModel>)addressList.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.ID = element.ID;
            item.Restaurante = element.Restaurante;
            item.ID_Partner = element.ID_Partner;
            item.Partner = element.Partner;
            item.ID_Direccion = element.ID_Direccion;
            item.CiudadID = element.CiudadID;
            item.Ciudad = element.Ciudad;
            item.ID_Colonia = element.ID_Colonia;
            item.Colonia = element.Colonia;
            item.Avenida = element.Avenida;
            item.Calle = element.Calle;


            var elementAddress = addressData.Where(x => x.ID == item.ID_Direccion).ToList()[0];
            ViewData["RestaurantFolder"] = $"Restaurants/Restaurant-{item.ID}/Place";
            ViewData["RestaurantID"] = element.ID;
            ViewData["PaisID"] = elementAddress.ID_Pais;
            ViewData["CiudadID"] = element.CiudadID;
            ViewData["ColoID"] = element.ID_Colonia;
            ViewData["PartID"] = element.ID_Partner;

            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");


            var partners = await _generalService.PartnersList();
            IEnumerable<PartnersListViewModel> data_Partners = (IEnumerable<PartnersListViewModel>)partners.Data;
            ViewBag.Part_ID = new SelectList(data_Partners, "ID", "Nombre");

            return View(item);
        }


    }
}
