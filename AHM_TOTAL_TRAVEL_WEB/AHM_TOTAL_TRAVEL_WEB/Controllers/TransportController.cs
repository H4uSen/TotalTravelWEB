using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class TransportController : Controller
    {
        private readonly TransportService _transportService;

        public TransportController(TransportService transportService)
        {
            _transportService = transportService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {
            var list = await _transportService.TransportList();
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(TransportViewModel transporte)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                transporte.Tprt_UsuarioCreacion = int.Parse(id);
                var list = await _transportService.TransportCreate(transporte, token);
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
            var item = new TransportViewModel();
            var list = await _transportService.TransportList();
            IEnumerable<TransportListViewModel> data = (IEnumerable<TransportListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Tprt_ID = element.ID;
            item.TiTr_ID = element.TipoTransporteID;
            item.Part_ID = element.PartnerID;
            item.Dire_ID = element.DireccionId;

            return View(item);
        }

        [HttpPost]
        public async Task<IActionResult> Update(TransportViewModel transporte)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                transporte.Tprt_UsuarioModifica = int.Parse(idd);
                var lista = await _transportService.TransportUpdate(transporte, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
    }
}
