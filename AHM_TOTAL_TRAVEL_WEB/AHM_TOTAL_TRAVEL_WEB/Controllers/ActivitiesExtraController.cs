﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ActivitiesExtraController : Controller
    {
        ActivitiesServices _activitiesServices;

        public ActivitiesExtraController(ActivitiesServices activitiesServices)
        {
            _activitiesServices = activitiesServices;
        }
        public async Task<IActionResult> Index()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var list = await _activitiesServices.ExtraActivitiesList(token);
            return View(list.Data);
        }
    }
}
