using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
    public class ReservationActivitiesHotelsController : Controller
    {
        private readonly ReservationService _reservationService;
        private readonly HotelsService _hotelsService;

        public ReservationActivitiesHotelsController(ReservationService reservationService, HotelsService hotelsService)
        {
            _reservationService = reservationService;
            _hotelsService = hotelsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;

            var model = new List<ReservationActivitiesHotelsListViewModel>();
            var list = await _reservationService.ReservationActivitiesHotelsList(token);
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
            try { 
            var model = new List<ReservationActivitiesHotelsViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;

            var reservacion = await _reservationService.ReservationList(token);
            List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
            data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });
            ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto");

            //var hotel = await _hotelsService.HotelsActivitiesList(token);
            //IEnumerable<HotelsActivitiesListViewModel> data_hotel = (IEnumerable<HotelsActivitiesListViewModel>)hotel.Data;
            //ViewBag.Hote_ID = new SelectList(data_hotel, "ID", "Hotel");

            var hotelactividad = await _hotelsService.HotelsActivitiesList(token);
            IEnumerable<HotelsActivitiesListViewModel> data_hotelactividad = (IEnumerable<HotelsActivitiesListViewModel>)hotelactividad.Data;
            ViewBag.AcEx_ID = new SelectList(data_hotelactividad, "ID", "Actividad");



            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReservationActivitiesHotelsViewModel reserva)
        {
            try { 
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    var id = HttpContext.User.FindFirst("User_Id").Value;
                    reserva.ReAH_UsuarioCreacion = int.Parse(id);
                    var list = await _reservationService.ReservationActivitiesHotelsCreate(reserva, token);

                    var l = ((RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/ReservationActivitiesHotels?success=true");
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;

            var item = new ReservationActivitiesHotelsViewModel();
            IEnumerable<ReservationActivitiesHotelsListViewModel> model = null;
            var list = await _reservationService.ReservationActivitiesHotelsList(token);
            IEnumerable<ReservationActivitiesHotelsListViewModel> data = (IEnumerable<ReservationActivitiesHotelsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Resv_ID = element.ReservacionID;
            item.HoAc_ID = element.ID_Actividad;
            item.ReAH_Cantidad = element.Cantidad;
            item.ReAH_FechaReservacion = element.Fecha_Reservacion;
            item.ReAH_HoraReservacion = element.Hora_Reservacion;



            var actividad = await _hotelsService.HotelsActivitiesList(token);
            IEnumerable<HotelsActivitiesListViewModel> data_actividad = (IEnumerable<HotelsActivitiesListViewModel>)actividad.Data;
            ViewBag.AcEx_ID = new SelectList(data_actividad, "ID", "Actividad");

            var hotel = await _hotelsService.HotelsActivitiesList(token);
            IEnumerable<HotelsActivitiesListViewModel> data_hotel = (IEnumerable<HotelsActivitiesListViewModel>)hotel.Data;
            ViewBag.Hote_ID = new SelectList(data_hotel, "ID", "Hotel");

            var reservacion = await _reservationService.ReservationList(token);
            List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
            data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });

            ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto");

            return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(ReservationActivitiesHotelsViewModel reserva)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                reserva.ReAH_UsuarioModifica = int.Parse(idd);
                var list = await _reservationService.ReservationActivitiesHotelsUpdate(reserva, token);

                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/ReservationActivitiesHotels?success=true");
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ReservationActivitiesHotelsViewModel reserva, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                reserva.ReAH_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _reservationService.ReservationActivitiesHotelsDelete(reserva, id, token)).Data;

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
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var reserva = (ReservationActivitiesHotelsListViewModel)(await _reservationService.ReservationActivitiesHotelsFind(id, token)).Data;

            return View(reserva);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
