using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class PartnersController : Controller
    {
        GeneralService _generalServices;

        public PartnersController(GeneralService generalServices)
        {
            _generalServices = generalServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var model = new List<PartnersListViewModel>();
            var list = await _generalServices.PartnersList(model);
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(PartnersViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Part_UsuarioCreacion = 1;
                var list = await _generalServices.PartnersCreate(actividad, token);
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

            var item = new PartnersViewModel();
            IEnumerable<PartnersListViewModel> model = null;
            var list = await _generalServices.PartnersList(model);
            IEnumerable<PartnersListViewModel> data = (IEnumerable<PartnersListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Part_ID = element.ID;
            item.Part_Email = element.Email;
            item.Part_Nombre = element.Nombre;  
            item.Part_Telefono = element.Telefono;
            item.TiPart_Id = element.TipoPartner_Id;
            

            //IEnumerable<EstablecimientoListViewModel> model_Est = null;
            //var Establecimiento = await _generalServices.EstablecimientosList(model_Est);
            //IEnumerable<EstablecimientoListViewModel> data_Establecimiento = (IEnumerable<EstablecimientoListViewModel>)Establecimiento.Data;
            //ViewBag.Est_ID = new SelectList(data_Establecimiento, "ID", "Descripcion", element.EstablecimientoID);

            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(PartnersViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Part_UsuarioModifica = 1;
                var list = await _generalServices.PartnersUpdate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}
