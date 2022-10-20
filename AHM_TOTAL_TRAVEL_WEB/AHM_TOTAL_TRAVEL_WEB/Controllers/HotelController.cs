﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class HotelController : Controller
    {
        private readonly HotelsService _hotelService;
        private readonly GeneralService _generalService;

        public HotelController(HotelsService hotelService, GeneralService generalService)
        {
            _hotelService = hotelService;
            _generalService = generalService;
        }

        //[HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            //var model = new List<HotelListViewModel>();
            var list = await _hotelService.HotelsList(token);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            //string token = HttpContext.User.FindFirst("Token").Value;

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var suburb = await _generalService.SuburbsList();
            IEnumerable<SuburbsListViewModel> data_Subu = (IEnumerable<SuburbsListViewModel>)suburb.Data;
            ViewBag.City_ID = new SelectList(data_Subu, "ID", "Colonia");

            var partners = await _generalService.PartnersList();
            IEnumerable<PartnersListViewModel> data_Partners = (IEnumerable<PartnersListViewModel>)partners.Data;
            ViewBag.Part_ID = new SelectList(data_Partners, "ID", "Nombre");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(HotelViewModel hotel)
        {
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                hotel.Hote_UsuarioCreacion=int.Parse(id);
                var list = await _hotelService.HotelCreate(hotel, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var item = new HotelListViewModel();
            IEnumerable<HotelListViewModel> model = null;
            var list = await _hotelService.HotelsList(token);
            IEnumerable<HotelListViewModel> data = (IEnumerable<HotelListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.ID = element.ID;
            item.Hotel = element.Hotel;
            item.Descripcion = element.Descripcion;
            item.ID_Partner = element.ID_Partner;
            item.ID_Direc = element.ID_Direc;

            var direccion = (AddressListViewModel)(await _generalService.AddressFind(element.ID_Direc.ToString(), token)).Data;

            ViewData["HotelFolder"] = $"Hotels/Hotel-{item.ID}/Place/Hotel_Images-{item.ID}";
            ViewData["Hotel_ID"] = element.ID;
            ViewData["Calle"] = direccion.Calle;
            ViewData["Avenida"] = direccion.Avenida;
            ViewData["Colonia"] = direccion.ID_Colonia;
            ViewData["Pais"] = direccion.ID_Pais;
            ViewData["Ciudad"] = direccion.ID_Ciudad;
            ViewData["Partner"] = element.ID_Partner;

            var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var suburb = await _generalService.SuburbsList();
            IEnumerable<SuburbsListViewModel> data_Subu = (IEnumerable<SuburbsListViewModel>)suburb.Data;
            ViewBag.City_ID = new SelectList(data_Subu, "ID", "Colonia");

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

            var partners = await _generalService.PartnersList();
            IEnumerable<PartnersListViewModel> data_Partners = (IEnumerable<PartnersListViewModel>)partners.Data;
            ViewBag.Part_ID = new SelectList(data_Partners, "ID", "Nombre");

            return View(item);
        }

        //[HttpPost]
        //public async Task<IActionResult> Update(ActivitiesViewModel actividad, int id)
        //{

        //    if (ModelState.IsValid)
        //    {
        //        string token = HttpContext.User.FindFirst("Token").Value;
        //        //actividad.actv_UsuarioModifica = 1;
        //        var lista = await _activitiesServices.ActivitiesUpdate(actividad, id, token);
        //        return RedirectToAction("Index");
        //    }
        //    else
        //    {
        //        return View();
        //    }

        //}

        [HttpPost]
        public async Task<IActionResult> Delete(HotelViewModel hotel, int id)
        {
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                hotel.Hote_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _hotelService.HotelDelete(hotel, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
        }

        public async Task<IActionResult> Details(string id)
        {

            string token = HttpContext.User.FindFirst("Token").Value;
            var hotel = (HotelListViewModel)(await _hotelService.HotelFind(id, token)).Data;


            return View(hotel);
        }
    }
}
