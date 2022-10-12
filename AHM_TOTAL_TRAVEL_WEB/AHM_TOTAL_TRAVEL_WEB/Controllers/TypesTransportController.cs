using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class TypesTransportController : Controller
    {
       
        private readonly TransportService _transportService;
        public TypesTransportController(TransportService transportService)
        {
            _transportService = transportService;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<TypesTransportListViewModel>();
            var list = await _transportService.TypesTransportList();
            return View(list.Data);
        }
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(TypesTransportViewModel transporte)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                transporte.TiTr_UsuarioCreacion = int.Parse(id);
                var list = await _transportService.TypesTransportCreate(transporte, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
