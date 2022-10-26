using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
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
            try
            {
                List<PaymentRecordListViewModel> payments = ((List<PaymentRecordListViewModel>)(await _saleServices.PaymentRecordsList()).Data);
                return View(payments);

            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
            
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(PaymentRecordViewModel payment)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    payment.RePa_UsuarioCreacion = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                    var list = await _saleServices.PaymentRecordCreate(payment, token);
                    return RedirectToAction("Index");

                }
                catch (Exception)
                {

                    return RedirectToAction("Error", "Home");
                }
                
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(string id)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                PaymentRecordListViewModel PaymentRequest =
                (PaymentRecordListViewModel)(await _saleServices.PaymentRecordsFind(id, token)).Data;

                ViewData["Payment_ID"] = PaymentRequest.ID;

                return View(PaymentRequest);
            }
            catch (Exception)
            {

                return RedirectToAction("Error", "Home");
            }
            
            

        }

        [HttpPost]
        public async Task<IActionResult> Update(PaymentRecordViewModel payment)
        {

            if (ModelState.IsValid)
            {
                try
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    payment.RePa_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                    var response = (RequestStatus)(await _saleServices.PaymentRecordUpdate(payment, token)).Data;

                    if (response.CodeStatus > 0)
                    {
                        return RedirectToAction("Index");
                    }
                    else
                    {
                        PaymentRecordListViewModel paymentRequest =
                            (PaymentRecordListViewModel)(await _saleServices.PaymentRecordsFind(payment.TiPa_ID.ToString(), token)).Data;
                        ViewData["Payment_ID"] = paymentRequest.ID;
                        return View(paymentRequest);
                    }
                }
                catch (Exception)
                {

                    return RedirectToAction("Error", "Home");
                }
                
            }
            else
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                PaymentRecordListViewModel paymentRequest =
                        (PaymentRecordListViewModel)(await _saleServices.PaymentRecordsFind(payment.RePa_ID.ToString(), token)).Data;
                ViewData["Payment_ID"] = paymentRequest.ID;
                return View(paymentRequest);
            }

        }
        public async Task<IActionResult> Delete(PaymentRecordViewModel RePa, int id)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    RePa.RePa_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                    string token = HttpContext.User.FindFirst("Token").Value;
                    var list = await _saleServices.PaymentRecordDelete(RePa, id, token);

                    return RedirectToAction("Index");
                }
                catch (Exception)
                {

                    return RedirectToAction("Error", "Home");
                }
                
            }
            else
            {
                return View();
            }
        }



        [HttpGet]
        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            try
            {
                PaymentRecordListViewModel record = (PaymentRecordListViewModel)(await _saleServices.PaymentRecordsFind(id, token)).Data;
                return View(record);
            }
            catch (Exception e)
            {
                return RedirectToAction("Error", "Home");
            }
            
        }
    }
}
