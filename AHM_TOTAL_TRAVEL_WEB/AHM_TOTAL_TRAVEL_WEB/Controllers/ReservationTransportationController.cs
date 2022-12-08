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
    [Produces("multipart/form-data")]
    [Authorize(Policy = "MyPolicy")]
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
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                var model = new List<ReservationTransportationListViewModel>();
                var list = await _reservationService.transportationReservationList( token);
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
            try
            {
                var model = new List<ReservationExtraActivitiesViewModel>();
                string token = HttpContext.User.FindFirst("Token").Value;

                var reservacion = await _reservationService.ReservationList(token);
                List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
                data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });
   
                ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto");

                var transporte = await _transportService.TransportDetailsList(token);
                IEnumerable<TransportDetailsListViewModel> data_transporte = (IEnumerable<TransportDetailsListViewModel>)transporte.Data;
                ViewBag.Detr_ID = new SelectList(data_transporte, "ID", "Tipo_Transporte");

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }


        [HttpPost]
        public async Task<IActionResult> Create(ReservationTransportationViewModel  reservationTransportation)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    reservationTransportation.ReTr_UsuarioCreacion = 1;
                    var list = await _reservationService.transportationReservationCreate(reservationTransportation, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/ReservationTransportation?success=true");
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
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;

                var item = new ReservationTransportationViewModel();
                IEnumerable<ReservationTransportationListViewModel> model = null;
                var list = await _reservationService.transportationReservationList(token);
                IEnumerable<ReservationTransportationListViewModel> data = (IEnumerable<ReservationTransportationListViewModel>)list.Data;
                var element = data.Where(x => x.Id == id).ToList()[0];
                item.Resv_ID = element.Reservacion;
                item.Detr_ID = element.ID_detalle_Transporte;
                item.ReTr_CantidadAsientos = element.Asientos;
                item.ReTr_Cancelado = element.Cancelado;
                item.ReTr_FechaCancelado = element.Fecha_Cancelado;
                item.Resv_ID = element.Reservacion;
                item.Detr_ID = element.ID_detalle_Transporte;


                var transporte = await _transportService.TransportDetailsList(token);
                IEnumerable<TransportDetailsListViewModel> data_transporte = (IEnumerable<TransportDetailsListViewModel>)transporte.Data;
                ViewBag.Detr_ID = new SelectList(data_transporte, "ID", "Tipo_Transporte", element.ID_detalle_Transporte);



                var reservacion = await _reservationService.ReservationList(token);
                List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
                data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });
                ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto", element.Reservacion);


                return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Update(ReservationTransportationViewModel  reservationTransportation, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    reservationTransportation.ReTr_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                    var lista = await _reservationService.transportationReservationUpdate(reservationTransportation, id, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)lista.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/ReservationTransportation?success=true");
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
        public async Task<IActionResult> Delete(ReservationTransportationViewModel transporte, int id)
        {
            try
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
                var transporte = (ReservationTransportationListViewModel)(await _reservationService.TransportReservationFind(id, token)).Data;

                return View(transporte);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

    }
}
