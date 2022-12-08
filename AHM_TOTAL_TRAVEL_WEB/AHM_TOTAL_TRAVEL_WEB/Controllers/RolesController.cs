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

        [HttpPost]
        public async Task<IActionResult> Create(RolViewModel roles)
        {
            try { 
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(RolViewModel roles)
        {
            try { 
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Delete(RolViewModel roles, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                roles.Role_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _AccessService.DeleteRoles(roles, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
