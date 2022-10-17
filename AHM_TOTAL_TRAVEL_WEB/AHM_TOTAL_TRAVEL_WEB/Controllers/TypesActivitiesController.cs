using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class TypesActivitiesController : Controller
    {
        ActivitiesServices _activitiesServices;

        public TypesActivitiesController(ActivitiesServices activitiesServices)
        {
            _activitiesServices = activitiesServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<TypesActivitiesListViewModel>();
            var list = await _activitiesServices.TypesActivitiesList();
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(TypesActivitiesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.TiAc_UsuarioCreacion = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _activitiesServices.TypesActivitiesCreate(actividad, token);
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

            var item = new TypesActivitiesViewModel();
            IEnumerable<TypesActivitiesListViewModel> model = null;
            var list = await _activitiesServices.TypesActivitiesList();
            IEnumerable<TypesActivitiesListViewModel> data = (IEnumerable<TypesActivitiesListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.TiAc_ID = element.ID;
            item.TiAc_Descripcion = element.Descripcion;
            

            //IEnumerable<EstablecimientoListViewModel> model_Est = null;
            //var Establecimiento = await _generalServices.EstablecimientosList(model_Est);
            //IEnumerable<EstablecimientoListViewModel> data_Establecimiento = (IEnumerable<EstablecimientoListViewModel>)Establecimiento.Data;
            //ViewBag.Est_ID = new SelectList(data_Establecimiento, "ID", "Descripcion", element.EstablecimientoID);

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(TypesActivitiesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.TiAc_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _activitiesServices.TypesActivitiesUpdate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public async Task<IActionResult> Delete(TypesActivitiesViewModel DePa, int id)
        {
            if (ModelState.IsValid)
            {
                DePa.TiAc_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _activitiesServices.TypesActivitiesDelete(DePa, id, token);

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
            var transporte = (TypesActivitiesListViewModel)(await _activitiesServices.TypesActivitiesFind(id, token)).Data;

            return View(transporte);
        }
    }
}
