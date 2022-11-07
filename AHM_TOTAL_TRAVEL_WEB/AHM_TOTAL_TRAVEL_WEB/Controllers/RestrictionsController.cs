using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class RestrictionsController : Controller
    {
        private readonly AccessService _AccessService;
        public RestrictionsController(AccessService AccessService)
        {
            _AccessService = AccessService;
        }

        public async Task<IActionResult> Index()
        {
            /*
            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<PermissionsViewModel> pantallas = 
                (IEnumerable<PermissionsViewModel>)(await _AccessService.PermissionsList(token)).Data;

            IEnumerable<PermissionsViewModel> roles =
                (IEnumerable<PermissionsViewModel>)(await _AccessService.PermissionsList(token)).Data;

            var model = pantallas.GroupBy(x => x.id_modulo).ToList();*/
            return View();
        }
    }
}
