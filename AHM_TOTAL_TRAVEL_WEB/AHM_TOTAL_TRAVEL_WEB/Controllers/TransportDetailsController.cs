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
    public class TransportDetailsController : Controller
    {
        private readonly TransportService _transportService;
        private readonly AccessService _AccessService;

        public TransportDetailsController(TransportService transportService, AccessService AccessService)
        {
            _transportService = transportService;
            _AccessService = AccessService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {                  
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.Session.GetInt32("PartnerID");              
                var rol = HttpContext.Session.GetString("Role");
                var DsTr = await _transportService.TransportDetailsList(token);
                IEnumerable<TransportDetailsListViewModel> DsTr1 = (IEnumerable<TransportDetailsListViewModel>)DsTr.Data;
               
                var list = await _transportService.TransportDetailsList(token);
                IEnumerable<TransportDetailsListViewModel> lista = (IEnumerable<TransportDetailsListViewModel>)list.Data;
               
                if (string.IsNullOrEmpty(id.ToString()))
                {
                    return View(lista);
                }
                else
                {
                    IEnumerable<TransportDetailsListViewModel> DesTrFilter = DsTr1.Where(c => c.Partner_ID == id).ToList();
                    if (rol == "Cliente" || rol == "Administrador")
                    {
                        return View(lista);
                    }

                    else
                    {
                        var list2 = lista.Where(c => c.Partner_ID == Convert.ToInt32(id)).ToList();
                        return View(list2);
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
                var id = HttpContext.Session.GetInt32("PartnerID");
                var typeTransportation = await _transportService.TransportList();
                IEnumerable<TransportListViewModel> data_TypeTransportation = (IEnumerable<TransportListViewModel>)typeTransportation.Data;
                List<TransportListViewBag> data_Transp = new List<TransportListViewBag>();
                IEnumerable<TransportListViewModel> data_TypeTransportation2;
                if (id!=0)
                {
                    data_TypeTransportation2 = data_TypeTransportation.Where(c => c.PartnerID == id).ToList();
                }
                else
                {
                     data_TypeTransportation2 = data_TypeTransportation.ToList();
                }
                foreach (var item in data_TypeTransportation2)
                {
                    data_Transp.Add(new TransportListViewBag() { ID = item.ID, Transportes = item.Nombre + " - " + item.NombrePartner });
                }

                ViewBag.Tprt_ID = new SelectList(data_Transp, "ID", "Transportes");
                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(TransportDetailsViewModel transportdetails)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    transportdetails.DeTr_UsuarioCreacion = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                    var list = await _transportService.TransportDetailsCreate(transportdetails, token);
                    return RedirectToAction("Index");
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
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.Session.GetInt32("PartnerID");
                var item = new TransportDetailsViewModel();
                IEnumerable<TransportDetailsListViewModel> model = null;
                var list = await _transportService.TransportDetailsList(token);
                IEnumerable<TransportDetailsListViewModel> data = (IEnumerable<TransportDetailsListViewModel>)list.Data;
                var element = data.Where(x => x.ID == id).ToList()[0];
                item.DeTr_ID = element.ID;
                item.DeTr_Capacidad = element.Capacidad;
                //item.HoTr_ID = element.Fecha;
                item.DeTr_Precio = element.Precio;
                item.DeTr_Matricula = element.Matricula;
                item.Tprt_ID = element.ID_Transporte;
                item.HoTr_ID = element.Horario_ID;

                ViewData["HorarioID"] = element.Horario_ID;

                var typeTransportation = await _transportService.TransportList();
                IEnumerable<TransportListViewModel> data_TypeTransportation = (IEnumerable<TransportListViewModel>)typeTransportation.Data;
                List<TransportListViewBag> data_Transp = new List<TransportListViewBag>();
                IEnumerable<TransportListViewModel> data_TypeTransportation2;
                if (idd!=0)
                {
                    data_TypeTransportation2 = data_TypeTransportation.Where(c => c.PartnerID == idd).ToList();
                }
                else
                {
                    data_TypeTransportation2 = data_TypeTransportation.ToList();
                }
                foreach (var item2 in data_TypeTransportation2)
                {
                    data_Transp.Add(new TransportListViewBag() { ID = item2.ID, Transportes = item2.Nombre + " - " + item2.NombrePartner });
                }

                ViewBag.Tprt_ID = new SelectList(data_Transp, "ID", "Transportes", element.ID_Transporte);
                

                return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(TransportDetailsViewModel transportdetails, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    transportdetails.DeTr_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                    var lista = await _transportService.TransportDetailsUpdate(transportdetails, id, token);
                    return RedirectToAction("Index");
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
        public async Task<IActionResult> Delete( int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    int modifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                    string token = HttpContext.User.FindFirst("Token").Value;
                    var list = (RequestStatus)(await _transportService.TransportDetailsDelete(modifica, id, token)).Data;

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
                var transporte = (TransportDetailsListViewModel)(await _transportService.TransportDetailsFind(id, token)).Data;

                return View(transporte);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
