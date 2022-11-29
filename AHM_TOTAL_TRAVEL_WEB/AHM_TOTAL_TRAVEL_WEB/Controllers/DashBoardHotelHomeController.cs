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
    [Authorize]
    public class DashBoardHotelHomeController : Controller
    {
        private readonly AccessService _AccessService;
        private readonly GeneralService _GeneralService;
        private readonly HotelsService _HotelsService;

        public DashBoardHotelHomeController(HotelsService HotelsService, AccessService AccessService,GeneralService GeneralService)
        {
            
            _HotelsService = HotelsService;
            _AccessService = AccessService;
            _GeneralService = GeneralService;
          
        }
   
        public async Task<IActionResult> HotelDashboard()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _AccessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _GeneralService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;

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
            ViewData["Imagen"] = cuenta.Image_URL;

            ViewData["Hoteles"] = hotel.ToList().Count();
            ViewData["Habitaciones"] = rooms.ToList().Count();
            ViewData["Actividades"] = Activities.ToList().Count();
            ViewData["menus"] = menus.ToList().Count();

            return View();

        }
    }
}
