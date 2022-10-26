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
    public class ReservationController : Controller
    {
        private readonly ReservationService _reservationService;
        private readonly HotelsService _hotelsService;
        private readonly AccessService _accessService;
        private readonly SaleServices _saleServices;

        public ReservationController(ReservationService reservationService, HotelsService hotelsService, AccessService accessService, 
            SaleServices saleServices)
        {
            _reservationService = reservationService;
            _hotelsService = hotelsService;
            _accessService = accessService;
            _saleServices = saleServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var list = await _reservationService.ReservationList(token);

            return View(list.Data);
        }
        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var item = new ReservationViewModel();
            var list = await _reservationService.ReservationList(token);
            IEnumerable<ReservationListViewModel> data = (IEnumerable<ReservationListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];


            var usuario = await _accessService.UsersList(token);
            IEnumerable<UserListViewModel> data_usuario = (IEnumerable<UserListViewModel>)usuario.Data;
            ViewBag.Cliente = new SelectList(data_usuario, "ID", "Nombre", element.Id_Cliente);

            var habitaciones = await _hotelsService.RoomsList(token);
            IEnumerable<RoomsListViewModel> data_habitaciones = (IEnumerable<RoomsListViewModel>)habitaciones.Data;
            data_habitaciones = data_habitaciones.Where(x => x.HotelID == element.Hotel_ID);
            ViewBag.Habitaciones = new SelectList(data_habitaciones, "ID", "Habitacion");

            var paquete = await _saleServices.DefaultPackagesList(token);
            IEnumerable<DefaultPackagesListViewModel> data_paquete = (IEnumerable<DefaultPackagesListViewModel>)paquete.Data;
            ViewBag.Paquetes = new SelectList(data_paquete, "Id", "Nombre", element.Id_Paquete);

            ViewData["Reservacion_HotelID"] = element.ReservacionHotelID;
            ViewData["Hotel_ID"] = element.Hotel_ID;

            return View(element);
        }
        [HttpPost]
        public async Task<IActionResult> Update(ReservationViewModel reserva)
        {
            if (ModelState.IsValid)
            {
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
    }
}
