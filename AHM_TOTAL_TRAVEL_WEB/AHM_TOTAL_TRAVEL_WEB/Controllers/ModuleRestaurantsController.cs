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

        private readonly IMapper _mapper;

        public ModuleRestaurantsController(AccessService accessService, RestaurantService restaurantService, GeneralService generalService, IMapper mapper)
        {
            _accessService = accessService;
            _restaurantService = restaurantService;
            _generalService = generalService;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalService.PartnersFind(id, token)).Data;
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

        public async Task<IActionResult> Menu()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalService.PartnersFind(id, token)).Data;

            var list = await _restaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data = (IEnumerable<RestaurantListViewModel>)list.Data;
            var element = data.Where(x => x.ID_Partner == cuenta.PartnerID).ToList()[0];
            ViewData["restauranteID"] = element.ID;

            var typeMenus = await _restaurantService.TypeMenusList();
            IEnumerable<TypeMenusListViewModel> data_TypeMenus = (IEnumerable<TypeMenusListViewModel>)typeMenus.Data;
            ViewBag.TiMe_ID = new SelectList(data_TypeMenus, "ID", "descripcion");
            return View();
        }
    }
}
