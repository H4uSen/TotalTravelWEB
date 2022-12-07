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
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                var list = await _generalService.CitiesList();
                var paises = await _generalService.CountriesList();
                IEnumerable<CountriesListViewModel> data_paises = (IEnumerable<CountriesListViewModel>)paises.Data;
                ViewBag.pais_ID = new SelectList(data_paises, "ID", "Pais");
                return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
        

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CityViewModel  city)
        {
            try
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(int City_ID)
        {
            try {     
            string token = HttpContext.User.FindFirst("Token").Value;
            // get current city data
            CityListViewModel requestCity = 
                    (CityListViewModel)(await _generalService.CitiesFind(City_ID, token)).Data;

            // fill contries dropdown
            IEnumerable<CountriesListViewModel> countryList =
                (IEnumerable<CountriesListViewModel>)(await _generalService.CountriesList()).Data;

            ViewBag.CountriesList = new SelectList(countryList, "ID", "Pais", requestCity.PaisID);
            ViewData["City_ID"] = City_ID;

            return View(requestCity);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(CityViewModel city)
        {
            try {            

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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
    }

}

        public async Task<IActionResult> Details(string id)
        {
            try {            
            string token = HttpContext.User.FindFirst("Token").Value;
            var city = (CityListViewModel)(await _generalService.CityFind(id, token)).Data;

            return View(city);
        }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
    }
}
    }

}
