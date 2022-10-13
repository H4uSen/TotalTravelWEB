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
    [Produces("multipart/form-data")]
    public class CityController : Controller
    {
        private readonly GeneralService  _generalService;
        public CityController(GeneralService  generalService)
        {
            _generalService = generalService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {

            IEnumerable<CountriesListViewModel> model_Country = null;
            var country = await _generalService.CountriesList(model_Country);
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");


            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<CityListViewModel>();
            var list = await _generalService.CitiesList(token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CityViewModel  city)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                city.ciud_UsuarioCreacion = 1;
                var list = await _generalService.CitiesCreate(city, token);
                if (list.Success)
                {
                    return RedirectToAction("Index");
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
