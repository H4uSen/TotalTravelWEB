using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ReservationController : Controller
    {
        private readonly ReservationService _reservationService;
        private readonly HotelsService _hotelsService;
        private readonly AccessService _accessService;
        private readonly SaleServices _saleServices;
        private readonly ActivitiesServices _activitiesServices;

        public ReservationController(ReservationService reservationService, HotelsService hotelsService, AccessService accessService, SaleServices saleServices, ActivitiesServices activitiesServices)
        {
            _reservationService = reservationService;
            _hotelsService = hotelsService;
            _accessService = accessService;
            _saleServices = saleServices;
            _activitiesServices = activitiesServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            List<PaymentRecordListViewModel> payments = (List<PaymentRecordListViewModel>)(await _saleServices.PaymentRecordsList()).Data;
            List<ReservationListViewModel> list = (List<ReservationListViewModel>)(await _reservationService.ReservationList(token)).Data;
            list.ForEach(item =>
            {
                item.AmountOfPayments = (payments.Where(x => x.Id_Reservacion == item.ID)).Count();
            });
            return View(list);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {   
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReservationViewModel reservation)
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            string UserID = HttpContext.User.FindFirst("User_Id").Value;
            reservation.Resv_UsuarioCreacion = int.Parse(UserID);
            var result = await _reservationService.ReservationCreate(reservation, token);
                if (result.Success)
                {
                    return View();
                }
                else
                {
                    ModelState.AddModelError(string.Empty, result.Message);
                }
            
            return View(reservation);
        }



        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            

            var item = new ReservationViewModel();
            var list = await _reservationService.ReservationList(token);
            IEnumerable<ReservationListViewModel> data = (IEnumerable<ReservationListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];

            var responseHotelsActivities = await _hotelsService.HotelsActivitiesList(token);
            List<HotelsActivitiesListViewModel> hotelsActivities = (List<HotelsActivitiesListViewModel>)responseHotelsActivities.Data;
            hotelsActivities = hotelsActivities.Where(x => x.ID_Hotel == element.Hotel_ID).ToList();
            ViewBag.hotelActivities = new MultiSelectList(hotelsActivities, "ID", "ddlItem");

            HotelListViewModel hotel = (HotelListViewModel)_hotelsService.HotelFind(element.Hotel_ID.Value.ToString(), token).Result.Data;

            var responseExtraActivities = await _activitiesServices.ExtraActivitiesList(token);
            List<ActivitiesExtrasListViewModel> extraActivities = (List<ActivitiesExtrasListViewModel>)responseExtraActivities.Data;
            extraActivities = extraActivities.Where(x => x.CiudadID == hotel.CiudadID).ToList();
            ViewBag.extraActivities = new MultiSelectList(extraActivities, "ID", "ddlItem");


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
            ViewData["Usua_ID"] = id;
            ViewData["Reservation"] = element;

            return View(element);
        }

        
        [HttpPost]
        public async Task<IActionResult> Update(ReservationViewModel reserva)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var token = HttpContext.User.FindFirst("Token").Value;
                    string UserID = HttpContext.User.FindFirst("User_Id").Value;
                    reserva.Resv_UsuarioCreacion = int.Parse(UserID);
                    var result = await _reservationService.ReservationUpdate(reserva,reserva.Resv_ID, token);
                    if (result.Success)
                    {
                        return View();
                    }
                    else
                    {
                        ModelState.AddModelError(string.Empty, result.Message);
                    }



                    return RedirectToAction("Index");
                }
                else
                {
                    return View(reserva);
                }
            }
            catch (Exception)
            {

                return RedirectToAction("Error", "Home");
            }
            
        }


        [HttpPost]
        public async Task<IActionResult> Delete( int id)
        {
            
            try
            {
                string idMod = HttpContext.User.FindFirst("User_Id").Value;
                string token = HttpContext.User.FindFirst("Token").Value;

                try
                {
                    if (ModelState.IsValid)
                    {
                        ServiceResult result = new ServiceResult();

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
            catch (Exception)
            {

                RedirectToAction("Login", "Access");
            }


            return View();

        }

        public IActionResult PersonalizePackages()
        {
            return View();
        }
        public async Task<IActionResult> Details(int  id)
        {

            string token = HttpContext.User.FindFirst("Token").Value;
            var reservation = (ReservationListViewModel)(await _reservationService.ReservationFind(id, token)).Data;
           
            return View(reservation);
        }
    }
}
