using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
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
            var list = await _generalServices.PartnersList();
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<PartnerTypeListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;


            var partners = await _generalServices.PartnerTypeList();
            IEnumerable<PartnerTypeListViewModel> data_Partners = (IEnumerable<PartnerTypeListViewModel>)partners.Data;
            ViewBag.TiPart_Id = new SelectList(data_Partners, "ID", "Descripcion");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(PartnersViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Part_UsuarioCreacion = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
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
            var model1 = new List<PartnerTypeListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;


            var partners = await _generalServices.PartnerTypeList();
            IEnumerable<PartnerTypeListViewModel> data_Partners = (IEnumerable<PartnerTypeListViewModel>)partners.Data;
            ViewBag.TiPart_Id = new SelectList(data_Partners, "ID", "Descripcion");

            var item = new PartnersViewModel();
            IEnumerable<PartnersListViewModel> model = null;
            var list = await _generalServices.PartnersList();
            IEnumerable<PartnersListViewModel> data = (IEnumerable<PartnersListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Part_ID = element.ID;
            item.Part_Email = element.Email;
            item.Part_Nombre = element.Nombre;
            item.Part_Telefono = element.Telefono;
            item.TiPart_Id = element.TipoPartner_Id;
            
            ViewData["partnersID"] = element.ID;


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
                actividad.Part_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _generalServices.PartnersUpdate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
        public async Task<IActionResult> Delete(PartnersViewModel DePa, int id)
        {
            if (ModelState.IsValid)
            {
                DePa.Part_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _generalServices.PartnersDelete(DePa, id, token);

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
            var transporte = (PartnersListViewModel)(await _generalServices.PartnersFind(id, token)).Data;

            return View(transporte);
        }

    }
}
