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
    public class DestinationsTransportationsController : Controller
    {
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;

        public DestinationsTransportationsController(TransportService transportService, GeneralService generalService)
        {
            _transportService = transportService;
            _generalService = generalService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var type = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_type = (IEnumerable<CityListViewModel>)type.Data;
            ViewBag.DsTr_CiudadSalida = new SelectList(data_type, "ID", "Ciudad");
            var type1 = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_type1 = (IEnumerable<CityListViewModel>)type1.Data;
            ViewBag.DsTr_CiudadDestino = new SelectList(data_type1, "ID", "Ciudad");
            var model = new List<DestinationsTransportationsListViewModel>();
            var list = await _transportService.TransportDestionationsList();
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(DestinationsTransportationsViewModel transportedestino)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                transportedestino.DsTr_UsuarioCreacion = int.Parse(id);
                var list = await _transportService.TransportDestionationsCreate(transportedestino, token);
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
            var item = new DestinationsTransportationsViewModel();
            var list = await _transportService.TransportDestionationsList();
            IEnumerable<DestinationsTransportationsListViewModel> data = (IEnumerable<DestinationsTransportationsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.DsTr_ID = element.ID;
            item.DsTr_CiudadSalida = element.CiudadSalidaID;
            item.DsTr_CiudadDestino = element.CiudadDestinoID;

            return View(item);
        }

        [HttpPost]
        public async Task<IActionResult> Update(DestinationsTransportationsViewModel transportedestino)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                transportedestino.DsTr_UsuarioModifica = int.Parse(idd);
                var lista = await _transportService.TransportDestionationsUpdate(transportedestino, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(DestinationsTransportationsViewModel TypeMenus, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                TypeMenus.DsTr_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _transportService.TransportDestionationsDelete(TypeMenus, id, token)).Data;

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
            var destinotransporte = (DestinationsTransportationsListViewModel)(await _transportService.TransportDestionationsFind(id, token)).Data;

            return View(destinotransporte);
        }
    }
}
