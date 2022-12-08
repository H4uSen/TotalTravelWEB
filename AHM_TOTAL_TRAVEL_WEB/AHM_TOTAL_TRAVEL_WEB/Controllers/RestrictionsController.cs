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
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<RolListViewModel> RolesList = (IEnumerable<RolListViewModel>)(await _AccessService.RolesList(token)).Data;
            return View(RolesList);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
