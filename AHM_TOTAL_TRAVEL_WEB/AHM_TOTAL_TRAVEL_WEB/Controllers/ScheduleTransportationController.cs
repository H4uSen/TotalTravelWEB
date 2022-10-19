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
            ViewBag.DsTr_ID = new SelectList(data_Destiny, "ID", "CiudadSalida");
            var list =  await _transportService.ScheduleTransportationList();
            return View(list.Data);
        }
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var destiny = await _transportService.TransportDestionationsList();
            IEnumerable<DestinationsTransportationsListViewModel> data_Destiny = (IEnumerable<DestinationsTransportationsListViewModel>)destiny.Data;
            ViewBag.HoTr_ID = new SelectList(data_Destiny, "ID", "CiudadSalida");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ScheduleTransportationViewModel horarios)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            horarios.HoTr_UsuarioCreacion = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
            string horaSalida = horarios.HoTr_HoraSalida;
            string horaLlegada = horarios.HoTr_HoraLlegada;
            string[] HoraSalidaResult = horaSalida.Split(":", 2, StringSplitOptions.None);
            string[] HoraLlegadaResult = horaLlegada.Split(":", 2, StringSplitOptions.None);
            horarios.HoTr_HoraSalida = HoraSalidaResult[0].ToString() + HoraSalidaResult[1];
            horarios.HoTr_HoraLlegada = HoraLlegadaResult[0].ToString() + HoraLlegadaResult[1];
            RequestStatus response = (RequestStatus)(await _transportService.ScheduleTransportationCreate(horarios, token)).Data;
            return RedirectToAction("Index");
        }
        
        [HttpPost]
        public async Task<IActionResult> Update(ScheduleTransportationViewModel horarios, int id)
        {
            string Fecha = horarios.HoTr_Fecha.ToString();
            string horaSalida = horarios.HoTr_HoraSalida;
            string horaLlegada = horarios.HoTr_HoraLlegada;
            string[] HoraSalidaResult = horaSalida.Split(":",2,StringSplitOptions.None);
            string[] HoraLlegadaResult = horaLlegada.Split(":", 2, StringSplitOptions.None);
            string[] FechaResult = Fecha.Split(" ", 2, StringSplitOptions.None);
            horarios.HoTr_HoraSalida = HoraSalidaResult[0].ToString() + HoraSalidaResult[1];
            horarios.HoTr_HoraLlegada = HoraLlegadaResult[0].ToString() + HoraLlegadaResult[1];
            horarios.HoTr_Fecha = FechaResult[0];
            string token = HttpContext.User.FindFirst("Token").Value;
            horarios.HoTr_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
            RequestStatus response = (RequestStatus)(await _transportService.ScheduleTransportationUpdate(horarios, token)).Data;
            return RedirectToAction("Index");
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

        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (ScheduleTransportationListViewModel)(await _transportService.ScheduleFind(id, token)).Data;
            return View(detalle);
        }
    }
}
