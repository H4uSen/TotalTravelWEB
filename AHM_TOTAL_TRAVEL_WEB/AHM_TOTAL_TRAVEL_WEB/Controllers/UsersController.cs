using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize]
    public class UsersController : Controller
    {
        private readonly GeneralService _GeneralServices;
        public UsersController(GeneralService GeneralService)
        {
            _GeneralServices = GeneralService;
        }
        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> Create()
        {
            IEnumerable<CountriesListViewModel> listCounties = (IEnumerable<CountriesListViewModel>)(await _GeneralServices.CountriesList()).Data;
            IEnumerable<PartnerTypeListViewModel> listPartnersType = (IEnumerable<PartnerTypeListViewModel>)(await _GeneralServices.PartnerTypeList()).Data;
            ViewBag.Counties = new SelectList(listCounties, "ID", "Pais");
            ViewBag.PartnersTypes = new SelectList(listPartnersType, "ID", "Descripcion");
            return View();
        }
    }
}
