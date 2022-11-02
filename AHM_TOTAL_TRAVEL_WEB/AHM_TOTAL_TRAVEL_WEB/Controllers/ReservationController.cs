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
        public async Task<IActionResult> Create()
        {   
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] ReservationViewModel reservation)
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            string UserID = HttpContext.User.FindFirst("User_Id").Value;
            reservation.Resv_UsuarioCreacion = int.Parse(UserID);

            if (ModelState.IsValid)
            {
                var result = await _reservationService.ReservationCreate(reservation, token);
                if (result.Success)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, result.Message);
                }
            }
            return View();
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


        [HttpPost]
        public async Task<IActionResult> Delete( int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ServiceResult result = new ServiceResult();
                    var idMod = HttpContext.User.FindFirst("User_Id").Value;
                    

                    string token = HttpContext.User.FindFirst("Token").Value;
                    var list = (RequestStatus)(await _reservationService.ReservationDelete(int.Parse(idMod), id, token)).Data;

                    return Ok(list.CodeStatus);
                }
                else
                {
                    return View();
                }
            }
            catch (Exception)
            {

                return RedirectToAction("Error", "Home");
            }

        }

        public IActionResult PersonalizePackages()
        {
            return View();
        }
    }
}
