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
    public class PartnerTypeController : Controller
    {
        GeneralService _generalServices;
        AccessService _accessService;

        public PartnerTypeController(GeneralService generalServices,AccessService accessService)
        {
            _generalServices = generalServices;
            _accessService = accessService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var Rol = await _accessService.RolesList(token);
            IEnumerable<RolListViewModel> data_rol = (IEnumerable<RolListViewModel>)Rol.Data;
            ViewBag.Rol_ID = new SelectList(data_rol, "ID", "Descripcion");

            var list = await _generalServices.PartnerTypeList();
            return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        //[HttpGet]
        //public async Task<IActionResult> Create()
        //{
        //    string token = HttpContext.User.FindFirst("Token").Value;
        //    var Rol = await _accessService.RolesList(token);
        //    IEnumerable<RolListViewModel> data_rol = (IEnumerable<RolListViewModel>)Rol.Data;
        //    ViewBag.Rol_ID = new SelectList(data_rol, "id", "descripcion");

        //    return View();
        //}

        [HttpPost]
        public async Task<IActionResult> Create(PartnerTypeViewModel TipoPartner)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                TipoPartner.TiPar_UsuarioCreacion = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _generalServices.PartnerTypeCreate(TipoPartner, token);
                return Redirect("~/PartnerType?success=true");
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
        public async Task<IActionResult> Update(int id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var Rol = await _accessService.RolesList(token);
            IEnumerable<RolListViewModel> data_rol = (IEnumerable<RolListViewModel>)Rol.Data;
            ViewBag.Rol_ID = new SelectList(data_rol, "ID", "Descripcion");


            var item = new PartnerTypeViewModel();
            var list = await _generalServices.PartnerTypeList();
            IEnumerable<PartnerTypeListViewModel> data = (IEnumerable<PartnerTypeListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.TiPar_ID = element.ID;
            item.TiPar_Descripcion = element.Descripcion;
            item.Rol_ID = element.Rol_Id;

            ViewData["Rol_IDview"] = item.Rol_ID;


            return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(PartnerTypeViewModel TipoPartner)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                //TipoPartner.TiPar_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                TipoPartner.TiPar_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var id = TipoPartner.TiPar_ID;
                var lista = await _generalServices.PartnerTypeUpdate(TipoPartner, id, token);
                return Redirect("~/PartnerType?success=true");
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
        public async Task<IActionResult> Delete(int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                int modifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _generalServices.PartnerTypeDelete(modifica, id, token)).Data;

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

        public async Task<IActionResult> Details(string id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var transporte = (PartnerTypeListViewModel)(await _generalServices.PartnerTypeFind(id, token)).Data;

            return View(transporte);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
