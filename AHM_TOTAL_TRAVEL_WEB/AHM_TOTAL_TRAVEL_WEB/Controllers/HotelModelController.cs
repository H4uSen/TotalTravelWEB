﻿using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
    public class HotelModelController : Controller
    {
        private readonly HotelsService _hotelsService;

        public HotelModelController( HotelsService hotelsService)
        {
           
            _hotelsService = hotelsService;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try {
            var token = HttpContext.User.FindFirst("Token").Value;
            var list = await _hotelsService.HotelsList(token);

            return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
