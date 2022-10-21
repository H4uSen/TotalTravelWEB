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
            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.pais_ID = new SelectList(data_Country, "ID", "Pais");


            var token = HttpContext.User.FindFirst("Token").Value;
            var list = await _generalService.CitiesList();
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

        [HttpGet]
        public async Task<IActionResult> Update(int City_ID)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            // get current city data
            CityListViewModel requestCity = 
                    (CityListViewModel)(await _generalService.CitiesFind(City_ID, token)).Data;

            // get list of suburbs
            IEnumerable<SuburbsListViewModel> suburbsList = 
                    (IEnumerable<SuburbsListViewModel>)(await _generalService.SuburbsList()).Data;

            // fill contries dropdown
            IEnumerable<CountriesListViewModel> countryList =
                (IEnumerable<CountriesListViewModel>)(await _generalService.CountriesList()).Data;

            ViewBag.CountriesList = new SelectList(countryList, "ID", "Pais", requestCity.PaisID);
            ViewData["suburbsList"] = suburbsList.Where(suburb => suburb.CiudadID == City_ID).ToList();

            return View(requestCity);
        }

        [HttpPost]
        public async Task<IActionResult> Update(CityViewModel city)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                city.ciud_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                int id = city.Ciud_ID;
                var lista = await _generalService.CitiesUpdate(city, id, token);
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
            var city = (CityListViewModel)(await _generalService.CityFind(id, token)).Data;

            return View(city);
        }
    }

}
