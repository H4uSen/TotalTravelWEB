using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AngleSharp.Html;
using AspNetCore.Report.ReportService2010_;
using Irony.Parsing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.WebPages;
using System.Xml.Linq;
using static AHM_TOTAL_TRAVEL_WEB.Models.ReservationViewModel;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
    public class ReservationController : Controller
    {
        private readonly ReservationService _reservationService;
        private readonly HotelsService _hotelsService;
        private readonly AccessService _accessService;
        private readonly SaleServices _saleServices;
        private readonly ActivitiesServices _activitiesServices;
        private readonly GeneralService _GeneralService;

        public ReservationController(ReservationService reservationService, HotelsService hotelsService, AccessService accessService, SaleServices saleServices, ActivitiesServices activitiesServices,
                                     GeneralService GeneralService)
        {
            _reservationService = reservationService;
            _hotelsService = hotelsService;
            _accessService = accessService;
            _saleServices = saleServices;
            _activitiesServices = activitiesServices;
            _GeneralService = GeneralService;
        }


        [HttpGet]
     
        public async Task<IActionResult> Index(RouteValuesModel routeValues)
        {
            try { 
            ViewBag.RouteValues = routeValues;
            var token = HttpContext.User.FindFirstValue("Token");
            List<PaymentRecordListViewModel> payments = (List<PaymentRecordListViewModel>)(await _saleServices.PaymentRecordsList()).Data;
            List<ReservationListViewModel> list = (List<ReservationListViewModel>)(await _reservationService.ReservationList(token)).Data;
            list.ForEach(item =>
            {
                item.AmountOfPayments = (payments.Where(x => x.Id_Reservacion == item.ID)).Count();
            });
            return View(list);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
     
        public async Task<IActionResult> Create(RouteValuesModel routeValues)
        {
            try { 
                string token = HttpContext.User.FindFirstValue("Token");
                try
                {
                    if (routeValues.Command == "Personalize")
                        return RedirectToAction("PersonalizaPackage", "Reservation", routeValues);

                    ViewBag.RouteValues = routeValues;


                    var responseHotelsActivities = await _hotelsService.HotelsActivitiesList(token);
                    List<HotelsActivitiesListViewModel> hotelsActivities = (List<HotelsActivitiesListViewModel>)responseHotelsActivities.Data;
                    ViewBag.hotelActivities = new MultiSelectList(hotelsActivities, "ID", "ddlItem");

                    var responseExtraActivities = await _activitiesServices.ExtraActivitiesList(token);
                    List<ActivitiesExtrasListViewModel> extraActivities = (List<ActivitiesExtrasListViewModel>)responseExtraActivities.Data;
                    ViewBag.extraActivities = new MultiSelectList(extraActivities, "ID", "ddlItem");

                    return View();
                }
                catch (Exception)
                {
                    return View(routeValues);
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(ReservationViewModel reservation, IFormCollection form, RouteValuesModel routeValues)
        {
            try { 
            if (reservation.CrearPersonalizado)
                return RedirectToAction("PersonalizePackages", "Reservation", new RouteValuesModel { BackController = "Reservation", BackAction = "Index", IsRedirect = true, Command = "Reservation", responseID = int.Parse(form["Usua_ID"].ToString()) });
            if (reservation.CrearUsuario)
                return RedirectToAction("Create", "Users", new RouteValuesModel { BackController = "Reservation", BackAction = "Create", IsRedirect = true });

            decimal totalActvExtra = 0;
            decimal totalActvHtel = 0;

            ViewBag.RouteValues = routeValues;
            
            var token = HttpContext.User.FindFirst("Token").Value;
            string UserID = HttpContext.User.FindFirstValue("User_Id");
            reservation.Resv_UsuarioCreacion = int.Parse(UserID);
            var fechaEntrada = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
            DefaultPackagesViewModel Package = (DefaultPackagesViewModel)(await _saleServices.DefaultPackagesFind(reservation.Paqu_ID.GetValueOrDefault().ToString(), token)).Data;
            
            //Extra activities of the hotel
            int amountHtelActvities = form.Keys.Count(x => x.Contains("ddlhotelsExtraActivities_"));
            var ExtraHtelActivities = form.Keys.Where(x => x.Contains("ddlhotelsExtraActivities_")).ToList();
            var ExtraHtelActivitiesAmount = form.Keys.Where(x => x.Contains("hotelsExtraActivitiesAmount_")).ToList();
            var ExtraHtelActivitiesPrice = form.Keys.Where(x => x.Contains("hotelsExtraActivitiesPrice_")).ToList();
            reservation.ActividadesHoteles = new List<ReservacionesActividadesHoteles>();
            if (!amountHtelActvities.Equals(0))
            {
                try
                {
                    for (int i = 0; i < amountHtelActvities; i++)
                    {
                        var key = ExtraHtelActivities[i];
                        var value = form[key];

                        ReservacionesActividadesHoteles actividadesHoteles = new ReservacionesActividadesHoteles();
                        actividadesHoteles.HoAc_ID = int.Parse(value.ToString());
                        actividadesHoteles.ReAH_Cantidad = int.Parse(form[ExtraHtelActivitiesAmount[i]].ToString());
                        actividadesHoteles.ReAH_Precio = decimal.Parse(form[ExtraHtelActivitiesPrice[i]].ToString());
                        actividadesHoteles.ReAH_FechaReservacion = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                        actividadesHoteles.ReAH_HoraReservacion = "1200";
                        totalActvHtel += actividadesHoteles.ReAH_Cantidad.GetValueOrDefault(0) * actividadesHoteles.ReAH_Precio.GetValueOrDefault(0);

                        reservation.ActividadesHoteles.Add(actividadesHoteles);
                    }
                }
                catch (Exception e)
                {
                    
                    throw e;
                }
                
            }

                //Extra activities of the zone
                int amountExtraActivities = form.Keys.Count(x => x.Contains("ddlextraActivities_"));
            var ExtraActivities = form.Keys.Where(x => x.Contains("ddlextraActivities_")).ToList();
            var ExtraActivitiesAmount = form.Keys.Where(x => x.Contains("extraActivitiesAmount_")).ToList();
            var ExtraActivitiesPrice = form.Keys.Where(x => x.Contains("extraActivitiesPrice_")).ToList();
            reservation.ActividadesExtras = new List<ReservacionesActividadesExtras>();
            if (!amountExtraActivities.Equals(0))
            {
                try
                {
                    for (int i = 0; i < amountExtraActivities; i++)
                    {
                        var key = ExtraActivities[i];
                        var value = form[key];
                        ReservacionesActividadesExtras extraActivity = new ReservacionesActividadesExtras();
                        extraActivity.AcEx_ID = int.Parse(value.ToString());
                        extraActivity.ReAE_Cantidad = int.Parse(decimal.Parse(form[ExtraActivitiesAmount[i]]).ToString());
                        extraActivity.ReAE_Precio = decimal.Parse(form[ExtraActivitiesPrice[i]].ToString());
                        extraActivity.ReAE_FechaReservacion = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                        extraActivity.ReAE_HoraReservacion = "1200";

                        totalActvExtra += extraActivity.ReAE_Precio.GetValueOrDefault(0) * extraActivity.ReAE_Cantidad.GetValueOrDefault(0);

                        reservation.ActividadesExtras.Add(extraActivity);
                    }
                }
                catch (Exception e)
                {

                    throw e;
                }
                
            }
            //Adding the extra activities of the package
            List<DefaultPackagesDetailsListViewModel> xtraActvPack = (List<DefaultPackagesDetailsListViewModel>)(await _saleServices.DefaultPackagesDetailsList()).Data;
            List<DefaultPackagesDetailsListViewModel> filteredXtraActvPack = xtraActvPack.Where(x => x.PaqueteID == reservation.Paqu_ID).ToList();
            if (filteredXtraActvPack.Count() > 0) {
                foreach (var actv in filteredXtraActvPack)
                {
                    ReservacionesActividadesExtras extraActivity = new ReservacionesActividadesExtras();
                    extraActivity.AcEx_ID = actv.ActividadID;
                    extraActivity.ReAE_Cantidad = Package.paqu_CantPersonas;
                    extraActivity.ReAE_Precio = actv.Precio;
                    extraActivity.ReAE_FechaReservacion = fechaEntrada;
                    extraActivity.ReAE_HoraReservacion = "1200";

                    totalActvExtra += extraActivity.ReAE_Precio.GetValueOrDefault(0) * extraActivity.ReAE_Cantidad.GetValueOrDefault(0);
                    reservation.ActividadesExtras.Add(extraActivity);
                }
            }


            //Reservation data
            reservation.Usua_ID = int.Parse(form["Usua_ID"].ToString());
            reservation.Resv_esPersonalizado = (form["ddlTipoPaquete"].ToString() == "1") ? true : false;
            reservation.Resv_Precio = decimal.Parse(form["txtDefaultPackagePrice"].ToString()) + totalActvExtra + totalActvHtel;
            reservation.Resv_CantidadPagos = int.Parse(form["Resv_CantidadPagos"].ToString());
            reservation.Resv_NumeroPersonas = int.Parse(form["Resv_NumeroPersonas"].ToString());
            reservation.ReHo_FechaEntrada = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
            reservation.ReHo_FechaSalida = DateTime.Parse(form["datefilter"].ToString().Split("-")[1].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));

            var result = await _reservationService.ReservationCreate(reservation, token);

            if (result.Success)
            {
                routeValues.IsSuccess = true;
                routeValues.responseID = result.Id;
                routeValues.Command = "Create";
                return RedirectToAction("Index", "Reservation", routeValues);
            }
            else
            {
                ModelState.AddModelError(string.Empty, result.Message);
            }

            return View(reservation);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id, RouteValuesModel routeValues)
        {
            try { 
                string token = HttpContext.User.FindFirst("Token").Value;
                routeValues.Command = "Update";
                ViewBag.RouteValues = routeValues;


                var list = await _reservationService.ReservationList(token);
                IEnumerable<ReservationListViewModel> data = (IEnumerable<ReservationListViewModel>)list.Data;
                var element = data.Where(x => x.ID == id).ToList()[0];
                ViewBag.Paquete = element;

                return View("Create");
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> Update(int id, ReservationViewModel reservationData, IFormCollection form, RouteValuesModel routeValues)
        {
            try
            {
                if (reservationData.CrearUsuario)
                    return RedirectToAction("Create", "Users", new RouteValuesModel { BackController = "Reservation", BackAction = "Update", IsRedirect = true });

                var token = HttpContext.User.FindFirstValue("Token");
                int UserID = int.Parse(HttpContext.User.FindFirstValue("User_Id"));

                if (reservationData.EditarPersonalizado)
                {
                 
                    return RedirectToAction("PersonalizePackages", "Reservation",
                        new RouteValuesModel
                        {
                            BackController = "Reservation",
                            BackAction = "Index",
                            IsRedirect = true,
                            Command = "Update",
                            responseID = id,
                            userID = int.Parse(form["Usua_ID"].ToString())
                        });
                    
                }
                    

                decimal totalActvExtra = 0;
                decimal totalActvHtel = 0;

                routeValues.Command = "Update";
                ViewBag.RouteValues = routeValues;

                

                #region Extra Activities
                int amountExtraActivities = form.Keys.Count(x => x.Contains("ddlextraActivities_"));
                var ExtraActivities = form.Keys.Where(x => x.Contains("ddlextraActivities_")).ToList();
                var ExtraActivitiesAmount = form.Keys.Where(x => x.Contains("extraActivitiesAmount_")).ToList();
                var ExtraActivitiesPrice = form.Keys.Where(x => x.Contains("extraActivitiesPrice_")).ToList();
                reservationData.ActividadesExtras = new List<ReservacionesActividadesExtras>();
                if (!amountExtraActivities.Equals(0))
                {
                    try
                    {
                        for (int i = 0; i < amountExtraActivities; i++)
                        {
                            var key = ExtraActivities[i];
                            var value = form[key];
                            ActivitiesExtrasListViewModel actv = (ActivitiesExtrasListViewModel)(await _activitiesServices.ActivitiesExtrasFind(value, token)).Data;
                            
                            ReservacionesActividadesExtras extraActivity = new ReservacionesActividadesExtras();
                            extraActivity.AcEx_ID = int.Parse(value.ToString());
                            extraActivity.ReAE_Cantidad = int.Parse(decimal.Parse(form[ExtraActivitiesAmount[i]]).ToString());
                            extraActivity.ReAE_Precio = actv.Precio;
                            extraActivity.ReAE_FechaReservacion = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                            extraActivity.ReAE_HoraReservacion = "1200";

                            totalActvExtra += extraActivity.ReAE_Precio.GetValueOrDefault(0) * extraActivity.ReAE_Cantidad.GetValueOrDefault(0);

                            reservationData.ActividadesExtras.Add(extraActivity);
                        }
                    }
                    catch (Exception e)
                    {

                        throw e;
                    }

                }
                int amountExtraActivitiesUpdt = form.Keys.Count(x => x.Contains("ddlextraActivitiesUpdt_"));
                var ExtraActivitiesUpdt = form.Keys.Where(x => x.Contains("ddlextraActivitiesUpdt_")).ToList();
                var ExtraActivitiesAmountUpdt = form.Keys.Where(x => x.Contains("extraActivitiesAmountUpdt_")).ToList();
                var ExtraActivitiesPriceUpdt = form.Keys.Where(x => x.Contains("extraActivitiesPriceUpdt_")).ToList();
                var ExtraActivitiesUpdtDel = form.Keys.Where(x => x.Contains("extraActivitiesUpdtDel_")).ToList();
                

                //Update of activities
                reservationData.ActividadesExtras = new List<ReservacionesActividadesExtras>();
                if (!amountExtraActivitiesUpdt.Equals(0))
                {
                    try
                    {
                        
                        for (int i = 0; i < amountExtraActivitiesUpdt; i++)
                        {
                            var key = ExtraActivitiesUpdt[i];
                            var value = form[key];



                            ActivitiesExtrasListViewModel actv = (ActivitiesExtrasListViewModel)(await _activitiesServices.ActivitiesExtrasFind(value, token)).Data;

                            ReservacionesActividadesExtras extraActivity = new ReservacionesActividadesExtras();
                            extraActivity.AcEx_ID = int.Parse(value.ToString());
                            extraActivity.ReAE_Cantidad = int.Parse(decimal.Parse(form[ExtraActivitiesAmountUpdt[i]]).ToString());
                            extraActivity.ReAE_Precio = actv.Precio;
                            extraActivity.ReAE_FechaReservacion = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                            extraActivity.ReAE_HoraReservacion = "1200";

                            totalActvExtra += extraActivity.ReAE_Precio.GetValueOrDefault(0) * extraActivity.ReAE_Cantidad.GetValueOrDefault(0);

                            reservationData.ActividadesExtras.Add(extraActivity);
                        }
                    }
                    catch (Exception e)
                    {

                        throw e;
                    }

                }
                #endregion

                #region Hotel Activities
                //This is for adding new activities to the reservation
                int amountHtelActvities = form.Keys.Count(x => x.Contains("ddlhotelsExtraActivities_"));
                var ExtraHtelActivities = form.Keys.Where(x => x.Contains("ddlhotelsExtraActivities_")).ToList();
                var ExtraHtelActivitiesAmount = form.Keys.Where(x => x.Contains("hotelsExtraActivitiesAmount_")).ToList();
                var ExtraHtelActivitiesPrice = form.Keys.Where(x => x.Contains("hotelsExtraActivitiesPrice_")).ToList();
                reservationData.ActividadesHoteles = new List<ReservacionesActividadesHoteles>();
                if (!amountHtelActvities.Equals(0))
                {
                    try
                    {
                        for (int i = 0; i < amountHtelActvities; i++)
                        {
                            var key = ExtraHtelActivities[i];
                            var value = form[key];
                            HotelsActivitiesListViewModel actv = (HotelsActivitiesListViewModel)(await _hotelsService.HotelsActivitiesFind(value, token)).Data;
                            ReservacionesActividadesHoteles actividadesHoteles = new ReservacionesActividadesHoteles();
                            actividadesHoteles.HoAc_ID = int.Parse(value.ToString());
                            actividadesHoteles.ReAH_Cantidad = int.Parse(form[ExtraHtelActivitiesAmount[i]].ToString());
                            actividadesHoteles.ReAH_Precio = actv.Precio;
                            actividadesHoteles.ReAH_FechaReservacion = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                            actividadesHoteles.ReAH_HoraReservacion = "1200";
                            totalActvHtel += actividadesHoteles.ReAH_Cantidad.GetValueOrDefault(0) * actividadesHoteles.ReAH_Precio.GetValueOrDefault(0);

                            reservationData.ActividadesHoteles.Add(actividadesHoteles);
                        }
                    }
                    catch (Exception e)
                    {

                        throw e;
                    }

                }
                //This is for updating the activities of the reservation
                int amountHtelActvitiesUpdt = form.Keys.Count(x => x.Contains("ddlhtelActivitiesUpdt_"));
                var ExtraHtelActivitiesUpdt = form.Keys.Where(x => x.Contains("ddlhtelActivitiesUpdt_")).ToList();
                var ExtraHtelActivitiesAmountUpdt = form.Keys.Where(x => x.Contains("htelActivitiesAmountUpdt_")).ToList();
                var ExtraHtelActivitiesPriceUpdt = form.Keys.Where(x => x.Contains("htelActivitiesPriceUpdt_")).ToList();
                var ExtraHtelActivitiesDelUpdt = form.Keys.Where(x => x.Contains("htelActivitiesUpdtDel_")).ToList();
                reservationData.ActividadesHoteles = new List<ReservacionesActividadesHoteles>();
                if (!amountHtelActvitiesUpdt.Equals(0))
                {
                    try
                    {
                        for (int i = 0; i < amountHtelActvitiesUpdt; i++)
                        {
                            var key = ExtraHtelActivitiesUpdt[i];
                            var value = form[key];
                            
                            
                            HotelsActivitiesListViewModel actv = (HotelsActivitiesListViewModel)(await _hotelsService.HotelsActivitiesFind(value, token)).Data;

                            ReservacionesActividadesHoteles actividadesHoteles = new ReservacionesActividadesHoteles();
                            actividadesHoteles.HoAc_ID = int.Parse(value.ToString());
                            actividadesHoteles.ReAH_Cantidad = int.Parse(form[ExtraHtelActivitiesAmountUpdt[i]].ToString());
                            actividadesHoteles.ReAH_Precio = actv.Precio;
                            actividadesHoteles.ReAH_FechaReservacion = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                            actividadesHoteles.ReAH_HoraReservacion = "1200";
                            totalActvHtel += actividadesHoteles.ReAH_Cantidad.GetValueOrDefault(0) * actividadesHoteles.ReAH_Precio.GetValueOrDefault(0);

                            reservationData.ActividadesHoteles.Add(actividadesHoteles);
                        }
                    }
                    catch (Exception e)
                    {

                        throw e;
                    }
                }
                #endregion

                #region Reservation
                //Data for the reservation table
                ReservationListViewModel reservation = (ReservationListViewModel)(await _reservationService.ReservationFind(id, token)).Data;

                reservationData.Resv_ID = id;
                reservationData.Usua_ID = int.Parse(form["Usua_ID"].ToString());
                reservationData.Resv_esPersonalizado = (form["ddlTipoPaquete"].ToString() == "1") ? true : false;
                reservationData.Paqu_ID = (reservationData.Paqu_ID.Equals(null)) ? (form["Paqu_ID"].ToString() == "") ? reservation.Id_Paquete : int.Parse(form["Paqu_ID"].ToString()) : reservationData.Paqu_ID;
                reservationData.Resv_CantidadPagos = int.Parse(form["Resv_CantidadPagos"].ToString());
                reservationData.Resv_NumeroPersonas = int.Parse(form["Resv_NumeroPersonas"].ToString());
                reservationData.Resv_Precio = reservation.precio + totalActvExtra + totalActvHtel;
                reservationData.ReHo_FechaEntrada = DateTime.Parse(form["datefilter"].ToString().Split("-")[0].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                reservationData.ReHo_FechaSalida = DateTime.Parse(form["datefilter"].ToString().Split("-")[1].Replace("/", "-").Trim().Split("-").Reverse().Aggregate((a, b) => a + "-" + b));
                reservationData.Resv_ConfirmacionPago = reservation.ConfirmacionPago;
                reservationData.Resv_ConfirmacionHotel = reservation.ConfirmacionHotel;
                reservationData.Resv_ConfirmacionRestaurante = reservation.ConfirmacionRestaurante;
                reservationData.Resv_ConfirmacionTrans = reservation.ConfirmacionTransporte;
                reservationData.Resv_ConfirmacionActividades = reservation.ConfirmacionActividades;
                reservationData.Resv_UsuarioCreacion = UserID;
                reservationData.Resv_UsuarioModifica = UserID;
                //Extra data in case it's a custom reservation

                
                #endregion

                ServiceResult result = await _reservationService.ReservationUpdate(reservationData,id, token);

                if (result.Success && result.Id > 0)
                {
                    routeValues.responseID = int.Parse(result.Data.ToString());
                    routeValues.IsSuccess = true;
                    return RedirectToAction("Index", "Reservation", routeValues);
                }
                else
                {
                    var list = await _reservationService.ReservationList(token);
                    IEnumerable<ReservationListViewModel> data = (IEnumerable<ReservationListViewModel>)list.Data;
                    var element = data.Where(x => x.ID == id).ToList()[0];
                    ViewBag.Paquete = element;
                    routeValues.IsSuccess = false;
                    ViewBag.RouteValues = routeValues;
                    return View("Create");
                }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
            
        }


        [HttpPost]
        public async Task<IActionResult> Delete( int id)
        {
            
            try
            {
                string idMod = HttpContext.User.FindFirst("User_Id").Value;
                string token = HttpContext.User.FindFirst("Token").Value;

                try
                {
                    if (ModelState.IsValid)
                    {
                        ServiceResult result = new ServiceResult();

                        var list = (RequestStatus)(await _reservationService.ReservationDelete(int.Parse(idMod), id, token)).Data;

                        return Ok(list.CodeStatus);
                    }
                    else
                    {
                        return View();
                    }
                }
                catch (Exception)
                {
                    return RedirectToAction("Error", "Home");
                }


            }
            catch (Exception)
            {

                RedirectToAction("Login", "Access");
            }


            return View();

        }
        [HttpGet]
        public async Task<IActionResult> PersonalizePackages(RouteValuesModel routeValues)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            ViewBag.RouteValues = routeValues;
            int User_Id = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
            

            var UserData = (UserListViewModel)(await _accessService.UsersFind(User_Id, token)).Data;
            var UserAddress = (AddressListViewModel)(await _GeneralService.AddressFind(UserData.DireccionID.ToString(), token)).Data;
            var ciudades = (IEnumerable<CityListViewModel>)(await _GeneralService.CitiesList()).Data;

            foreach (var item in ciudades)
                item.Ciudad = $"{item.Pais}, {item.Ciudad}";

            ViewBag.ciudades = new SelectList(ciudades, "ID", "Ciudad");
            ViewBag.ciudadesResidencia = new SelectList(ciudades, "ID", "Ciudad", UserAddress.ID_Ciudad);
            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        public async Task<IActionResult> Details(int  id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var reservation = (ReservationListViewModel)(await _reservationService.ReservationFind(id, token)).Data;
           
            return View(reservation);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
