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
    public class AccountController : Controller
    {
        private readonly AccessService _accessService;
        private readonly GeneralService _generalService;



        public AccountController(AccessService accessService, GeneralService generalService)
        {
            _accessService = accessService;
            _generalService = generalService;
        }

        //[HttpGet]
        public async Task<IActionResult>Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var CiudadesList = (IEnumerable<CityListViewModel>) (await _generalService.CitiesList(token)).Data;
            ViewBag.Ciudades = new SelectList(CiudadesList, "ID", "Ciudad");
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            return View(cuenta);
        }

        //public async Task<IActionResult> EditAccount()
        //{
        //    var id = HttpContext.User.FindFirst("User_Id").Value;
        //    var token = HttpContext.User.FindFirst("Token").Value;
        //    var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

        //    return View(cuenta);
        //}
    }
}
