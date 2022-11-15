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
    public class ModulePartnersActivitiesController : Controller
    {
        private readonly AccessService _accessService;
        private readonly GeneralService _generalService;
        private readonly ActivitiesServices _activitiesService;

        private readonly IMapper _mapper;

        public ModulePartnersActivitiesController(AccessService accessService, GeneralService generalService, ActivitiesServices activitiesService, IMapper mapper)
        {
            _accessService = accessService;
            _generalService = generalService;
            _activitiesService = activitiesService;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;
            ViewData["partnerID"] = partner.ID;

            var typeActivities = await _activitiesService.TypesActivitiesList();
            IEnumerable<TypesActivitiesListViewModel> data_TypeActivities = (IEnumerable<TypesActivitiesListViewModel>)typeActivities.Data;
            ViewBag.TiAc_ID = new SelectList(data_TypeActivities, "ID", "Descripcion");

            return View();
        }

        public async Task<IActionResult> Info()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var partner = (PartnersListViewModel)(await _generalService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;
            ViewData["Telefono"] = partner.Telefono;
            ViewData["Email"] = partner.Email;
            ViewData["PartnerImage"] = partner.Image_Url;
            ViewData["PartnerID"] = partner.ID;

            return View(partner);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(ActivitiesExtrasViewModel Actividades, int id)
        {
            if (ModelState.IsValid)
            {
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                Actividades.AcEx_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _activitiesService.ActivitiesExtraDelete(Actividades, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

                var partner = (PartnersListViewModel)(await _generalService.PartnersFind(cuenta.PartnerID.ToString(), token)).Data;
                ViewData["partnerID"] = partner.ID;

                var city = await _generalService.CitiesList();
                IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
                ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

                var country = await _generalService.CountriesList();
                IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
                ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

                var Acti = await _activitiesService.ActivityList(token);
                IEnumerable<ActivitiesListViewModel> data_acti = (IEnumerable<ActivitiesListViewModel>)Acti.Data;
                ViewBag.Actv_ID = new SelectList(data_acti, "ID", "Descripcion");

                return View();
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
                var item = new ActivitiesExtrasViewModel();
                var address = new AddressListViewModel();
                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _activitiesService.ExtraActivitiesList(token);
                var addressList = await _generalService.AddressesList();
                IEnumerable<ActivitiesExtrasListViewModel> data = (IEnumerable<ActivitiesExtrasListViewModel>)list.Data;
                IEnumerable<AddressListViewModel> addressData = (IEnumerable<AddressListViewModel>)addressList.Data;
                var element = data.Where(x => x.ID == id).ToList()[0];
                item.AcEx_ID = element.ID;
                item.Actv_ID = element.ID_Actividad;
                item.Part_ID = element.ID_Partner;
                item.Dire_ID = element.DireccionID;
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

                var suburbs = await _generalService.SuburbsList();
                IEnumerable<SuburbsListViewModel> data_Suburbs = (IEnumerable<SuburbsListViewModel>)suburbs.Data;
                ViewBag.Subu_ID = new SelectList(data_Suburbs, "ID", "Colonia");

                var Acti = await _activitiesService.ActivityList(token);
                IEnumerable<ActivitiesListViewModel> data_acti = (IEnumerable<ActivitiesListViewModel>)Acti.Data;
                ViewBag.Actv_ID = new SelectList(data_acti, "ID", "Descripcion");

                return View(item);
            }
            catch (Exception)
            {

                return RedirectToAction("Error", "Home");
            }

        }

        [HttpPost]
        public async Task<IActionResult> CreateTypeActivities(TypesActivitiesViewModel typeActividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                typeActividad.TiAc_UsuarioCreacion = Convert.ToInt32(UserID);
                var list = await _activitiesService.TypesActivitiesCreate(typeActividad, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/ModulePartnersActivities?success=true");
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
    }
}
