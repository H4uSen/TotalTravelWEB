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
    public class ReservationDetailsController : Controller
    {
        private readonly ReservationService _reservationService;
        private readonly HotelsService _hotelsService;

        public ReservationDetailsController(ReservationService reservationService, HotelsService hotelsService)
        {
            _reservationService = reservationService;
            _hotelsService = hotelsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                //var id = HttpContext.User.FindFirst("User_Id").Value;
                //var cuenta = (ReservationDetailsListViewModel)(await _reservationService.ReservationDetailsFind(id, token)).Data;
                var hotel = await _hotelsService.HotelsList(token);
                IEnumerable<HotelListViewModel> data_hotel = (IEnumerable<HotelListViewModel>)hotel.Data;
                ViewBag.Hote_ID = new SelectList(data_hotel, "ID", "Hotel");
                var reshotel = await _reservationService.ReservationHotelsList(token);
                IEnumerable<ReservationHotelsListViewModel> data_reshotel = (IEnumerable<ReservationHotelsListViewModel>)reshotel.Data;
                ViewBag.ReHo_ID = new SelectList(data_reshotel, "ID", "ReservacionID");
                var list = await _reservationService.ReservationDetailsList(token);

                //var fechahotel1 = cuenta.Fecha_Entrada.ToString().Split(" ");
                //ViewData["Fechahotel1"] = fechahotel1[0];
                //var fechahotel2 = cuenta.Fecha_Salida.ToString().Split(" ");
                //ViewData["Fechahotel2"] = fechahotel2[0];
                return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReservationDetailsViewModel detallereserva)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    var id = HttpContext.User.FindFirst("User_Id").Value;
                    detallereserva.ReDe_UsuarioCreacion = int.Parse(id);
                    var list = await _reservationService.ReservationDetailsCreate(detallereserva, token);
                    return RedirectToAction("Index");
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

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var item = new ReservationDetailsViewModel();
                var list = await _reservationService.ReservationDetailsList(token);
                IEnumerable<ReservationDetailsListViewModel> data = (IEnumerable<ReservationDetailsListViewModel>)list.Data;
                var element = data.Where(x => x.ID == id).ToList()[0];
                item.ReDe_ID = element.ID;
                //item.Habi_ID = element.;
                //item.Ciud_ID = element.CiudadID;

                var habitacion = (RoomsListViewModel)(await _hotelsService.RoomsFind(item.Habi_ID.ToString(), token)).Data;

                ViewData["Habitacion"] = habitacion.Habitacion;

                return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(ReservationDetailsViewModel detallereserva)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    var idd = HttpContext.User.FindFirst("User_Id").Value;
                    detallereserva.ReDe_UsuarioModifica = int.Parse(idd);
                    var lista = await _reservationService.ReservationDetailsUpdate(detallereserva, token);
                    return RedirectToAction("Index");
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

        [HttpPost]
        public async Task<IActionResult> Delete(ReservationDetailsViewModel detallereserva, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ServiceResult result = new ServiceResult();
                    var idd = HttpContext.User.FindFirst("User_Id").Value;
                    detallereserva.ReDe_UsuarioModifica = int.Parse(idd);

                    string token = HttpContext.User.FindFirst("Token").Value;
                    var list = (RequestStatus)(await _reservationService.ReservationDetailsDelete(detallereserva, id, token)).Data;

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

        public async Task<IActionResult> Details(string id)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var reservadetalle = (ReservationDetailsListViewModel)(await _reservationService.ReservationDetailsFind(id, token)).Data;

                return View(reservadetalle);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
