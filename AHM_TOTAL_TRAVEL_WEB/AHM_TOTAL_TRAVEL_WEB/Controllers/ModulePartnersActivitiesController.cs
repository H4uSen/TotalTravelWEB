using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
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

        private readonly IMapper _mapper;

        public ModulePartnersActivitiesController(AccessService accessService, GeneralService generalService, IMapper mapper)
        {
            _accessService = accessService;
            _generalService = generalService;
            _mapper = mapper;
        }

        public async Task<IActionResult> Index()
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
        public IActionResult Activities()
        {
            return View();
        }
    }
}
