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

            var reservasion = await _reservationService.ReservationList(token);
            IEnumerable<ReservationListViewModel> data_reservacion = (IEnumerable<ReservationListViewModel>)reservasion.Data;
            ViewBag.Resv_ID = new SelectList(data_reservacion, "ID", "DescripcionPaquete");


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

        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var actividad = (ReservationExtraActivitiesListViewModel)(await _reservationService.ExtraActivitiesReservationFind(id, token)).Data;

            return View(actividad);
        }


        [HttpPost]
        public async Task<IActionResult> Delete(ReservationExtraActivitiesViewModel actividadesextras, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                actividadesextras.ReAE_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _reservationService.ExtraActivitiesReservationDelete(actividadesextras, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
        }


    }

}
