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
    public class BuyDefaultsController : Controller
    {
        SaleServices _saleServices;


        public BuyDefaultsController(SaleServices saleServices)
        {
            _saleServices = saleServices;          
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<DefaultPackagesListViewModel>();
            var list = await _saleServices.DefaultPackagesList(token);
            return View(list.Data);
        }
    }
}