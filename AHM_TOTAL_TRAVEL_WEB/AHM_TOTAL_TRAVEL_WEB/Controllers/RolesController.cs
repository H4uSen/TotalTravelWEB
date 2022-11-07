using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "Admin")]
    public class RolesController : Controller
    {

        private readonly GeneralService _GeneralServices;
        private readonly AccessService _AccessService;
        public RolesController(GeneralService GeneralService, AccessService AccessService)
        {
            _GeneralServices = GeneralService;
            _AccessService = AccessService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<RolListViewModel> RolesList = (IEnumerable<RolListViewModel>)(await _AccessService.RolesList(token)).Data;
            return View(RolesList);
        }

        [HttpPost]
        public async Task<IActionResult> Create(RolViewModel roles)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                roles.Role_UsuarioCreacion = Convert.ToInt32(UserID);
                var list = await _AccessService.RolesCreate(roles, token);
                IEnumerable<RolListViewModel> RolesList = (IEnumerable<RolListViewModel>)(await _AccessService.RolesList(token)).Data;
                return View("Index",RolesList);
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(RolViewModel roles)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                roles.Role_UsuarioModifica = int.Parse(idd);
                var lista = await _AccessService.RolesUpdate(roles,token);
                IEnumerable<RolListViewModel> RolesList = (IEnumerable<RolListViewModel>)(await _AccessService.RolesList(token)).Data;
                return View("Index",RolesList);
            }
            else
            {
                return View();
            }
        }
    }
}
