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

    public class ReservationExtraActivitiesController : Controller
    {
         private readonly ReservationService _reservationService;
        private readonly ActivitiesServices _activitiesServices;
        public ReservationExtraActivitiesController(ReservationService reservationService, ActivitiesServices activitiesServices )
        {
            _reservationService = reservationService;
            _activitiesServices = activitiesServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            var model = new List<ReservationExtraActivitiesListViewModel>();
            var list = await _reservationService.ExtraActivitiesReservationList( token);
            return View(list.Data);
        }


        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<ReservationExtraActivitiesViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;

            var reservacion = await _reservationService.ReservationList(token);
            List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
            data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });

            ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto");


            var actividad = await _activitiesServices.ExtraActivitiesList(token);
            IEnumerable<ActivitiesExtrasListViewModel> data_actividad = (IEnumerable<ActivitiesExtrasListViewModel>)actividad.Data;
            ViewBag.AcEx_ID = new SelectList(data_actividad, "ID", "Actividad");



            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Create(ReservationExtraActivitiesViewModel  reservationExtraActivities)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                reservationExtraActivities.ReAE_UsuarioCreacion = 1;
                var list = await _reservationService.ExtraActivitiesReservationCreate(reservationExtraActivities, token);

                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/ReservationExtraActivities?success=true");
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


        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            var item = new ReservationExtraActivitiesViewModel();
            IEnumerable<ReservationExtraActivitiesListViewModel> model = null;
            var list = await _reservationService.ExtraActivitiesReservationList(token);
            IEnumerable<ReservationExtraActivitiesListViewModel> data = (IEnumerable<ReservationExtraActivitiesListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Resv_ID = element.Reservacion;
            item.ReAE_ID = element.Id_Actividad_Extra;
            item.ReAE_Cantidad = element.Cantidad;
            item.ReAE_FechaReservacion = element.Fecha_Reservacion;
            item.ReAE_HoraReservacion = element.Hora_Reservacion;
            item.Resv_ID = element.Reservacion;
            item.ReAE_ID = element.Id_Actividad_Extra;



            var actividad = await _activitiesServices.ExtraActivitiesList(token);
            IEnumerable<ActivitiesExtrasListViewModel> data_actividad = (IEnumerable<ActivitiesExtrasListViewModel>)actividad.Data;
            ViewBag.AcEx_ID = new SelectList(data_actividad, "ID", "Actividad", element.Id_Actividad_Extra);

            var reservacion = await _reservationService.ReservationList(token);
            List<ReservationListViewModel> data_reservacion = (List<ReservationListViewModel>)reservacion.Data;
            data_reservacion.ForEach(item => { item.NombreCompleto = string.Concat(item.Nombre, " ", item.Apellido); });

            ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "NombreCompleto");

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(ReservationExtraActivitiesViewModel reservacionActividadExtra, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                reservacionActividadExtra.ReAE_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _reservationService.ExtraActivitiesReservationUpdate(reservacionActividadExtra, id, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)lista.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/ReservationExtraActivities?success=true");
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

        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var actividad = (ReservationExtraActivitiesListViewModel)(await _reservationService.ExtraActivitiesReservationFind(id, token)).Data;

            return View(actividad);
        }


        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                
               int modifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _reservationService.ExtraActivitiesReservationDelete(modifica, id, token)).Data;

                return Ok(list.CodeStatus);
            }   
            else
            {
                return View();
            }
        }


    }

}
