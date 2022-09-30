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
        public IActionResult LandingPage()
        {
            return View();
        }

        //USAR REFERENCIAS Models y Data
        [HttpPost]
        public async Task<IActionResult> LogIn(UserLoginModel LogInData)
        {

            var LogInVerify = (UserLoggedModel)(await _accessServices.LogIn(LogInData)).Data;

            if (LogInVerify != null)
            {
                
                //2.- CONFIGURACION DE LA AUTENTICACION
                #region AUTENTICACTION
                var claims = new List<Claim>
                {
                    new Claim("User_Id", LogInVerify.ID.ToString()),
                    new Claim("User_Name", LogInVerify.nombre_completo),
                    new Claim(ClaimTypes.Role, LogInVerify.Role_ID.ToString()),
                    new Claim("Token", LogInVerify.Token),
                };

                var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                #endregion


                return RedirectToAction("Index", "Home");
            }
            else
            {
                ViewData["LoginError"] = "Usuario no existente o datos incorrectos";
                return View();
            }

        }

        [HttpGet]
        [Route("/read-claims")]
        public ServiceResult ClaimReading(string key)
        {
            ServiceResult result = new ServiceResult();
            var customClaim = HttpContext.User.FindFirst(key);
            result.Data = customClaim.Value;
            result.Success = true;
            result.Type = ServiceResultType.Success;
            return result;
        }

        public async Task<IActionResult> LogOut()
        {
            //3.- CONFIGURACION DE LA AUTENTICACION
            #region AUTENTICACTION
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            #endregion

            return RedirectToAction("LogIn");
        }
    }
}
