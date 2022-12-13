using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
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
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                var PaisesList = (IEnumerable<CountriesListViewModel>)(await _generalService.CountriesList()).Data;
                ViewBag.Paises = new SelectList(PaisesList, "ID", "Pais");
                var id = HttpContext.User.FindFirst("User_Id").Value;
                var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

                var direccion = (AddressListViewModel)(await _generalService.AddressFind(cuenta.DireccionID.ToString(), token)).Data;
                if (direccion != null)
                {
                    ViewData["Calle"] = direccion.Calle;
                    ViewData["Avenida"] = direccion.Avenida;
                    ViewData["Pais"] = direccion.ID_Pais;
                    ViewData["Ciudad"] = direccion.ID_Ciudad;
                    ViewData["Colonia"] = direccion.ID_Colonia;
                    ViewData["DireccionExacta"] = $"Calle {direccion.Calle}, Avenida {direccion.Avenida}, Colonia {direccion.Colonia}, Ciudad de {direccion.Ciudad}, {direccion.Pais}";

                }

                var fechanaci = cuenta.Fecha_Nacimiento.ToString().Split(" ");
                ViewData["Fechanaci"] = fechanaci[0];

                //var direccionDetalle = direccion.Direccion.Split(", ");           PERDON ):
                //ViewData["Colonia"] = direccionDetalle[0].Split(". ")[1];
                //ViewData["Calle"] = direccionDetalle[1].Split(". ")[1];
                //ViewData["Avenida"] = direccionDetalle[2].Split(". ")[1];
                //ViewData["CiudadID"] = direccion.C

                return View(cuenta);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> Update()
        {
            try
            {
                return await Task.Run(() => View());
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
            
        }


    }
}
