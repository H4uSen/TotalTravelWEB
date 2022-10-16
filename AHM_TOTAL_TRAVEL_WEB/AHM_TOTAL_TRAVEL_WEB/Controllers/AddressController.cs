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
    public class AddressController : Controller
    {
        private readonly GeneralService _generalService;
        public AddressController(GeneralService generalService)
        {
            _generalService = generalService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            IEnumerable<CountriesListViewModel> model_Country = null;
            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

            string token = HttpContext.User.FindFirst("Token").Value;
            //IEnumerable<CityListViewModel> model_City = null;
            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var model = new List<AddressListViewModel>();
            var list = await _generalService.AddressesList(model);
            return View(list.Data);
        }
        [HttpGet]
        public async Task<IActionResult> Create()
        {


            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(AddressViewModel address)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                address.Dire_UsuarioCreacion = Convert.ToInt32(UserID);
                var list = await _generalService.CreateAddress(token,address);
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
        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (AddressListViewModel)(await _generalService.AddressFind(id, token)).Data;
            return View(detalle);
        }

        [HttpPost]
        public async Task<IActionResult> Delete(AddressViewModel Address, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                Address.Dire_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _generalService.AddressDelete(Address, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
        }
    }
}
