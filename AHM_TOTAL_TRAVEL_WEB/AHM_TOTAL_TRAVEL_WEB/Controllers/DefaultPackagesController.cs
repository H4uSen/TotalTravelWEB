using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class DefaultPackagesController : Controller
    {
        SaleServices _saleServices;

        public DefaultPackagesController(SaleServices saleServices)
        {
            _saleServices = saleServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<DefaultPackagesListViewModel>();
            var list = await _saleServices.DefaultPackagesList(model);
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(DefaultPackagesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Paqu_UsuarioCreacion = 1;
                var list = await _saleServices.DefaultPackagesCreate(actividad, token);
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

            var item = new DefaultPackagesViewModel();
            IEnumerable<DefaultPackagesListViewModel> model = null;
            var list = await _saleServices.DefaultPackagesList(model);
            IEnumerable<DefaultPackagesListViewModel> data = (IEnumerable<DefaultPackagesListViewModel>)list.Data;
            var element = data.Where(x => x.Id == id).ToList()[0];
            item.Paqu_ID = element.Id;
            item.Paqu_Descripcion = element.Descripcion_Paquete;
            item.Paqu_Duracion=element.Duracion_Paquete;
            item.Paqu_Nombre = element.Nombre;
            

            //IEnumerable<EstablecimientoListViewModel> model_Est = null;
            //var Establecimiento = await _generalServices.EstablecimientosList(model_Est);
            //IEnumerable<EstablecimientoListViewModel> data_Establecimiento = (IEnumerable<EstablecimientoListViewModel>)Establecimiento.Data;
            //ViewBag.Est_ID = new SelectList(data_Establecimiento, "ID", "Descripcion", element.EstablecimientoID);

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(DefaultPackagesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Paqu_UsuarioModifica = 1;
                var list = await _saleServices.DefaultPackagesUpdate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
