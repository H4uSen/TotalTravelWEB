﻿using AHM_TOTAL_TRAVEL_WEB.Models;
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
                var id = HttpContext.Session.GetString("PartnerID");
                var rol = HttpContext.Session.GetString("Role");
                var DsTr = await _transportService.TransportList();
                IEnumerable<TransportListViewModel> DsTr1 = (IEnumerable<TransportListViewModel>)DsTr.Data;
                


                var list = await _transportService.TypesTransportList();
                IEnumerable<TypesTransportListViewModel> lista = (IEnumerable<TypesTransportListViewModel>)list.Data;
                List<TypesTransportListViewModel> ListNuevaTrDe = new List<TypesTransportListViewModel>();


                if (string.IsNullOrEmpty(id))
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
                        IEnumerable<TransportListViewModel> DesTrFilter = DsTr1.Where(c => c.PartnerID == Convert.ToInt32(id)).ToList();
                        foreach (var item in lista)
                        {
                            var data = DesTrFilter.Where(x => x.TipoTransporteID == item.ID).ToList();
                            foreach (var item2 in data)
                            {
                                var data2 = lista.Where(z => z.ID == item2.TipoTransporteID).ToList();
                                if (!ListNuevaTrDe.Contains(data2[0]))
                                {
                                    ListNuevaTrDe.Add(data2[0]);
                                }

                            }
                        }

                        return View((IEnumerable<TypesTransportListViewModel>)ListNuevaTrDe);
                    }
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        [HttpGet]
        public IActionResult Create()
        {
            try
            {
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
