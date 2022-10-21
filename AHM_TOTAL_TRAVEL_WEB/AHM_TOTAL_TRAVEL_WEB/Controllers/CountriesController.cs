using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class CountriesController : Controller
    {
        GeneralService _generalServices;

        public CountriesController(GeneralService generalServices)
        {
            _generalServices = generalServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var list = await _generalServices.CountriesList();
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create() 
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CountriesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Pais_UsuarioCreacion = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _generalServices.CountriesCreate(actividad, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/Countries?success=true");
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

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {

            var item = new CountriesViewModel();
            var list = await _generalServices.CountriesList();
            IEnumerable<CountriesListViewModel> data = (IEnumerable<CountriesListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Pais_ID = element.ID;
            item.Pais_Descripcion = element.Pais;
            item.Pais_Codigo = element.Codigo;  
            item.Pais_Nacionalidad = element.Nacionalidad;
            item.Pais_ISO = element.ISO;

            //IEnumerable<EstablecimientoListViewModel> model_Est = null;
            //var Establecimiento = await _generalServices.EstablecimientosList(model_Est);
            //IEnumerable<EstablecimientoListViewModel> data_Establecimiento = (IEnumerable<EstablecimientoListViewModel>)Establecimiento.Data;
            //ViewBag.Est_ID = new SelectList(data_Establecimiento, "ID", "Descripcion", element.EstablecimientoID);

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(CountriesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Pais_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _generalServices.CountriesUpdate(actividad, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/Countries?success=true");
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
        public async Task<IActionResult> Delete(CountriesViewModel DePa, int id)
        {
            if (ModelState.IsValid)
            {
                DePa.Pais_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _generalServices.CountriesDelete(DePa, id, token);

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
            var transporte = (CountriesListViewModel)(await _generalServices.CountriesFind(id, token)).Data;

            return View(transporte);
        }
    }
}
