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
        


        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<Object>();
            string token = HttpContext.User.FindFirst("User_Id").Value;

            List<PaymentRecordListViewModel> payments = ((List<PaymentRecordListViewModel>)(await _saleServices.PaymentRecordsList()).Data);
            return View(payments);
        }

        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            var model = new List<PaymentRecordViewModel>();
            var list = await _saleServices.PaymentRecordsList();
            string token = HttpContext.User.FindFirst("Token").Value;
            PaymentRecordViewModel record = (PaymentRecordViewModel)(await _saleServices.PaymentRecordsFind(id, token)).Data;
            return View(record);
        }
    }
}
