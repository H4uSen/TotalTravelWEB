using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class RegistrationPaymentsController : Controller
    {
        private readonly SaleServices _saleServices;
        private readonly ReservationService _reservationServices;

        public RegistrationPaymentsController(SaleServices saleServices, ReservationService reservationServices)
        {
            _saleServices = saleServices;
            _reservationServices = reservationServices;
        }

        //[HttpGet]
        //public async Task<IActionResult> Index()
        //{
        //    var model = new List<Object>();
        //    string token = HttpContext.Session.("Token");

        //    PaymentRecordListViewModel payment = ((PaymentRecordListViewModel)(await _saleServices.PaymentRecordsList()).Data);
        //    ReservationListViewModel reservation = ((ReservationListViewModel)(await _reservationServices.ReservationFind(payment.Id_Reservacion, );
        //    return View(list.Data);
        //}
        
        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            PaymentRecordViewModel record = (PaymentRecordViewModel)(await _saleServices.PaymentRecordsFind(id, token)).Data;
            return View(record);
        }
    }
}
