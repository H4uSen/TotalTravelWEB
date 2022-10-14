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
    public class PartnerTypeController : Controller
    {
        GeneralService _generalServices;

        public PartnerTypeController(GeneralService generalServices)
        {
            _generalServices = generalServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<PartnerTypeListViewModel>();
            var list = await _generalServices.PartnerTypeList(model);
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
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

            var item = new PartnerTypeViewModel();
            IEnumerable<PartnerTypeListViewModel> model = null;
            var list = await _generalServices.PartnerTypeList(model);
            IEnumerable<PartnerTypeListViewModel> data = (IEnumerable<PartnerTypeListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.TiPar_Descripcion = element.Descripcion;
            item.Rol_ID = element.Rol_Id;

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(PartnerTypeViewModel TipoPartner, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                //TipoPartner.TiPar_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                TipoPartner.TiPar_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _generalServices.PartnerTypeUpdate(TipoPartner, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(PartnerTypeViewModel TipoPartner, int id)
        {
            if (ModelState.IsValid)
            {
                TipoPartner.TiPar_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _generalServices.PartnerTypeDelete(TipoPartner, id, token);

                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }

    }
}
