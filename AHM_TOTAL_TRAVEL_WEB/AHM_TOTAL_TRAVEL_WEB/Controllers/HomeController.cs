using AHM_TOTAL_TRAVEL_WEB.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AHM_TOTAL_TRAVEL_WEB.Services;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize]
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly GeneralService _generalServices;
        private readonly SaleServices _SaleServices;
        private readonly ReservationService _ReservationService;
        private readonly AccessService _AccessService;

        public HomeController(ILogger<HomeController> logger, GeneralService GeneralService, SaleServices SaleServices,
                              ReservationService ReservationService, AccessService AccessService)
        {
            _generalServices = GeneralService;
            _SaleServices = SaleServices;
            _ReservationService = ReservationService;
            _AccessService = AccessService;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> adminDashboardAsync()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            IEnumerable<PartnersListViewModel> partners =
                (IEnumerable<PartnersListViewModel>)(await _generalServices.PartnersList()).Data;

            IEnumerable<DefaultPackagesListViewModel> packages =
                (IEnumerable<DefaultPackagesListViewModel>)(await _SaleServices.DefaultPackagesList(token)).Data;

            IEnumerable<ReservationListViewModel> reservations =
               (IEnumerable<ReservationListViewModel>)(await _ReservationService.ReservationList(token)).Data;

            IEnumerable<UserListViewModel> clientes =
              (IEnumerable<UserListViewModel>)(await _AccessService.UsersList(token)).Data;

            ViewData["agencias_hotel_count"] = partners.Where(partner => partner.TipoPartner_Id == 1).LongCount();
            ViewData["agencias_transportes_count"] = partners.Where(partner => partner.TipoPartner_Id == 2).LongCount();
            ViewData["agencias_turismo_count"] = partners.Where(partner => partner.TipoPartner_Id == 3).LongCount();
            ViewData["agencias_restaurante_count"] = partners.Where(partner => partner.TipoPartner_Id == 4).LongCount();

            ViewData["paquetes_count"] = packages.LongCount();
            ViewData["reservarion_count"] = reservations.LongCount();
            ViewData["partners_count"] = partners.LongCount();
            ViewData["clientes_count"] = clientes.Where(cliente => cliente.Role_ID == 2).LongCount();
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error404()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error401()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
