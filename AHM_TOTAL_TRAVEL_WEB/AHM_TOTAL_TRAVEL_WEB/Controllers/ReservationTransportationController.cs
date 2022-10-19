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
    [Produces("multipart/form-data")]

    public class ReservationTransportationController : Controller
    {
         private readonly ReservationService _reservationService;
        private readonly TransportService _transportService;
        public ReservationTransportationController(ReservationService reservationService, TransportService transportService)
        {
            _reservationService = reservationService;
            _transportService = transportService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<ReservationTransportationListViewModel>();
            var list = await _reservationService.transportationReservationList( token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<ReservationExtraActivitiesViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;

            var reservasion = await _reservationService.ReservationList(token);
            IEnumerable<ReservationListViewModel> data_reservacion = (IEnumerable<ReservationListViewModel>)reservasion.Data;
            ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "DescripcionPaquete");


            var transporte = await _transportService.TransportDetailsList(token);
            IEnumerable<TransportDetailsListViewModel> data_transporte = (IEnumerable<TransportDetailsListViewModel>)transporte.Data;
            ViewBag.Detr_ID = new SelectList(data_transporte, "ID", "Tipo_Transporte");

            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Create(ReservationTransportationViewModel  reservationTransportation)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                reservationTransportation.ReTr_UsuarioCreacion = 1;
                var list = await _reservationService.transportationReservationCreate(reservationTransportation, token);
                if (list.Success)
                {
                    return RedirectToAction("Index");
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

        //[HttpGet]
        //public async Task<IActionResult> Update(int id)
        //{
        //    string token = HttpContext.User.FindFirst("Token").Value;

        //    var item = new ReservationTransportationViewModel();
        //    IEnumerable<ReservationTransportationListViewModel> model = null;
        //    var list = await _reservationService.RestaurantsReservationList(token);
        //    IEnumerable<ReservationTransportationListViewModel> data = (IEnumerable<ReservationTransportationListViewModel>)list.Data;
        //    var element = data.Where(x => x.Id == id).ToList()[0];
        //    item.Resv_ID = element.Reservacion;
        //    item.ReTr_ID = element.;
        //    item.ReRe_FechaReservacion = element.Fecha_Reservacion;
        //    item.ReRe_HoraReservacion = element.Hora_Reservacion;
        //    item.Resv_ID = element.Id;
        //    item.Rest_ID = element.ID_Restaurante;


        //    var restaurante = await _transportService.TransportList();
        //    IEnumerable<RestaurantListViewModel> data_restaurante = (IEnumerable<RestaurantListViewModel>)restaurante.Data;
        //    ViewBag.Rest_ID = new SelectList(data_restaurante, "ID", "Restaurante", element.ID_Restaurante);

        //    var reservacion = await _reservationService.ReservationList(token);
        //    IEnumerable<ReservationListViewModel> data_Horario = (IEnumerable<ReservationListViewModel>)reservacion.Data;
        //    ViewBag.Resv_ID = new SelectList(data_Horario, "ID", "DescripcionPaquete", element.Id);

        //    return View(item);

        //}

        [HttpPost]
        public async Task<IActionResult> Update(ReservationTransportationViewModel  reservationTransportation, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                reservationTransportation.ReTr_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _reservationService.transportationReservationUpdate(reservationTransportation, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(ReservationTransportationViewModel transporte, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                transporte.ReTr_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _reservationService.TransportReservationDelete(transporte, id, token)).Data;

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
            var transporte = (ReservationTransportationListViewModel)(await _reservationService.TransportReservationFind(id, token)).Data;

            return View(transporte);
        }

    }
}
