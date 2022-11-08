using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Diagnostics.Eventing.Reader;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class AccessController : Controller
    {
        //int userId;
        private readonly AccessService _accessServices;
        private readonly GeneralService _generalService;
        public AccessController(AccessService accessService, GeneralService generalService)
        {
            _accessServices = accessService;
            _generalService = generalService;
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult RecoverPassword()
        {
            return View();
        }
       
        [HttpPost]
        public async Task<IActionResult> EmailVerification(EmailVerificationModel emailVerification)
        {
            if (emailVerification.to!= null)
            {
                ServiceResult result = await _accessServices.EmailVerification(emailVerification);
                var EmailVerify = (RequestStatus)result.Data;
                if (result.Success)
                {
                    ServiceResult resultEmail = await _accessServices.EmailSender(emailVerification);
                    int CorrectCode = (int)resultEmail.Data;
                    #region AUTENTICACTION
                    var claims = new List<Claim>
                    {
                    new Claim("User_Id", EmailVerify.CodeStatus.ToString()),
                    new Claim("Correct_Code", CorrectCode.ToString()),

                    };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                    #endregion
                    return RedirectToAction(actionName: "CodeConfirmX", controllerName: "Access");
                }
                else
                {
                    ViewData["EmailError"] = EmailVerify.MessageStatus;
                    return View("RecoverPassword");
                }
            }
            else
            {
                ViewData["EmailError"] = "Rellene este campo";
                return View("RecoverPassword");
            }
            

        }
        public async Task<IActionResult> RegisterAsync()
        {
           var city = await _generalService.CitiesList();
            IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
            ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

            var country = await _generalService.CountriesList();
            IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
            ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

            return View();
        }


        public IActionResult ChangePassword()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> ChangePassword(changePassword password)
        {
            var userID = HttpContext.User.FindFirst("User_Id").ToString();
            var ID = Convert.ToInt32(userID.Substring(9,2));
            

            if (password.usua_Password == null || password.passwordConfirm == null)
            {
                ViewData["passwordValidator"] = "Rellene todo los campos.";
            }
            else if(password.usua_Password != password.passwordConfirm)
            {
                ViewData["passwordValidator"] = "Las contraseñas no coinciden.";
            }else if((password.passwordConfirm.ToString()).Length < 7)
            {
                ViewData["passwordValidator"] = "La contraseña es muy corta.";
            }
            else
            {
                changePasswordViewModel changePassword = new changePasswordViewModel();
                changePassword.usua_ID = ID;
                changePassword.usua_Password = password.passwordConfirm;
                ServiceResult resultPassword = await _accessServices.ChangePassword(changePassword);
                var passwordVerify = (RequestStatus)resultPassword.Data;
                if (passwordVerify.CodeStatus >0)
                {
                    return RedirectToAction(actionName: "LogIn", controllerName: "Access");
                }
                else
                {
                    ViewData["passwordValidator"] = "Ha ocurrido un error.";
                }
            }

            return View();
        }

            public IActionResult CodeConfirmX()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CodeConfirmX(userCodevalidation userValidation)
        {
            var correctCode = HttpContext.User.FindFirst("Correct_Code").ToString();
            var userCode = userValidation.userCode;

            if (userCode == null)
            {
                ViewData["labelValidator"] = "Rellene este campo";
                return View();
            }
            else if ("Correct_Code: " + userCode == correctCode)
            {
                return RedirectToAction(actionName: "ChangePassword", controllerName: "Access");
            }
            else
            {
                ViewData["labelValidator"] = "El código es incorrecto.";
                return View();
            }
            

        }

        public IActionResult LandingPage()
        {
            return View();
        }

        //USAR REFERENCIAS Models y Data
        [HttpPost]
        public async Task<IActionResult> LogIn(UserLoginModel LogInData)
        {

            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            if (LogInData.Email == null || LogInData.Password == null)
            { 
                if (LogInData.Password == null && LogInData.Email != null)
                {
                    ViewData["LoginErrorEmail"] = null;
                    ViewData["LoginError"] = "Ingrese una contraseña";
                    return View();
                }
                else if (LogInData.Password != null && LogInData.Email == null)
                {

                    ViewData["LoginErrorEmail"] = "Ingrese un correo electrónico";
                    ViewData["LoginError"] = null;
                    return View();
                }
                else
                {
                    ViewData["LoginErrorEmail"] = "Ingrese un correo electrónico";
                    ViewData["LoginError"] = "Ingrese una contraseña";
                    return View();
                }
            }
            else if (LogInData.Email != null && LogInData.Password != null)
            {
                var LogInVerify = (UserLoggedModel)(await _accessServices.LogIn(LogInData)).Data;
                
                if (LogInVerify != null)
                {
                    HttpContext.Session.SetInt32("UserID", LogInVerify.ID);
                    HttpContext.Session.SetString("ImgUrl", LogInVerify.Image_URL);
                    HttpContext.Session.SetString("Name", LogInVerify.Nombre);
                    HttpContext.Session.SetString("Role", LogInVerify.Rol);
                    HttpContext.Session.SetString("PartnerID", LogInVerify.PartnerID.ToString());

                    //2.- CONFIGURACION DE LA AUTENTICACION
                    #region AUTENTICACTION
                    var claims = new List<Claim>
                    {
                    new Claim("User_Id", LogInVerify.ID.ToString()),
                    new Claim("User_Name", LogInVerify.Nombre),
                    new Claim("Token", LogInVerify.Token),
                    new Claim("Role_Id", LogInVerify.Role_ID.ToString()),
                    new Claim("Partner_Id", LogInVerify.PartnerID.ToString()),
                    new Claim(ClaimTypes.Role,LogInVerify.Rol)
                    };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(claimsIdentity));
                    #endregion

                    switch (LogInVerify.Rol)
                    {
                        case "Administrador":
                            return RedirectToAction(actionName: "adminDashboard", controllerName: "Home");
                        case "Cliente":
                            return RedirectToAction(actionName: "Index", controllerName: "ClientHome");
                        case "Moderador de Hotel":
                            return RedirectToAction(actionName: "HotelDashboard", controllerName: "DashBoardHotelHome");
                        case "Moderador de Restaurante":
                            return RedirectToAction(actionName: "Index", controllerName: "Home");
                        case "Moderador de Agencia Turistica":
                            return RedirectToAction(actionName: "Index", controllerName: "Home");
                        case "Moderador de Transporte":
                            return RedirectToAction(actionName: "Index", controllerName: "DashBoardTransportsHome");
                        case "Moderador de Actividades":
                            return RedirectToAction(actionName: "Index", controllerName: "Home");
                        default:
                            return RedirectToAction(actionName: "Index", controllerName: "Home");
                    }
                }
                else
                {
                    ViewData["LoginError"] = "El correo electronico y/o contraseña son incorrectos";
                    return View();
                }
            }
            else
            {
                return View();
            }

        }

        [HttpGet]
        [Route("/read-claims")]
        public ServiceResult ClaimReading(string key)
        {
            ServiceResult result = new ServiceResult();
            var customClaim = HttpContext.User.FindFirst(key);
            result.Data = customClaim == null || customClaim.Value == null ? "" : customClaim.Value;
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
