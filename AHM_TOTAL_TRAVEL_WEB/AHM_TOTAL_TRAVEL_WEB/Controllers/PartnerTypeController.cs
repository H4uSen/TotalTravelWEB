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
        [AllowAnonymous]
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


    }
}
