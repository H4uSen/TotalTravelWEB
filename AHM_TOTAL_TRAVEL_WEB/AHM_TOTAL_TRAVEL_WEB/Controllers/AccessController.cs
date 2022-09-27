using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class AccessController : Controller
    {
        AccessService _accessServices;
        public AccessController(AccessService accessService)
        {
            _accessServices = accessService;
        }

        public IActionResult LogIn()
        {
            return View();
        }

        //USAR REFERENCIAS Models y Data
        [HttpPost]
        public async Task<IActionResult> LogIn(UserViewModel LogInData)
        {

            var LogInVerify = (UserViewModel)(await _accessServices.LogIn(LogInData)).Data;

            if (LogInVerify != null)
            {

                //2.- CONFIGURACION DE LA AUTENTICACION
                #region AUTENTICACTION
                var claims = new List<Claim>
                {
                    new Claim("Name", LogInVerify.Usua_Nombre + LogInVerify.Usua_Apellido),
                    new Claim("Email", LogInVerify.Usua_Email),
                    new Claim("Role", LogInVerify.Role_ID.ToString()),
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                #endregion


                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewBag["LoginError"] = "Usuario no existente o datos incorrectos";
                return View();
            }

        }

        public async Task<IActionResult> Salir()
        {
            //3.- CONFIGURACION DE LA AUTENTICACION
            #region AUTENTICACTION
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            #endregion

            return RedirectToAction("Index");
        }
    }
}
