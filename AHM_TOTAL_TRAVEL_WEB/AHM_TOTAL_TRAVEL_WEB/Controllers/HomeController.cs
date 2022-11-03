﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AHM_TOTAL_TRAVEL_WEB.Services;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly GeneralService _generalServices;
        private readonly SaleServices _SaleServices;
        private readonly ReservationService _ReservationService;
        private readonly AccessService _AccessService;
        private readonly HotelsService _HotelsService;
        private readonly ActivitiesServices _ActivitiesServices;
        private readonly RestaurantService _restaurantService;

        public HomeController(ILogger<HomeController> logger, GeneralService GeneralService, SaleServices SaleServices,
                              ReservationService ReservationService, AccessService AccessService, HotelsService HotelsService,
                              ActivitiesServices ActivitiesServices, RestaurantService restaurantService)
        {
            _generalServices = GeneralService;
            _SaleServices = SaleServices;
            _ReservationService = ReservationService;
            _AccessService = AccessService;
            _HotelsService = HotelsService;
            _ActivitiesServices = ActivitiesServices;
            _restaurantService = restaurantService;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> adminDashboard()
        {

            //general lists
            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<PartnersListViewModel> partners =
                (IEnumerable<PartnersListViewModel>)(await _generalServices.PartnersList()).Data;

            IEnumerable<DefaultPackagesListViewModel> packages =
                (IEnumerable<DefaultPackagesListViewModel>)(await _SaleServices.DefaultPackagesList(token)).Data;

            IEnumerable<ReservationListViewModel> reservations =
                (IEnumerable<ReservationListViewModel>)(await _ReservationService.ReservationList(token)).Data;

            IEnumerable<UserListViewModel> clientes =
                (IEnumerable<UserListViewModel>)(await _AccessService.UsersList(token)).Data;

            IEnumerable<ReservationExtraActivitiesListViewModel> reservationsActivities =
               (IEnumerable<ReservationExtraActivitiesListViewModel>)(await _ReservationService.ExtraActivitiesReservationList(token)).Data;

            //header data
            ViewData["agencias_hotel_count"] = partners.Where(partner => partner.TipoPartner_Id == 1).LongCount();
            ViewData["agencias_transportes_count"] = partners.Where(partner => partner.TipoPartner_Id == 2).LongCount();
            ViewData["agencias_turismo_count"] = partners.Where(partner => partner.TipoPartner_Id == 3).LongCount();
            ViewData["agencias_restaurante_count"] = partners.Where(partner => partner.TipoPartner_Id == 4).LongCount();

            //sub header data
            ViewData["paquetes_count"] = packages.LongCount();
            ViewData["reservarion_count"] = reservations.LongCount();
            ViewData["partners_count"] = partners.LongCount();
            ViewData["clientes_count"] = clientes.Where(cliente => cliente.Role_ID == 2).LongCount();


            // top hotels
            List<HotelListViewModel> Hotel_Top_3 = new List<HotelListViewModel>();
            var hotel_top = reservations.GroupBy(d => d.Hotel_ID).OrderByDescending(x => x.Key).ToList();

            int hotel_length = hotel_top.Count() >= 3 ? 3 : hotel_top.Count();
            for (int i = 0; i < hotel_length; i++)
            {
                var item = hotel_top[i];
                HotelListViewModel hotel = 
                    (HotelListViewModel)(await _HotelsService.HotelFind(item.Key.ToString(), token)).Data;

                Hotel_Top_3.Add(hotel);
            }

            //top activities
            List<ActivitiesListViewModel> activities_Top_5 = new List<ActivitiesListViewModel>();
            var activities_Top = reservationsActivities.GroupBy(d => d.Id_Actividad_Extra).OrderByDescending(x => x.Key).ToList();

            int activities_length = activities_Top.Count() >= 3 ? 3 : activities_Top.Count();
            for (int i = 0; i < activities_length; i++)
            {
                var item = activities_Top[i];

                if (item != null)
                {
                    ActivitiesListViewModel activity =
                         (ActivitiesListViewModel)(await _ActivitiesServices.ActivitiesFind(item.Key.ToString(), token)).Data;

                    activities_Top_5.Add(activity);
                }
            }
            AdminDashboardViewModel model = new AdminDashboardViewModel
            {
                Activities_top_5 = activities_Top_5,
                Hotel_Top_3 = Hotel_Top_3
            };

            return View(model);
        }

        public async Task<IActionResult> restaurantDashboard()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _AccessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalServices.PartnersFind(id, token)).Data;

            var list = await _restaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data = (IEnumerable<RestaurantListViewModel>)list.Data;
            var restaurante = data.Where(x => x.ID_Partner == cuenta.PartnerID).ToList()[0];

            IEnumerable<PartnersListViewModel> partnerss =
                (IEnumerable<PartnersListViewModel>)(await _generalServices.PartnersList()).Data;

            IEnumerable<TypeMenusListViewModel> tiposmenus =
                (IEnumerable<TypeMenusListViewModel>)(await _restaurantService.TypeMenusList()).Data;

            IEnumerable<MenusListViewModel> menus =
                (IEnumerable<MenusListViewModel>)(await _restaurantService.MenusList()).Data;

            IEnumerable<ReservationRestaurantsListViewModel> reservations =
               (IEnumerable<ReservationRestaurantsListViewModel>)(await _ReservationService.RestaurantsReservationList(token)).Data;

            ViewData["NombreRestaurante"] = restaurante.Restaurante;
            ViewData["Partner"] = restaurante.Partner;
            ViewData["Direccion"] = "Calle " + restaurante.Calle + ", Avenida " + restaurante.Avenida + ", Colonia " + restaurante.Colonia + ", Ciudad de " + restaurante.Ciudad;
            ViewData["Imagen"] = partner.Image_Url;

            ViewData["TiposMenus"] = tiposmenus.LongCount();
            ViewData["Reservaciones"] = reservations.LongCount();
            ViewData["CantidadMenus"] = menus.Where(menus => menus.ID_Restaurante == restaurante.ID).LongCount();

            ViewData["CantidadDesayunos"] = menus.Where(menus => menus.ID_Restaurante == restaurante.ID && menus.ID_TipoMenu == 1012).LongCount();
            ViewData["CantidadAlmuerzos"] = menus.Where(menus => menus.ID_Restaurante == restaurante.ID && menus.ID_TipoMenu == 3).LongCount();
            ViewData["CantidadCenas"] = menus.Where(menus => menus.ID_Restaurante == restaurante.ID && menus.ID_TipoMenu == 2).LongCount();
            ViewData["CantidadPostres"] = menus.Where(menus => menus.ID_Restaurante == restaurante.ID && menus.ID_TipoMenu == 1014).LongCount();

            IEnumerable<ReservationRestaurantsListViewModel> reservacionespendientes =
               (IEnumerable<ReservationRestaurantsListViewModel>)(await _ReservationService.RestaurantsReservationList(token)).Data;

            var d = new List<restaurantsDashboardDetail>();

            foreach (var item in reservacionespendientes)
            {
                var x = new restaurantsDashboardDetail();
                var r = (ReservationListViewModel)(await _ReservationService.ReservationFind(item.DescripcionReservacion, token)).Data;
                if (r.ConfirmacionRestaurante == true)
                {
                    x.detalle = item;
                    x.reservacion = r;
                }
                d.Add(x);
            }

            return View(d);
        }

        public async Task<IActionResult> activitiesDashboard()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _AccessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalServices.PartnersFind(id, token)).Data;

            IEnumerable<PartnersListViewModel> partnerss =
                (IEnumerable<PartnersListViewModel>)(await _generalServices.PartnersList()).Data;

            IEnumerable<TypesActivitiesListViewModel> tiposactividades =
                (IEnumerable<TypesActivitiesListViewModel>)(await _ActivitiesServices.TypesActivitiesList()).Data;

            IEnumerable<ActivitiesExtrasListViewModel> actividades =
                (IEnumerable<ActivitiesExtrasListViewModel>)(await _ActivitiesServices.ExtraActivitiesList(token)).Data;

            IEnumerable<ReservationExtraActivitiesListViewModel> reservations =
               (IEnumerable<ReservationExtraActivitiesListViewModel>)(await _ReservationService.ExtraActivitiesReservationList(token)).Data;

            ViewData["Partner"] = cuenta.Partner;
            ViewData["Direccion"] = "Calle " + cuenta.Calle + ", Avenida " + cuenta.Avenida + ", Colonia " + cuenta.Colonia;
            ViewData["Imagen"] = partner.Image_Url;

            ViewData["TiposActividades"] = tiposactividades.LongCount();
            ViewData["Reservaciones"] = reservations.LongCount();
            ViewData["CantidadActividades"] = actividades.Where(x => x.ID_Partner == cuenta.PartnerID).LongCount();

            ViewData["CantidadAventura"] = actividades.Where(actividades => actividades.TipoActividadID == 2).LongCount();
            ViewData["CantidadAerea"] = actividades.Where(actividades => actividades.TipoActividadID == 3).LongCount();
            ViewData["CantidadAcuatico"] = actividades.Where(actividades => actividades.TipoActividadID == 8).LongCount();
            ViewData["CantidadSenderismo"] = actividades.Where(actividades => actividades.TipoActividadID == 1008).LongCount();

            IEnumerable<ReservationExtraActivitiesListViewModel> reservacionespendientes =
               (IEnumerable<ReservationExtraActivitiesListViewModel>)(await _ReservationService.ExtraActivitiesReservationList(token)).Data;

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error404()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error401()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
