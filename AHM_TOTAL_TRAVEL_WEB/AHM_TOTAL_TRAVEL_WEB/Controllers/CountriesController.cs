using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class CountriesController : Controller
    {
        GeneralService _generalServices;

        public CountriesController(GeneralService generalServices)
        {
            _generalServices = generalServices;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var list = await _generalServices.CountriesList();
            return View(list.Data);
        }

        [HttpGet]
        public IActionResult Create() 
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(CountriesViewModel actividad)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Pais_UsuarioCreacion = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _generalServices.CountriesCreate(actividad, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            CountriesListViewModel CountryRequest = 
                (CountriesListViewModel)(await _generalServices.CountriesFind(id, token)).Data;

            ViewData["Pais_ID"] = CountryRequest.ID;

            return View(CountryRequest);

        }

        [HttpPost]
        public async Task<IActionResult> Update(CountriesViewModel country)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                country.Pais_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var response = (RequestStatus)(await _generalServices.CountriesUpdate(country, token)).Data;

                if(response.CodeStatus > 0)
                {
                    return RedirectToAction("Index");
                }
                else
                {
                    CountriesListViewModel CountryRequest =
                        (CountriesListViewModel)(await _generalServices.CountriesFind(country.Pais_ID.ToString(), token)).Data;
                    ViewData["Pais_ID"] = CountryRequest.ID;
                    return View(CountryRequest);
                }
            }
            else
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                CountriesListViewModel CountryRequest =
                        (CountriesListViewModel)(await _generalServices.CountriesFind(country.Pais_ID.ToString(), token)).Data;
                ViewData["Pais_ID"] = CountryRequest.ID;
                return View(CountryRequest);
            }

        }
        public async Task<IActionResult> Delete(CountriesViewModel DePa, int id)
        {
            if (ModelState.IsValid)
            {
                DePa.Pais_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _generalServices.CountriesDelete(DePa, id, token);

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
            var transporte = (CountriesListViewModel)(await _generalServices.CountriesFind(id, token)).Data;

            return View(transporte);
        }
    }
}
