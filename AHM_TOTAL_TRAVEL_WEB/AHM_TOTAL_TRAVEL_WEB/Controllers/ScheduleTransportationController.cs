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
    public class ScheduleTransportationController : Controller
    {
        TransportService _transportService;

        public  ScheduleTransportationController(TransportService transportService)
        {
            _transportService = transportService;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var destiny = await _transportService.TransportDestionationsList();
            IEnumerable<DestinationsTransportationsListViewModel> data_Destiny = (IEnumerable<DestinationsTransportationsListViewModel>)destiny.Data;
            ViewBag.TiAc_ID = new SelectList(data_Destiny, "ID", "CiudadSalida");
            var list =  await _transportService.ScheduleTransportationList();
            return View(list.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(ScheduleTransportationViewModel horarios)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            horarios.HoTr_UsuarioCreacion = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
            RequestStatus response = (RequestStatus)(await _transportService.ScheduleTransportationCreate(horarios, token)).Data;
            return View();
        }
        
        [HttpPost]
        public async Task<IActionResult> Update(ScheduleTransportationViewModel horarios, int id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            horarios.HoTr_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
            RequestStatus response = (RequestStatus)(await _transportService.ScheduleTransportationCreate(horarios, token)).Data;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ScheduleTransportationViewModel horarios, int id)
        {
            if (ModelState.IsValid)
            {
                horarios.HoTr_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _transportService.ScheduleTransportationDelete(horarios, id,token);

                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }
    }
}
