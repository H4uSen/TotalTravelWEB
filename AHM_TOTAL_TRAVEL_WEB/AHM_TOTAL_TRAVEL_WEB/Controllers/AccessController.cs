using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using DocumentFormat.OpenXml.Office2010.CustomUI;
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

        public IActionResult Login(string Command)
        {
            try
            {
                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            
        }

        public IActionResult RecoverPassword()
        {
            try
            {
                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            
        }
       
        [HttpPost]
        public async Task<IActionResult> EmailVerification(EmailVerificationModel emailVerification)
        {
            try
            {
                if (emailVerification.to != null)
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

                        return Redirect("/Access/CodeConfirmX?success=" + EmailVerify.CodeStatus);
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
            catch(Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
           
        }
        public async Task<IActionResult> RegisterAsync()
        {
            try
            {
                var city = await _generalService.CitiesList();
                IEnumerable<CityListViewModel> data_City = (IEnumerable<CityListViewModel>)city.Data;
                ViewBag.City_ID = new SelectList(data_City, "ID", "Ciudad");

                var country = await _generalService.CountriesList();
                IEnumerable<CountriesListViewModel> data_Country = (IEnumerable<CountriesListViewModel>)country.Data;
                ViewBag.Count_ID = new SelectList(data_Country, "ID", "Pais");

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            
        }


        public IActionResult ChangePassword()
        {
            try
            {
                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            
        }
        [HttpPost]
        public async Task<IActionResult> ChangePassword(changePassword password)
        {
            try
            {
                var userID = password.ID;

                if (password.usua_Password == null || password.passwordConfirm == null)
                {
                    ViewData["passwordValidator"] = "Rellene todo los campos.";
                }
                else if (password.usua_Password != password.passwordConfirm)
                {
                    ViewData["passwordValidator"] = "Las contraseñas no coinciden.";
                }
                else if ((password.passwordConfirm.ToString()).Length < 7)
                {
                    ViewData["passwordValidator"] = "La contraseña es muy corta.";
                }
                else
                {
                    changePasswordViewModel changePassword = new changePasswordViewModel();
                    changePassword.usua_ID = userID;
                    changePassword.usua_Password = password.passwordConfirm;
                    ServiceResult resultPassword = await _accessServices.ChangePassword(changePassword);
                    var passwordVerify = (RequestStatus)resultPassword.Data;
                    if (passwordVerify.CodeStatus > 0)
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
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
           
        }
        [HttpGet]
        public IActionResult CodeConfirmX()
        {

            try
            {
                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> CodeConfirmX(userCodevalidation userValidation)
        {
            try
            {
                var correctCode = HttpContext.User.FindFirst("Correct_Code").ToString();
                var userCode = userValidation.userCode;
                var userID = userValidation.ID;

                if (userCode == null)
                {
                    ViewData["labelValidator"] = "Rellene este campo";
                    return View();
                }
                else if ("Correct_Code: " + userCode == correctCode)
                {

                    return Redirect("/Access/ChangePassword?success=" + userID);
                }
                else
                {
                    ViewData["labelValidator"] = "El código es incorrecto.";
                    return View();
                }
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            
            

        }

        [Route("/")]
        public IActionResult LandingPage()
        {
            try
            {
                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            
        }

        [HttpPost]
        public async Task<object> ManualLogIn([FromBody]UserLoginModel LogInData)
        {
            try { 
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            var LogInVerify = (UserLoggedModel)(await _accessServices.LogIn(LogInData)).Data;

            if (LogInVerify != null)
            {
                HttpContext.Session.SetInt32("UserID", LogInVerify.ID);
                HttpContext.Session.SetString("ImgUrl", LogInVerify.Image_URL);
                HttpContext.Session.SetString("Name", LogInVerify.Nombre);
                HttpContext.Session.SetString("Role", LogInVerify.Rol);
                HttpContext.Session.SetString("Role_Id", LogInVerify.Role_ID.ToString());
                HttpContext.Session.SetInt32("PartnerID", LogInVerify.PartnerID.GetValueOrDefault());
                HttpContext.Session.SetString("Token", LogInVerify.Token);

                if (LogInVerify.Rol == "Administrador" && LogInVerify.PartnerID != null)
                {
                    HttpContext.Session.SetInt32("PartnerID", LogInVerify.PartnerID.GetValueOrDefault());
                }
                if (LogInVerify.Rol != "Cliente" && LogInVerify.Partner != null)
                {
                    HttpContext.Session.SetString("Partner", LogInVerify.Partner);
                }

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

                return 1;
            }
            else
                return LogInData;
            }
            catch
            {
                return 0;
            }

        }

        //USAR REFERENCIAS Models y Data
        [HttpPost]
        public async Task<IActionResult> LogIn(UserLoginModel LogInData, string Command)
        {

            try
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
                        HttpContext.Session.SetString("Role_Id", LogInVerify.Role_ID.ToString());
                        HttpContext.Session.SetInt32("PartnerID", LogInVerify.PartnerID.GetValueOrDefault());
                        HttpContext.Session.SetString("Token", LogInVerify.Token);

                        if (LogInVerify.Rol == "Administrador" && LogInVerify.PartnerID != null)
                        {
                            HttpContext.Session.SetInt32("PartnerID", LogInVerify.PartnerID.GetValueOrDefault());
                        }
                        if (LogInVerify.Rol != "Cliente" && LogInVerify.Partner != null)
                        {
                            HttpContext.Session.SetString("Partner", LogInVerify.Partner);
                        }

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
                                return RedirectToAction(actionName: "restaurantDashboard", controllerName: "Home");
                            case "Moderador de Agencia Turistica":
                                return RedirectToAction(actionName: "Index", controllerName: "Home");
                            case "Moderador de Transporte":
                                return RedirectToAction(actionName: "Index", controllerName: "DashBoardTransportsHome");
                            case "Moderador de Actividades":
                                return RedirectToAction(actionName: "activitiesDashboard", controllerName: "Home");
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
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
            

        }

        [HttpGet]
        [Route("/read-claims")]
        public ServiceResult ClaimReading(string key)
        {
            ServiceResult result = new ServiceResult();
            try
            {         
                var customClaim = HttpContext.User.FindFirst(key);
                result.Data = customClaim == null || customClaim.Value == null ? "" : customClaim.Value;
                result.Success = true;
                result.Type = ServiceResultType.Success;
                return result;
            }
            catch (Exception)
            {
                result.Type = ServiceResultType.Error;
                result.Success = false;
                return result;
            }
            
        }

        public async Task<IActionResult> LogOut()
        {
            try 
            {
                //3.- CONFIGURACION DE LA AUTENTICACION
                #region AUTENTICACTION
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                #endregion
                RouteValuesModel valuesModel = new RouteValuesModel();
                valuesModel.Command = "endSession";
                return RedirectToAction("LogIn", new { Command="endSession" });
            }
            catch (Exception)
            {
                return RedirectToAction("LogIn", "Access");
            }
        }
    }
}
