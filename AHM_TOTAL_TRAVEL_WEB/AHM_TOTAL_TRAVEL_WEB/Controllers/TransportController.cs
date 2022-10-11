using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class TransportController : Controller
    {
        private readonly TransportService _transportService;

        public TransportController(TransportService transportService)
        {
            _transportService = transportService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<TransportListViewModel>();
            var list = await _transportService.TransportList(model);
            return View(list.Data);
        }
    }
}
