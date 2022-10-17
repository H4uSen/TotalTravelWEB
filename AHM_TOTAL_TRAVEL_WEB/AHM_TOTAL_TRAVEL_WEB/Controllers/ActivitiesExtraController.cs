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
    public class ActivitiesExtraController : Controller
    {
        ActivitiesServices _activitiesServices;
        GeneralService _generalService;

        public ActivitiesExtraController(ActivitiesServices activitiesServices, GeneralService generalService)
        {
            _activitiesServices = activitiesServices;
            _generalService = generalService;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            //var model = new List<ActivitiesExtrasListViewModel>();
            var list = await _activitiesServices.ExtraActivitiesList(token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var type = await _generalService.PartnersList();
            IEnumerable<PartnersListViewModel> data_type = (IEnumerable<PartnersListViewModel>)type.Data;
            ViewBag.Part_ID = new SelectList(data_type, "ID", "Nombre");

            var Acti = await _activitiesServices.ActivityList();
            IEnumerable<ActivitiesListViewModel> data_acti = (IEnumerable<ActivitiesListViewModel>)Acti.Data;
            ViewBag.Actv_ID = new SelectList(data_acti, "ID", "Descripcion");
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(ActivitiesExtrasViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                actividad.acEx_UsuarioCreacion = Convert.ToInt32(UserID);
                var list = await _activitiesServices.ActivitiesExtraCreate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(ActivitiesExtrasViewModel actividad, int id)
        {
            var item = new ActivitiesExtrasViewModel();
            IEnumerable<ActivitiesExtrasListViewModel> model = null;
            string token = HttpContext.User.FindFirst("Token").Value;
            var list = await _activitiesServices.ExtraActivitiesList(model, token);
            IEnumerable<ActivitiesExtrasListViewModel> data = (IEnumerable<ActivitiesExtrasListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.acEx_Descripcion = element.Descripcion;
            item.acEx_Precio = element.Precio;

            return View(item);


        }

        [HttpPost]
        public async Task<IActionResult> Update(ActivitiesExtrasViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.acEx_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _activitiesServices.ActivitiesExtraUpdate(actividad, token);
                return RedirectToAction("Index");

            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(ActivitiesExtrasViewModel actividad, int id)
        {
            if (ModelState.IsValid)
            {
                actividad.acEx_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _activitiesServices.ActivitiesExtraDelete(actividad,id, token);

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
            var detalle = (ActivitiesExtrasListViewModel)(await _activitiesServices.ActivitiesFind(id, token)).Data;
            return View(detalle);
        }
    }
}
