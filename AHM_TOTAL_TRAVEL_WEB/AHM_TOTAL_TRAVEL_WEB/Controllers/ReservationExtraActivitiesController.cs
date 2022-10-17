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

            IEnumerable<ReservationListViewModel> model_Country = null;
            var country = await _reservationService.ReservationList();
            IEnumerable<ReservationListViewModel> data_Country = (IEnumerable<ReservationListViewModel>)country.Data;
            ViewBag.Resv_ID = new SelectList(data_Country, "ID", "Reservacion");


            //---------------------------------------
            var token = HttpContext.User.FindFirst("Token").Value;

            var city = await _activitiesServices.ExtraActivitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");


            var model = new List<ReservationExtraActivitiesListViewModel>();
            var list = await _reservationService.ExtraActivitiesReservationList(model, token);
            return View(list.Data);
        }


        [HttpGet]
        public async Task<IActionResult> Create()
        {

            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Create(ReservationExtraActivitiesViewModel  reservationExtraActivities)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
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
    }

}
