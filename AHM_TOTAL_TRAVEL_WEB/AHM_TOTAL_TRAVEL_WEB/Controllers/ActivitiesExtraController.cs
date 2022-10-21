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
            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

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
                actividad.AcEx_UsuarioCreacion = Convert.ToInt32(UserID);
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
            var address = new AddressListViewModel();
            string token = HttpContext.User.FindFirst("Token").Value;
            var list = await _activitiesServices.ExtraActivitiesList(token);
            var addressList = await _generalService.AddressesList();
            IEnumerable<ActivitiesExtrasListViewModel> data = (IEnumerable<ActivitiesExtrasListViewModel>)list.Data;
            IEnumerable<AddressListViewModel> addressData = (IEnumerable<AddressListViewModel>)addressList.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.AcEx_ID = element.ID;
            item.AcEx_Url = element.ImageURL;
            item.Actv_ID = element.ID_Actividad;
            item.Part_ID = element.ID_Partner;
            item.Dire_ID = element.CiudadID;
            item.AcEx_Descripcion = element.Descripcion;
            item.AcEx_Precio = element.Precio;

            var elementAddress = addressData.Where(x => x.ID == item.Dire_ID).ToList()[0];

            ViewData["ActivitiesExtra"] = element.ID;
            ViewData["ActvID"] = element.ID_Actividad;
            ViewData["PartnerID"] = element.ID_Partner;
            ViewData["PaisID"] = elementAddress.ID_Pais;
            ViewData["Calle"] = elementAddress.Calle;
            ViewData["Avenida"] = elementAddress.Avenida;
            ViewData["CiudadID"] = element.CiudadID;
            ViewData["ColoID"] = elementAddress.ID_Colonia;

            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

            var type = await _generalService.PartnersList();
            IEnumerable<PartnersListViewModel> data_type = (IEnumerable<PartnersListViewModel>)type.Data;
            ViewBag.Part_ID = new SelectList(data_type, "ID", "Nombre");

            var Acti = await _activitiesServices.ActivityList();
            IEnumerable<ActivitiesListViewModel> data_acti = (IEnumerable<ActivitiesListViewModel>)Acti.Data;
            ViewBag.Actv_ID = new SelectList(data_acti, "ID", "Descripcion");

            return View(item);


        }

        [HttpPost]
        public async Task<IActionResult> Update(ActivitiesExtrasViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.AcEx_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
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
                actividad.AcEx_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);

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
