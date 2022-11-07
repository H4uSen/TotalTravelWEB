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
    public class BuyDefaultsController : Controller
    {
        SaleServices _saleServices;
        AccessService _accessService;
        TransportService _transportService;
        private readonly ReservationService _reservationService;

        public BuyDefaultsController(SaleServices saleServices, AccessService accessService, TransportService transportService, ReservationService reservationService)
        {
            _saleServices = saleServices;
            _accessService = accessService;
            _transportService = transportService;
            _reservationService = reservationService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<DefaultPackagesListViewModel>();
            var list = await _saleServices.DefaultPackagesList(token);
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
            return View(detalle);
        }
        public async Task<IActionResult> Comprar(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (DefaultPackagesListViewModel)(await _saleServices.DefaultPackagesFind(id, token)).Data;
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
        public async Task<IActionResult> Create(ReservationViewModel reservation)
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            string UserID = HttpContext.User.FindFirst("User_Id").Value;
            reservation.Resv_UsuarioCreacion = int.Parse(UserID);
            var result = await _reservationService.ReservationCreate(reservation, token);
            if (result.Success)
            {
                return View();
            }
            else
            {
                ModelState.AddModelError(string.Empty, result.Message);
            }

            return View(reservation);
        }
    }
}