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
            var model = new List<CountriesListViewModel>();
            var list = await _generalServices.CountriesList(model);
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
                actividad.Pais_UsuarioCreacion = 1;
                var list = await _generalServices.CountriesCreate(actividad, token);
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

            var item = new CountriesViewModel();
            IEnumerable<CountriesListViewModel> model = null;
            var list = await _generalServices.CountriesList(model);
            IEnumerable<CountriesListViewModel> data = (IEnumerable<CountriesListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Pais_ID = element.ID;
            item.Pais_Descripcion = element.Pais;
            item.Pais_Codigo = element.Codigo;  
            item.Pais_Nacionalidad = element.Nacionalidad;

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
                actividad.Pais_UsuarioModifica = 1;
                var list = await _generalServices.CountriesUpdate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
