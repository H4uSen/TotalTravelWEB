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
            var CiudadesList = (IEnumerable<CityListViewModel>) (await _generalService.CitiesList(token)).Data;
            ViewBag.Ciudades = new SelectList(CiudadesList, "ID", "Ciudad");
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;

            return View(cuenta);
        }

        [HttpPost]
        public async Task<IActionResult> Update(UserUpdateViewModel data)
        {
            var id = HttpContext.User.FindFirst("User_Id").Value;
            var token = HttpContext.User.FindFirst("Token").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(id, token)).Data;
            data.Role_ID = cuenta.Role_ID;
            data.Part_ID = cuenta.PartnerID;
            data.Usua_ID = int.Parse(id);
            data.Usua_UsuarioModifica = int.Parse(id);
            AddressViewModel addressdata = new AddressViewModel()
            {
                Ciud_ID = data.Ciu_ID,
                Dire_Descripcion = data.Dire_Descripcion,
                Dire_UsuarioCreacion = int.Parse(id)
            };
            var addressStatus = (RequestStatus)(await _generalService.CreateAddress(token, addressdata)).Data;

            if (addressStatus.CodeStatus > 0)
            {
                data.Dire_ID = addressStatus.CodeStatus;
                var items = _mapper.Map<UserViewModel>(data);
                var userStatus = (RequestStatus)(await _accessService.UserUpdate(items, token)).Data;

                if (userStatus.CodeStatus <= 0)
                {
                    ViewData["Error"] = "Error al actualizar el usuario";
                }                
            }
            else
            {
                ViewData["Error"] = "Error al actualizar el usuario";
            }

            return View(cuenta);
        }
    }
}
