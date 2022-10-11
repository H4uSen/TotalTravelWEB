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
        RegistrationPaymentsService  _registrationPaymentsService;
        public RegistrationPaymentsController(RegistrationPaymentsService  registrationPaymentsService)
        {
            _registrationPaymentsService = registrationPaymentsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<RegistrationPaymentsListViewModel>();
            var list = await _registrationPaymentsService.RegistrationPaymentsList(model);
            return View(list.Data);
        }
    }
}
