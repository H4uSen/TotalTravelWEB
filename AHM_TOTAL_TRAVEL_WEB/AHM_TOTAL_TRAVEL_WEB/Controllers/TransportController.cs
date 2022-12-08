using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
    public class TransportController : Controller
    {
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;

        public TransportController(TransportService transportService, GeneralService generalService)
        {
            _transportService = transportService;
            _generalService = generalService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {                                         
            try
            {
                var id = HttpContext.Session.GetInt32("PartnerID");
                var rol = HttpContext.Session.GetString("Role");
                var token = HttpContext.User.FindFirst("Token").Value;
                //var model = new List<HotelListViewModel>();

                var list = await _transportService.TransportList();
                IEnumerable<TransportListViewModel> lista = (IEnumerable<TransportListViewModel>)list.Data;
               

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
                        var list2 = lista.Where(c => c.PartnerID == id).ToList();
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
            var token = HttpContext.User.FindFirst("Token").Value;
            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

            var suburb = await _generalService.SuburbsList();
            IEnumerable<SuburbsListViewModel> data_Subu = (IEnumerable<SuburbsListViewModel>)suburb.Data;
            ViewBag.City_ID = new SelectList(data_Subu, "ID", "Colonia");

            var partners = await _generalService.PartnersList();
            IEnumerable<PartnersListViewModel> data_Partners = (IEnumerable<PartnersListViewModel>)partners.Data;
            var PartFilter = data_Partners.Where(x => x.TipoPartner == "Agencia de Transporte").ToList();
            ViewBag.Part_ID = new SelectList(PartFilter, "ID", "Nombre");

            var tipotransporte = await _transportService.TypesTransportList();
            IEnumerable<TypesTransportListViewModel> data_TipoTransporte = (IEnumerable<TypesTransportListViewModel>)tipotransporte.Data;
            ViewBag.TiTr_ID = new SelectList(data_TipoTransporte, "ID", "Trasporte");

            return View();
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(TransportViewModel transporte)
        {
            try
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
            catch
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
                var item = new TransportViewModel();
                var list = await _transportService.TransportList();
                IEnumerable<TransportListViewModel> data = (IEnumerable<TransportListViewModel>)list.Data;
                var element = data.Where(x => x.ID == id).ToList()[0];
                item.Tprt_ID = element.ID;
                item.Tprt_Nombre = element.Nombre;
                item.TiTr_ID = element.TipoTransporteID;
                item.Part_ID = element.PartnerID;
                item.Dire_ID = element.DireccionId;

                var tra = (TransportListViewModel)(await _transportService.TransportFind(id.ToString(), token)).Data;
                var direccion = (AddressListViewModel)(await _generalService.AddressFind(tra.DireccionId.ToString(), token)).Data;

                ViewData["Calle"] = direccion.Calle;
                ViewData["Avenida"] = direccion.Avenida;
                ViewData["Pais"] = direccion.ID_Pais;
                ViewData["Ciudad"] = direccion.ID_Ciudad;
                ViewData["Colonia"] = direccion.ID_Colonia;
                ViewData["Partner"] = tra.PartnerID;
                ViewData["TipoTransporte"] = tra.TipoTransporteID;
                ViewData["Tprt_Nombre"] = tra.Nombre;
                

                var city = await _generalService.CitiesList();
                IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
                ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

                IEnumerable<CountriesListViewModel> model_Country = null;
                var country = await _generalService.CountriesList();
                IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
                ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

                var partners = await _generalService.PartnersList();
                IEnumerable<PartnersListViewModel> data_Partners = (IEnumerable<PartnersListViewModel>)partners.Data;
                var PartFilter = data_Partners.Where(x => x.TipoPartner == "Agencia de Transporte").ToList();
                ViewBag.Part_ID = new SelectList(PartFilter, "ID", "Nombre");

                var tipotransporte = await _transportService.TypesTransportList();
                IEnumerable<TypesTransportListViewModel> data_TipoTransporte = (IEnumerable<TypesTransportListViewModel>)tipotransporte.Data;
                ViewBag.TiTr_ID = new SelectList(data_TipoTransporte, "ID", "Trasporte");

                return View(item);
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(TransportViewModel transporte)
        {
            try
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
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Delete(TransportViewModel Transporte, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ServiceResult result = new ServiceResult();
                    var idd = HttpContext.User.FindFirst("User_Id").Value;
                    Transporte.Tprt_UsuarioModifica = int.Parse(idd);

                    string token = HttpContext.User.FindFirst("Token").Value;
                    var list = (RequestStatus)(await _transportService.TransportDelete(Transporte, id, token)).Data;

                    return Ok(list.CodeStatus);
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
                var transporte = (TransportListViewModel)(await _transportService.TransportFind(id, token)).Data;

                return View(transporte);            
            }
            catch
            {
                return RedirectToAction("Error", "Home");
            }
        }

    }

}
