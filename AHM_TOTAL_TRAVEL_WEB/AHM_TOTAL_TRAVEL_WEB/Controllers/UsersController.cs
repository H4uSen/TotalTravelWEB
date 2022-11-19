using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.CodeAnalysis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "Admin")]
    public class UsersController : Controller
    {
        private readonly GeneralService _GeneralServices;
        private readonly AccessService _AccessService;
        public UsersController(GeneralService GeneralService, AccessService AccessService)
        {
            _GeneralServices = GeneralService;
            _AccessService = AccessService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<UserListViewModel> UserList = (IEnumerable<UserListViewModel>)(await _AccessService.UsersList(token)).Data;
            return View(UserList);
        }

        public async Task<IActionResult> Update()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Create(RouteValuesModel routeValues)
        {
            IEnumerable<CountriesListViewModel> listCounties = (IEnumerable<CountriesListViewModel>)(await _GeneralServices.CountriesList()).Data;
            IEnumerable<PartnerTypeListViewModel> listPartnersType = (IEnumerable<PartnerTypeListViewModel>)(await _GeneralServices.PartnerTypeList()).Data;
            ViewBag.Counties = new SelectList(listCounties, "ID", "Pais");
            ViewBag.PartnersTypes = new SelectList(listPartnersType, "ID", "Descripcion");
            ViewBag.Controller = routeValues.BackController;
            ViewBag.Action = routeValues.BackAction;
            ViewBag.isRedirected = routeValues.IsRedirect;
            return View();
        }

        [HttpPost]
        public IActionResult Create(IFormCollection form)
        {
            try
            {
                return RedirectToAction(form["action"], form["controller"], new RouteValuesModel { BackController = "Users", BackAction = "Create", IsRedirect = true, responseID = int.Parse(form["txtUserID"]) });
            }
            catch (Exception)
            {

                return RedirectToAction("Error", "Home");
            }
            
        }


        [HttpPost]
        public async Task<IActionResult> Delete(int User_Id)
        {

            string token = HttpContext.User.FindFirst("Token").Value;
            int user_modify = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
            var response = (RequestStatus)(await _AccessService.DeleteUser(User_Id, user_modify, token)).Data;

            return Ok(response.CodeStatus);
        }

        public async Task<IActionResult> Details(int User_Id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var response = (UserListViewModel)(await _AccessService.UsersFind(User_Id, token)).Data;
            var AddressData = (AddressListViewModel)(await _GeneralServices.AddressFind(response.DireccionID.ToString(),token)).Data;

            ViewData["DIreccionCompleta"] = "Direccion No disponible";
            if (AddressData != null)
                ViewData["DIreccionCompleta"] =
                    $"Calle {AddressData.Calle}, Avenida {AddressData.Avenida}, ciudad de {AddressData.Ciudad}, {AddressData.Pais}";


            return View(response);
        }
    }
}
