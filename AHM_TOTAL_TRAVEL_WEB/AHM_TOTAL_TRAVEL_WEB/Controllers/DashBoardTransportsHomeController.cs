using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
    public class DashBoardTransportsHomeController : Controller
    {
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;
        private readonly AccessService _AccessService;
        private readonly HotelsService _HotelsService;
        public DashBoardTransportsHomeController(TransportService transportService, GeneralService generalService, HotelsService HotelsService, AccessService AccessService)
        {
            _transportService = transportService;
            _generalService = generalService;
            _HotelsService = HotelsService;
            _AccessService = AccessService;
          

        }
        public async Task<IActionResult> Index()
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                var cuenta = (UserListViewModel)(await _AccessService.AccountFind(id, token)).Data;

                var partner = (PartnersListViewModel)(await _generalService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;

                IEnumerable<HotelListViewModel> hotel =
                   (IEnumerable<HotelListViewModel>)(await _HotelsService.HotelsList(token)).Data;

                IEnumerable<RoomsListViewModel> rooms =
                   (IEnumerable<RoomsListViewModel>)(await _HotelsService.RoomsList(token)).Data;

                IEnumerable<HotelsActivitiesListViewModel> Activities =
                   (IEnumerable<HotelsActivitiesListViewModel>)(await _HotelsService.HotelsActivitiesList(token)).Data;

                IEnumerable<HotelsMenuListViewModel> menus =
                   (IEnumerable<HotelsMenuListViewModel>)(await _HotelsService.HotelsMenuList(token)).Data;

                ViewData["Partner"] = cuenta.Partner;
                ViewData["Direccion"] = "Calle " + cuenta.Calle + ", Avenida " + cuenta.Avenida + ", Colonia " + cuenta.Colonia;
                ViewData["Imagen"] = partner.Image_Url;

                ViewData["Hoteles"] = hotel.ToList().Count();
                ViewData["Habitaciones"] = rooms.ToList().Count();
                ViewData["Actividades"] = Activities.ToList().Count();
                ViewData["menus"] = menus.ToList().Count();

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
       
    }
}
