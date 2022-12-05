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
    public class BuyDefaultsController : Controller
    {
        SaleServices _saleServices;
        AccessService _accessService;
        TransportService _transportService;
        private readonly ReservationService _reservationService;
        private readonly GeneralService _generalService;

        public BuyDefaultsController(SaleServices saleServices, AccessService accessService, TransportService transportService, ReservationService reservationService, GeneralService generalService)
        {
            _saleServices = saleServices;
            _accessService = accessService;
            _transportService = transportService;
            _reservationService = reservationService;
            _generalService = generalService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            int User_Id = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

            var list = await _saleServices.DefaultPackagesList(token);
            var usuario = (UserListViewModel)(await _accessService.UsersFind(User_Id, token)).Data;
            var direccion = (AddressListViewModel)(await _generalService.AddressFind(usuario.DireccionID.ToString(), token)).Data;
            var ciudades = (IEnumerable<CityListViewModel>)(await _generalService.CitiesList()).Data;

            foreach (var item in ciudades)
                item.Ciudad = $"{item.Ciudad}, {item.Pais}";

            ViewBag.Destinos = new SelectList(ciudades, "ID", "Ciudad");
            ViewBag.CiudadesOrigen = new SelectList(ciudades, "ID", "Ciudad", direccion.ID_Ciudad);
            return View(list.Data);
        }

        //[HttpGet]
        public async Task<IActionResult> Compra(string id)
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var paquete = (DefaultPackagesListViewModel)(await _saleServices.DefaultPackagesFind(id, token)).Data;
            var iduser = HttpContext.User.FindFirst("User_Id").Value;
            var cuenta = (UserListViewModel)(await _accessService.AccountFind(iduser, token)).Data;
            ViewData["ID"] = cuenta.ID;
            ViewData["Nombre"] = cuenta.Nombre;
            ViewData["Apellido"] = cuenta.Apellido;
            ViewData["DNI"] = cuenta.DNI;
            ViewData["FechaNaci"] = cuenta.Fecha_Nacimiento;
            ViewData["Correo"] = cuenta.Email;
            ViewData["noches"] = int.Parse(paquete.Duracion_Paquete) - 1;

            return View(paquete);
        }
        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (DefaultPackagesListViewModel)(await _saleServices.DefaultPackagesFind(id, token)).Data;

            ViewData["noches"] = int.Parse(detalle.Duracion_Paquete) - 1;

            return View(detalle);
        }

        public async Task<IActionResult> Transport()
        {
            //string token = HttpContext.User.FindFirst("Token").Value;
            var list = await _transportService.TransportList();
            return View(list.Data);
        }
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<int> Create(ReservationViewModel reservation)
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            string UserID = HttpContext.User.FindFirst("User_Id").Value;
            reservation.Resv_UsuarioCreacion = int.Parse(UserID);
            var result = (RequestStatus)(await _reservationService.ReservationCreate(reservation, token)).Data;

            return result.CodeStatus;
        }

        public async Task<IActionResult> defaultPackages(string? id_paquete)
        {
            var ciudades = (IEnumerable<CityListViewModel>)(await _generalService.CitiesList()).Data;
            foreach (var item in ciudades)
                item.Ciudad = $"{item.Pais}, {item.Ciudad}";

            ViewBag.ciudades = new SelectList(ciudades, "ID", "Ciudad"); 
            ViewBag.ciudadesResidencia = new SelectList(ciudades, "ID", "Ciudad");

            if(id_paquete == null)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                int User_Id = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                var UserData = (UserListViewModel)(await _accessService.UsersFind(User_Id, token)).Data;
                var UserAddress = (AddressListViewModel)(await _generalService.AddressFind(UserData.DireccionID.ToString(), token)).Data;
                ViewData["Correo"] = UserData.Email;
                ViewBag.ciudadesResidencia = new SelectList(ciudades, "ID", "Ciudad", UserAddress.ID_Ciudad);
            }

            var tiposPagos = (IEnumerable<TipeofpayListViewModel>)(await _saleServices.PaymentTypesList()).Data;
            ViewBag.MetodosPagos = new SelectList(tiposPagos, "ID", "Descripcion");
            
            return View();
        }
    }
}