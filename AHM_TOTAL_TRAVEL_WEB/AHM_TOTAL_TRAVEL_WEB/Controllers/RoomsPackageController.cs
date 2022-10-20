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
    public class RoomsPackageController : Controller
    {
        SaleServices _saleServices;

        public RoomsPackageController(SaleServices saleServices, HotelsService hotelsService, RestaurantService restaurantService)
        {
            _saleServices = saleServices;
            //_HotelsService = hotelsService;
            //_RestaurantService = restaurantService;
        }
        [HttpGet]

        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;

            IEnumerable<DefaultPackagesListViewModel> model_Country = null;
            var defaultPackages = await _saleServices.DefaultPackagesList(token);
            IEnumerable<DefaultPackagesListViewModel> data_defaultPackages = (IEnumerable<DefaultPackagesListViewModel>)defaultPackages.Data;
            ViewBag.Paqu_ID = new SelectList(data_defaultPackages, "Id", "Nombre");

            var model = new List<RoomsPackagesListViewModel>();
            var list = await _saleServices.RoomsPackagesList(token);
            return View(list.Data);
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoomsPackagesViewModel rooms)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                rooms.paHa_UsuarioCreacion = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _saleServices.RoomsPackagesCreate(rooms, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        //[HttpGet]
        //public async Task<IActionResult> Update(int id)
        //{
        //    string token = HttpContext.User.FindFirst("Token").Value;
        //    var defaultPackages = await _saleServices.DefaultPackagesList(token);
        //    IEnumerable<DefaultPackagesListViewModel> data_defaultPackages = (IEnumerable<DefaultPackagesListViewModel>)defaultPackages.Data;
        //    ViewBag.Paqu_ID = new SelectList(data_defaultPackages, "Id", "Nombre");


        //    //var item = new PartnerTypeViewModel();
        //    //var list = await _generalServices.PartnerTypeList();
        //    //IEnumerable<PartnerTypeListViewModel> data = (IEnumerable<PartnerTypeListViewModel>)list.Data;
        //    //var element = data.Where(x => x.ID == id).ToList()[0];
        //    //item.TiPar_ID = element.ID;
        //    //item.TiPar_Descripcion = element.Descripcion;
        //    //item.Rol_ID = element.Rol_Id;

        //    //ViewData["Rol_IDview"] = item.Rol_ID;


        //    return View();

        //}

        public async Task<IActionResult> Delete(int id)
        {
            if (ModelState.IsValid)
            {
                int modifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _saleServices.RoomsPackagesDelete(modifica, id, token)).Data;

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
            var transporte = (RoomsPackagesListViewModel)(await _saleServices.RoomsPackagesFind(id, token)).Data;

            return View(transporte);
        }
    }
}
