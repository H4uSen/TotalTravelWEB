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

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<PartnerTypeListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;
            var Rol = await _accessService.RolesList(token);
            IEnumerable<RolListViewModel> data_rol = (IEnumerable<RolListViewModel>)Rol.Data;
            ViewBag.Rol_ID = new SelectList(data_rol, "ID", "Descripcion");
            var list = await _generalServices.PartnerTypeList(model);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var Rol = await _accessService.RolesList(token);
            IEnumerable<RolListViewModel> data_rol = (IEnumerable<RolListViewModel>)Rol.Data;
            ViewBag.Rol_ID = new SelectList(data_rol, "ID", "Descripcion");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(PartnerTypeViewModel TipoPartner)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                TipoPartner.TiPar_UsuarioCreacion = 1;
                var list = await _generalServices.PartnerTypeCreate(TipoPartner, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var Rol = await _accessService.RolesList(token);
            IEnumerable<RolListViewModel> data_rol = (IEnumerable<RolListViewModel>)Rol.Data;
            ViewBag.Rol_ID = new SelectList(data_rol, "ID", "Descripcion");


            var item = new PartnerTypeViewModel();
            IEnumerable<PartnerTypeListViewModel> model = null;
            var list = await _generalServices.PartnerTypeList(model);
            IEnumerable<PartnerTypeListViewModel> data = (IEnumerable<PartnerTypeListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.TiPar_ID = element.ID;
            item.TiPar_Descripcion = element.Descripcion;
            item.Rol_ID = element.Rol_Id;

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(PartnerTypeViewModel TipoPartner)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                //TipoPartner.TiPar_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                TipoPartner.TiPar_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                int id = TipoPartner.TiPar_ID;
                var lista = await _generalServices.PartnerTypeUpdate(TipoPartner, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
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

        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var transporte = (PartnerTypeListViewModel)(await _generalServices.PartnerTypeFind(id, token)).Data;

            return View(transporte);
        }
    }
}
