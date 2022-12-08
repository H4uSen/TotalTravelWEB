using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ModuleRestaurantsController : Controller
    {
        private readonly AccessService _accessService;
        private readonly RestaurantService _restaurantService;
        private readonly GeneralService _generalService;
        private readonly ReservationService _reservationService;

        private readonly IMapper _mapper;

        public ModuleRestaurantsController(AccessService accessService, RestaurantService restaurantService, GeneralService generalService, ReservationService reservationService, IMapper mapper)
        {
            _accessService = accessService;
            _restaurantService = restaurantService;
            _generalService = generalService;
            _reservationService = reservationService;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index()
        {
            try {
            var token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;

            var list = await _restaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data = (IEnumerable<RestaurantListViewModel>)list.Data;
            var element = data.Where(x => x.ID_Partner == cuenta.PartnerID).ToList()[0];
            ViewData["restauranteID"] = element.ID;

            var typeMenus = await _restaurantService.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data_TypeMenus = (IEnumerable<TypeMenusListViewModel>)typeMenus.Data;
            ViewBag.TiMe_ID = new SelectList(data_TypeMenus, "ID", "descripcion");

            return View();
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public async Task<IActionResult> Info()
        {
            try {
            var token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;
            ViewData["Telefono"] = partner.Telefono;
            ViewData["Email"] = partner.Email;

            var list = await _restaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data = (IEnumerable<RestaurantListViewModel>)list.Data;
            var element = data.Where(x => x.ID_Partner == cuenta.PartnerID).ToList()[0];

            ViewData["RestaurantFolder"] = $"Restaurants/Restaurant-{element.ID}/Place";

            var direccion = (AddressListViewModel)(await _generalService.AddressFind(element.ID_Direccion.ToString(), token)).Data;
            ViewData["Calle"] = direccion.Calle;
            ViewData["Avenida"] = direccion.Avenida;
            ViewData["Pais"] = direccion.ID_Pais;
            ViewData["Ciudad"] = direccion.ID_Ciudad;
            ViewData["Colonia"] = direccion.Colonia;
            ViewData["DireccionExacta"] = $"Calle {direccion.Calle}, Avenida {direccion.Avenida}, Colonia {direccion.Colonia}, Ciudad de {direccion.Ciudad}, {direccion.Pais}";

            return View(element);
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Delete(MenusViewModel Menus, int id)
        {
            try {
                if (ModelState.IsValid)
                {
                    var idd = HttpContext.User.FindFirst("User_Id").Value;
                    Menus.Menu_UsuarioModifica = int.Parse(idd);

                    string token = HttpContext.User.FindFirst("Token").Value;
                    var list = (RequestStatus)(await _restaurantService.MenusDelete(Menus, id, token)).Data;

                    return Ok(list.CodeStatus);
                }
                else
                {
                    return View();
                }
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Reservations()
        {
            try {
            var token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var list = await _restaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data = (IEnumerable<RestaurantListViewModel>)list.Data;
            var element = data.Where(x => x.ID_Partner == cuenta.PartnerID).ToList()[0];

            ViewData["RestauranteID"] = element.ID;
            ViewData["PartnerID"] = cuenta.PartnerID;

            return View();
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update()
        {
            try
            {
                var item = new RestaurantListViewModel();
                var address = new AddressListViewModel();
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

                var partner = (PartnersListViewModel)(await _generalService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;

                var list = await _restaurantService.RestaurantsList(token);
                IEnumerable<RestaurantListViewModel> data1 = (IEnumerable<RestaurantListViewModel>)list.Data;
                var element1 = data1.Where(x => x.ID_Partner == cuenta.PartnerID).ToList()[0];

                var addressList = await _generalService.AddressesList();
                IEnumerable<RestaurantListViewModel> data = (IEnumerable<RestaurantListViewModel>)list.Data;
                IEnumerable<AddressListViewModel> addressData = (IEnumerable<AddressListViewModel>)addressList.Data;
                var element = data.Where(x => x.ID == element1.ID).ToList()[0];
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTypeMenu(TypeMenusViewModel typeMenus)
        {
            try {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    string UserID = HttpContext.User.FindFirst("User_Id").Value;
                    typeMenus.Time_UsuarioCreacion = Convert.ToInt32(UserID);
                    var list = await _restaurantService.typeMenusCreate(typeMenus, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/ModuleRestaurants?success=true");
                    }
                    else
                    {
                        return View();
                    }
                }
                else
                {
                    return View();
                }
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
