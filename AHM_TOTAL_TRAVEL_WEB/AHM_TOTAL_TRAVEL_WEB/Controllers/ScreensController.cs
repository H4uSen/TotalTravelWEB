using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ScreensController : Controller
    {
        private readonly GeneralService _GeneralServices;
        private readonly AccessService _AccessService;
        public ScreensController(GeneralService GeneralService, AccessService AccessService)
        {
            _GeneralServices = GeneralService;
            _AccessService = AccessService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var ModulesList = (IEnumerable<ModulesListViewModel>)(await _AccessService.ModulesList(token)).Data;
            ViewBag.modulos = new SelectList(ModulesList, "id_modulo", "modulo");
            var screensList = (IEnumerable<PermissionsListViewModel>)(await _AccessService.PermissionsList(token)).Data;
            return View(screensList);
        }
    }
}
