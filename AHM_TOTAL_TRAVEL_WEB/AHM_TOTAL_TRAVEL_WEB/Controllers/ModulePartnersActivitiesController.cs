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
    }
}
