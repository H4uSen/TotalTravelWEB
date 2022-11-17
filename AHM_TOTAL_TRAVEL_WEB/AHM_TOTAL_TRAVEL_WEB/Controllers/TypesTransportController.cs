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
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.Session.GetInt32("PartnerID");
                var rol = HttpContext.Session.GetString("Role");
                var DsTr = await _transportService.TransportList();
                IEnumerable<TransportListViewModel> DsTr1 = (IEnumerable<TransportListViewModel>)DsTr.Data;
                
                var list = await _transportService.TypesTransportList();
                IEnumerable<TypesTransportListViewModel> lista = (IEnumerable<TypesTransportListViewModel>)list.Data;
                List<TypesTransportListViewModel> ListNuevaTrDe = new List<TypesTransportListViewModel>();


                if (string.IsNullOrEmpty(id.ToString()))
                {
                    return View(lista);
                }
                else
                {
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
            catch (Exception)
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
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(TypesTransportViewModel transporte)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    var id = HttpContext.User.FindFirst("User_Id").Value;
                    transporte.TiTr_UsuarioCreacion = int.Parse(id);
                    var rol = HttpContext.Session.GetString("Role");

                    var idPart = HttpContext.Session.GetInt32("PartnerID");
                    if (rol != "Cliente" || rol != "Administrador")
                    {
                        transporte.Partner_ID = int.Parse(idPart.ToString());
                    }
                    var list = await _transportService.TypesTransportCreate(transporte, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/TypesTransport?success=true");
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
            catch
            {
                return RedirectToAction("Error", "Home");
            }

        }
        [HttpPost]
        public async Task<IActionResult> Delete(TypesTransportViewModel transporte, int id)
        {
                try
                {
                    if (ModelState.IsValid)
                    {
                        transporte.TiTr_UsuarioModifica = 1;

                        string token = HttpContext.User.FindFirst("Token").Value;
                        var list = await _transportService.TypesTransportDelete(transporte, id, token);
                        var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                        if (l > 0)
                        {
                            return Redirect("~/TypesTransport?success=true");
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
                catch
                {
                    return RedirectToAction("Error", "Home");
                }
        }

        public async Task<IActionResult> Details(string id)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var detalle = (TypesTransportListViewModel)(await _transportService.TypesTransportFind(id, token)).Data;
                return View(detalle);
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }


    }
}
