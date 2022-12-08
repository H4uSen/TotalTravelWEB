using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
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
            try { 
            
                var list = await _generalServices.CountriesList();
            return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");

            }
        }

        [HttpGet]
        public IActionResult Create() 
        {
            return View();
        }


        [HttpPost]
        public async Task<IActionResult> Create(CountriesViewModel actividad)
        {
            try { 

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.Pais_ISO = actividad.Pais_ISO.ToUpper();
                actividad.Pais_UsuarioCreacion = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _generalServices.CountriesCreate(actividad, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/Countries?success=true");
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
        public async Task<IActionResult> Update(string id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            CountriesListViewModel CountryRequest = 
                (CountriesListViewModel)(await _generalServices.CountriesFind(id, token)).Data;

            var item = new CountriesViewModel();
            IEnumerable<CountriesListViewModel> model = null;
            var list = await _generalServices.CountriesList();
            IEnumerable<CountriesListViewModel> data = (IEnumerable<CountriesListViewModel>)list.Data;
            var element = data.Where(x => x.ID == Convert.ToInt32(id)).ToList()[0];
            item.Pais_ID = element.ID;
            item.Pais_Descripcion = element.Pais;
            item.Pais_ISO = element.ISO;
            item.Pais_Codigo = element.Codigo;
            item.Pais_Nacionalidad = element.Nacionalidad;
            ViewData["Pais_D"] = item.Pais_Descripcion;
            ViewData["Pais_ISO"] = item.Pais_ISO;
            ViewData["Pais_Codigo"] = Convert.ToInt32(item.Pais_Codigo);
            ViewData["Pais_Nacionalidad"] = item.Pais_Nacionalidad;
            ViewData["Pais_ID"] = CountryRequest.ID;

            return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");

            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(CountriesViewModel country)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                country.Pais_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                country.Pais_ISO = country.Pais_ISO.ToUpper();
                var response = (RequestStatus)(await _generalServices.CountriesUpdate(country, token)).Data;

                if(response.CodeStatus > 0)
                {
                    return Redirect("~/Countries?success=true");
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");

            }

        }
        public async Task<IActionResult> Delete(CountriesViewModel DePa, int id)
        {
            try { 
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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");

            }
        }
        public async Task<IActionResult> Details(string id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var transporte = (CountriesListViewModel)(await _generalServices.CountriesFind(id, token)).Data;

            return View(transporte);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");

            }
        }
    }
}
