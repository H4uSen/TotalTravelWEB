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
    public class AccountController : Controller
    {
        private readonly AccessService _accessService;
        private readonly GeneralService _generalService;

        private readonly IMapper _mapper;


        public AccountController(AccessService accessService, GeneralService generalService, IMapper mapper)
        {
            _accessService = accessService;
            _generalService = generalService;
            _mapper = mapper;
        }

        //[HttpGet]
        public async Task<IActionResult>Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var CiudadesList = (IEnumerable<CityListViewModel>) (await _generalService.CitiesList()).Data;
            ViewBag.Ciudades = new SelectList(CiudadesList, "ID", "Ciudad");
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            var direccion = (AddressListViewModel)(await _generalService.AddressFind(cuenta.DireccionID.ToString(), token)).Data;
            var direccionDetalle = direccion.Direccion.Split(", ");
            ViewData["Colonia"] = direccionDetalle[0].Split(". ")[1];
            ViewData["Calle"] = direccionDetalle[1].Split(". ")[1];
            ViewData["Avenida"] = direccionDetalle[2].Split(". ")[1];
            //ViewData["CiudadID"] = direccion.C

            return View(cuenta);
        }

        [HttpPost]
        public async Task<IActionResult> Update(UserUpdateViewModel data)
        {
            return View();
        }


    }
}
