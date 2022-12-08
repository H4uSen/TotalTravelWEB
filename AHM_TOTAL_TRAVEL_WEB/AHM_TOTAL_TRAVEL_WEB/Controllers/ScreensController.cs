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
    [Authorize(Policy = "MyPolicy")]
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
            try { 
            ScreenPermissionsViewModel screenPermissions = new ScreenPermissionsViewModel();
            string token = HttpContext.User.FindFirst("Token").Value;
            var ModulesList = (IEnumerable<ModulesListViewModel>)(await _AccessService.ModulesList(token)).Data;
            var screensList = (IEnumerable<PermissionsListViewModel>)(await _AccessService.PermissionsList(token)).Data;
            var navbarItemsList = (IEnumerable<navbarItemsListViewModel>)(await _AccessService.navbarItemsList(token)).Data;

            ViewBag.modulos = new SelectList(ModulesList, "id_modulo", "modulo");
            ViewBag.items = new SelectList(navbarItemsList, "ID", "nombre_grupo");

            screenPermissions.Permisos = screensList;
            screenPermissions.items = navbarItemsList;
            screenPermissions.Modulos = ModulesList;

            return View(screenPermissions);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(PermissionsViewModel model)
        {
            try {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                model.Perm_UsuarioModifica = int.Parse(idd);
                var lista = await _AccessService.PermisosUpdate(model, token);
                IEnumerable<PermissionsListViewModel> PermissionsList = (IEnumerable<PermissionsListViewModel>)(await _AccessService.PermissionsList(token)).Data;
                return View("Index", PermissionsList);
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
        public async Task<IActionResult> Delete(PermissionsViewModel Screen, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                Screen.Perm_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _AccessService.PermissionsDelete(Screen, id, token)).Data;

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


        [HttpPost]
        public async Task<IActionResult> DeleteModule(ModulesViewModel module, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                module.Modu_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _AccessService.ModulesDelete(module, id, token)).Data;

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
