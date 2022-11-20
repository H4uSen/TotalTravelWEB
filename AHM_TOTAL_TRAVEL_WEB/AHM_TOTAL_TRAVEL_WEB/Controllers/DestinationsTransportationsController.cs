using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

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
            try { 
                var token = HttpContext.User.FindFirst("Token").Value;
                var type = await _generalService.CitiesList();
                IEnumerable<CityListViewModel> data_type = (IEnumerable<CityListViewModel>)type.Data;
                ViewBag.DsTr_CiudadSalida = new SelectList(data_type, "ID", "Ciudad");
                var type1 = await _generalService.CitiesList();
                IEnumerable<CityListViewModel> data_type1 = (IEnumerable<CityListViewModel>)type1.Data;
                ViewBag.DsTr_CiudadDestino = new SelectList(data_type1, "ID", "Ciudad");

                var id = HttpContext.Session.GetInt32("PartnerID");
                var rol = HttpContext.Session.GetString("Role");
                var DsTr = await _transportService.TransportDetailsList(token);
                IEnumerable<TransportDetailsListViewModel> DsTr1 = (IEnumerable<TransportDetailsListViewModel>)DsTr.Data;
                


                var list = await _transportService.TransportDestionationsList();
                IEnumerable<DestinationsTransportationsListViewModel> lista = (IEnumerable<DestinationsTransportationsListViewModel>)list.Data;
                List<DestinationsTransportationsListViewModel> ListNuevaTrDe=new List<DestinationsTransportationsListViewModel>();
                


                if (string.IsNullOrEmpty(id.ToString()))
                {
                    return View(lista);
                }
                else
                {
                    IEnumerable<TransportDetailsListViewModel> DesTrFilter = DsTr1.Where(c => c.Partner_ID == Convert.ToInt32(id)).ToList();
                    if (rol == "Cliente" || rol == "Administrador")
                    {
                        return View(lista);
                    }

                    else
                    {
                        var data = lista.Where(x => x.Partner_ID == id).ToList();

                        return View(data);
                    }
                }
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            try
            {
                var partner = await _transportService.TransportDestionationsList();
                IEnumerable<PartnersListViewModel> data_Partner = (IEnumerable<PartnersListViewModel>)partner.Data;
                ViewBag.Part_ID = new SelectList(data_Partner, "ID", "Nombre");
                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(DestinationsTransportationsViewModel transportedestino)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    var id = HttpContext.User.FindFirst("User_Id").Value;
                    var rol = HttpContext.Session.GetString("Role");
                    var idPart = HttpContext.Session.GetInt32("PartnerID");
                    if (rol != "Administrador")
                    {
                        transportedestino.Partner_ID = int.Parse(idPart.ToString());
                    }
                    transportedestino.DsTr_UsuarioCreacion = int.Parse(id);
                    var list = await _transportService.TransportDestionationsCreate(transportedestino, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/DestinationsTransportations?success=true");
                    }
                    else
                    {
                        return View();
                    }
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
            try
            {
                var item = new DestinationsTransportationsViewModel();
                var list = await _transportService.TransportDestionationsList();
                IEnumerable<DestinationsTransportationsListViewModel> data = (IEnumerable<DestinationsTransportationsListViewModel>)list.Data;
                var element = data.Where(x => x.ID == id).ToList()[0];

                var rol = HttpContext.Session.GetString("Role");
                var idPart = HttpContext.Session.GetInt32("PartnerID");
                if (rol != "Administrador")
                {
                    item.Partner_ID = int.Parse(idPart.ToString());
                }
                else
                {
                    item.Partner_ID = element.Partner_ID;
                }
                item.DsTr_ID = element.ID;
                item.DsTr_CiudadSalida = element.CiudadSalidaID;
                item.DsTr_CiudadDestino = element.CiudadDestinoID;
                var partner = await _transportService.TransportDestionationsList();
                IEnumerable<PartnersListViewModel> data_Partner = (IEnumerable<PartnersListViewModel>)partner.Data;
                ViewBag.Part_ID = new SelectList(data_Partner, "ID", "Nombre",item.Partner_ID);

                return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(DestinationsTransportationsViewModel transportedestino)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    var idd = HttpContext.User.FindFirst("User_Id").Value;
                   
                    transportedestino.DsTr_UsuarioModifica = int.Parse(idd);
                    var list = await _transportService.TransportDestionationsUpdate(transportedestino, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/DestinationsTransportations?success=true");
                    }
                    else
                    {
                        return View();
                    }
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
        public async Task<IActionResult> Delete(DestinationsTransportationsViewModel destinotransporte, int id)
        {
            try
            {
                if (ModelState.IsValid)
                    {
                        ServiceResult result = new ServiceResult();
                        var idd = HttpContext.User.FindFirst("User_Id").Value;
                        destinotransporte.DsTr_UsuarioModifica = int.Parse(idd);

                        string token = HttpContext.User.FindFirst("Token").Value;
                        var list = (RequestStatus)(await _transportService.TransportDestionationsDelete(destinotransporte, id, token)).Data;

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
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var destinotransporte = (DestinationsTransportationsListViewModel)(await _transportService.TransportDestionationsFind(id, token)).Data;

                return View(destinotransporte);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
