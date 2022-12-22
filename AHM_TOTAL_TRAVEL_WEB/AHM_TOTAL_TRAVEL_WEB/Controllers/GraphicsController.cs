using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
    public class GraphicsController : Controller
    {
        public IActionResult Index()
        {
            try
            {
                ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        public IActionResult Hoteles()
        {
            try
            {
                ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        public IActionResult Actividades()
        {
            try
            {
                ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        public IActionResult Transportes()
        {
            try
            {
                ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        public IActionResult Restaurantes()
        {
            try
            {
                ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
