﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
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
        public ReservationTransportationController(ReservationService reservationService)
        {
            _reservationService = reservationService;
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
    }
}
