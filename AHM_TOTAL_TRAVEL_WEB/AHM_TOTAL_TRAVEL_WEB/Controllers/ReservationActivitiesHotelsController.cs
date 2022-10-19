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
            var token = HttpContext.User.FindFirst("Token").Value;
            //var id = HttpContext.User.FindFirst("User_Id").Value;
            //var cuenta = (ReservationDetailsListViewModel)(await _reservationService.ReservationDetailsFind(id, token)).Data;
            var actividad = await _hotelsService.HotelsActivitiesList(token);
            IEnumerable<HotelsActivitiesListViewModel> data_actividad = (IEnumerable<HotelsActivitiesListViewModel>)actividad.Data;
            ViewBag.HoAc_ID = new SelectList(data_actividad, "ID", "Actividad");
            var reserva = await _reservationService.ReservationHotelsList(token);
            IEnumerable<ReservationListViewModel> data_reserva = (IEnumerable<ReservationListViewModel>)reserva.Data;
            ViewBag.ReHo_ID = new SelectList(data_reserva, "ID", "Nombre");
            var list = await _reservationService.ReservationActivitiesHotelsList(token);

            //var fechahotel1 = cuenta.Fecha_Entrada.ToString().Split(" ");
            //ViewData["Fechahotel1"] = fechahotel1[0];
            //var fechahotel2 = cuenta.Fecha_Salida.ToString().Split(" ");
            //ViewData["Fechahotel2"] = fechahotel2[0];
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReservationActivitiesHotelsViewModel reserva)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                reserva.ReAH_UsuarioCreacion = int.Parse(id);
                var list = await _reservationService.ReservationActivitiesHotelsCreate(reserva, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var item = new ReservationActivitiesHotelsViewModel();
            var list = await _reservationService.ReservationActivitiesHotelsList(token);
            IEnumerable<ReservationActivitiesHotelsListViewModel> data = (IEnumerable<ReservationActivitiesHotelsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.ReAH_ID = element.ID;
            item.Resv_ID = element.ReservacionID;
            item.HoAc_ID = element.ID_Actividad;

            return View(item);
        }

        [HttpPost]
        public async Task<IActionResult> Update(ReservationActivitiesHotelsViewModel reserva)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                reserva.ReAH_UsuarioModifica = int.Parse(idd);
                var lista = await _reservationService.ReservationActivitiesHotelsUpdate(reserva, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ReservationActivitiesHotelsViewModel reserva, int id)
        {
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

        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var reserva = (ReservationActivitiesHotelsListViewModel)(await _reservationService.ReservationActivitiesHotelsFind(id, token)).Data;

            return View(reserva);
        }
    }
}
