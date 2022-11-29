﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AspNetCore.Reporting;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using ClosedXML;
using System.Threading.Tasks;
using ClosedXML.Excel;
using System.IO;
using AspNetCore.Reporting.ReportExecutionService;
using Microsoft.Extensions.Caching.Memory;
using System.Reflection;
using System.Text;
using Rotativa.AspNetCore;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using AngleSharp.Network.Default;
using System.Security.Claims;
using Rotativa.Options;
using System.Web.WebPages;
using System.Runtime.InteropServices.WindowsRuntime;
using Microsoft.AspNetCore.Mvc.Rendering;
//using System.Web.Mvc;
//using Microsoft.Reporting.WinForms;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ReportController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private IMemoryCache _cache;
        private readonly ReportService _reportServices;
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;
        private readonly RestaurantService _restaurantService;
        private readonly HotelsService _hotelsService;
        private readonly ReservationService _reservationService;
        public readonly IHttpContextAccessor _IHttpContextAccessor;
        public readonly AccessService _accessService;
        public readonly SaleServices _saleService;

        public ReportController(IMemoryCache memoryCache,ReportService reportService, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, AccessService accessService, TransportService transportService, RestaurantService restaurantService,
            HotelsService hotelsService, ReservationService reservationService, SaleServices saleServices, GeneralService generalService)
        {
            this._webHostEnvironment = webHostEnvironment;
            _IHttpContextAccessor = httpContextAccessor;
            _accessService = accessService;
            _generalService = generalService;
            _transportService = transportService;
            _restaurantService = restaurantService;
            _hotelsService = hotelsService;
            _reservationService = reservationService;
            _saleService = saleServices;
            _cache = memoryCache;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }
    public IActionResult Index()
        {
            ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

            return View();
        }



        public async Task<IActionResult> IndexHoteles()
        {
            var token = HttpContext.User.FindFirst("Token").Value;
            ViewBag.Ciudades = (IEnumerable<CityListViewModel>)(await _generalService.CitiesList()).Data;
            ViewBag.Hoteles = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
            ViewBag.Socios = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;

            return View();
        }


        #region ARREGLANDO_EL_RELAJO_DE_ANDRES
        public async Task<ActionResult> ExportPDF(ReportCreationModel reportCreationModel)
        {
            try
            {
                if (reportCreationModel.ReportName.IsEmpty())
                {
                    reportCreationModel.ReportName = "Reporte";
                }
                var userName = HttpContext.User.FindFirstValue("User_Name");
                var token = HttpContext.User.FindFirstValue("Token");
                var dataSource = (await ListOfDataSources(reportCreationModel, token));

                if (dataSource == null)
                    return BadRequest("Error al elegir un datasource");

                ViewAsPdf pdf = new ViewAsPdf(reportCreationModel.HTMLFile, dataSource);
                pdf.FileName = String.Concat(reportCreationModel.ReportName, ".pdf");
                pdf.PageSize = Rotativa.AspNetCore.Options.Size.A4;
                pdf.PageMargins = new Rotativa.AspNetCore.Options.Margins { Left = 20, Right = 20 };
                pdf.CustomSwitches = $"--footer-left \" Hecho por: {userName}\"";

                return pdf;
            }
            catch (Exception e)
            {

                throw e;
            }



        }
        [HttpPost]
        public async Task<IActionResult> PdfAsByte(ReportCreationModel reportCreationModel)
        {
            try
            {

                if (reportCreationModel.ReportName.IsEmpty())
                {
                    reportCreationModel.ReportName = "Reporte";
                }
                var userName = HttpContext.User.FindFirstValue("User_Name");
                var token = HttpContext.User.FindFirstValue("Token");
                var dataSource = (await ListOfDataSources(reportCreationModel, token));

                if (dataSource == null)
                    return BadRequest("Error al cargar los datos");

                ViewAsPdf pdf = new ViewAsPdf(reportCreationModel.HTMLFile, dataSource);
                pdf.FileName = String.Concat(reportCreationModel.ReportName, ".pdf");
                pdf.PageSize = Rotativa.AspNetCore.Options.Size.A4;
                pdf.PageMargins = new Rotativa.AspNetCore.Options.Margins { Left = 20, Right = 20 };
                pdf.CustomSwitches = $"--footer-left \" Hecho por: {userName}\"";

                byte[] pdfAsArray = await pdf.BuildFile(this.ControllerContext);

                return Ok(pdfAsArray);
            }
            catch (Exception e)
            {

                throw e;
            }
        }

        public async Task<IEnumerable<dynamic>> ListOfDataSources(ReportCreationModel reportModel, string token)
        {
            try
            {
                switch (reportModel.DataSourceIndex)
                {

                    case 1:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            return (IEnumerable<TransportListViewModel>)(await _transportService.TransportList()).Data;
                        }
                        else
                        {

                            var data1 = (IEnumerable<TransportListViewModel>)(await _transportService.TransportList()).Data;
                            data1 = data1.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data1;
                        }
                    case 2:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            return (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
                        }
                        else
                        {
                            var data2 = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
                            data2 = data2.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data2;
                        }
                    case 3:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            return (IEnumerable<RestaurantListViewModel>)(await _restaurantService.RestaurantsList(token)).Data;
                        }
                        else
                        {
                            var data3 = (IEnumerable<RestaurantListViewModel>)(await _restaurantService.RestaurantsList(token)).Data;
                            data3 = data3.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data3;
                        }
                    case 4:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            return (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                        }
                        else
                        {
                            var data4 = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                            data4 = data4.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data4;
                        }
                    case 5:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            var data5 = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                            data5 = data5.Where(x => x.Role_ID.Equals(2));
                            return data5;
                        }
                        else
                        {
                            var data5 = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                            data5 = data5.Where(x => x.Role_ID.Equals(2));
                            data5 = data5.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data5;
                        }
                    case 6:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            return (IEnumerable<ReservationListViewModel>)(await _reservationService.ReservationList(token)).Data;
                        }
                        else
                        {
                            var data6 = (IEnumerable<ReservationListViewModel>)(await _reservationService.ReservationList(token)).Data;
                            data6 = data6.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data6;
                        }

                    case 7:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            return (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;
                        }
                        else
                        {
                            var data7 = (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;
                            data7 = data7.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data7;
                        }
                    case 8:
                        if (reportModel.FilterType.IsEmpty())
                        {
                            return (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;
                        }
                        else
                        {
                            var data8 = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;
                            data8 = data8.Where(x => x.GetType().GetProperty(reportModel.FilterType).Equals(reportModel.FilterValue));
                            return data8;
                        }
                    default:
                        return null;
                }
            }
            catch (Exception)
            {

                return null;
            }
            
        }

        #endregion

        #region TRANSPORTE

        /////////////////////////////////////////////////////////////////////////////////////////
        public IActionResult TransportReport()
        {

            return View();
        }
        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<ActionResult> TransportReportHTML()
        {
            var data = (IEnumerable<TransportListViewModel>)(await _transportService.TransportList()).Data;

            ViewData["IndexDataSource"] = 1;

            return View(data);
        }

        /////////////////////////////////////////////////////////////////////////////////////////


        public async Task<IActionResult> TransportReportXLS(int ReportTiype, string filtertype, string filtervalue)
            {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<TransportListViewModel>)(await _transportService.TransportList()).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;



                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\TransporteReport.rdlc";              
                LocalReport localReport = new LocalReport(path);

                
                    DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[4]{
                            new DataColumn("Tipo_Transporte"),
                            new DataColumn("NombrePartner"),
                            new DataColumn("Ciudad"),
                            new DataColumn("Direccion")});
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.TipoTransporte, tran.NombrePartner, tran.Ciudad, "Col." + tran.Colonia + "," + tran.Calle + "Calle" + "Ave." + tran.Avenida);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "transporReport.xls");
                        }
                    }
                

              
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }

        }

        #endregion

        #region RESTAURANTE

        public IActionResult RestauranteReport()
        {

            return View();
        }

        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<ActionResult> RestauranteReportHTML()
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var data = (IEnumerable<RestaurantListViewModel>)(await _restaurantService.RestaurantsList(token)).Data;

            return View(data);
        }
        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<IActionResult> RestauranteReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<RestaurantListViewModel>)(await _restaurantService.RestaurantsList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                /*( switch (filtertype)
                {
                    case "tipo_transporte":
                        data = data.Where(x => x.ID == Convert.ToInt32(filtervalue)).ToList();
                        break;
                    case "tipo_Parnert":
                        data = data.Where(x => x.ID_Partner == Convert.ToInt32(filtervalue)).ToList();
                        break;
                    case "Ciudad":
                        data = data.Where(x => x.CiudadID == Convert.ToInt32(filtervalue)).ToList();
                        break;
                    default:
                        break;
                }
                */
                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\RestaurantesReport.rdlc";
                LocalReport localReport = new LocalReport(path);

                    DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[4]{
                            new DataColumn("Partner"),
                            new DataColumn("Restaurante"),
                            new DataColumn("Ciudad"),
                            new DataColumn("Direccion")});
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.Partner, tran.Restaurante, tran.Ciudad, "Col." + tran.Colonia + "," + tran.Calle + "Calle" + "Ave." + tran.Avenida);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "restaurantReport.xls");

                        }
                    }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        #endregion

        #region HOTELES



        public IActionResult HotelesReport()
        {

            return View();

        }

        /////////////////////////////////////////////////////////////////////////////////////////

        //HACE EL ARCHIVO HMTL QUE ANDRES DE PUEDE3 HACER 
        public async Task<ActionResult> HotelesReportHTML()
        {
            var token = HttpContext.User.FindFirstValue("Token");

            var data = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;

            return View(data);
        }


        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<IActionResult> HotelesReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {

            try
            {

                /*switch (filtertype)
                {
                    case "hotel":
                        data = data.Where(x => x.ID == Convert.ToInt32(filtervalue)).ToList();
                        break;
                    case "tipo_Parnert":
                        data = data.Where(x => x.ID_Partner == Convert.ToInt32(filtervalue)).ToList();
                        break;
                    case "Ciudad":
                        data = data.Where(x => x.CiudadID == Convert.ToInt32(filtervalue)).ToList();
                        break;
                    case "Colonia":
                        data = data.Where(x => x.ColoniaID == Convert.ToInt32(filtervalue)).ToList();
                        break;
                    default:
                        break;
                }
                */
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\HotelesReport.rdlc";
                LocalReport localReport = new LocalReport(path);

                //añade valores recibidos de el endpoint de la API al dataset indicado
            
                    DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[5]{
                            new DataColumn("Hotel"),
                            new DataColumn("Descripcion"),
                             new DataColumn("Partners"),
                            new DataColumn("Ciudad"),
                            new DataColumn("Direccion")});
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.Hotel, tran.Descripcion, tran.Partners, tran.Ciudad, "Col." + tran.Colonia + "," + tran.Calle + "Calle" + "Ave." + tran.Avenida);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "hotelReport.xls");

                        }
                    }
            


            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            
        }

        #endregion

        #region USUARIOS


        public IActionResult ClientReport()
        {

            return View();
        }

        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<ActionResult> UsuarioReportHTML()
        {
            string token = HttpContext.User.FindFirst("token").Value;
            var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;

            return View(data);
        }

        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<IActionResult> UsuarioReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                //data = data.Where(x => x.Role_ID == 2);
                /* switch (filtertype)
                 {
                     case "sexo":
                         data = data.Where(x => x.Sexo == filtervalue).ToList();
                         break;
                     case "colonia":
                         data = data.Where(x => x.ColoniaID == Convert.ToInt32(filtervalue)).ToList();
                         break;
                     case "partner":
                         data = data.Where(x => x.PartnerID == Convert.ToInt32(filtervalue)).ToList();
                         break;
                     case "rol":
                         data = data.Where(x => x.Role_ID == Convert.ToInt32(filtervalue)).ToList();
                         break;
                     default:
                         break;

                 }
                */
                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\UsuariosReport.rdlc";
                LocalReport localReport = new LocalReport(path);

             
                    DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[8]{
                            new DataColumn("DNI"),
                            new DataColumn("Nombrecompleto"),
                            new DataColumn("Sexo"),
                            new DataColumn("Fecha_Nacimiento"),
                            new DataColumn("Email"),
                            new DataColumn("Telefono"),
                            new DataColumn("Direccion"),
                            new DataColumn("Partner")});
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.DNI, tran.Nombre + " " + tran.Apellido, tran.Sexo, tran.Fecha_Nacimiento, tran.Email, tran.Telefono, "Col." + tran.Colonia + "," + tran.Calle + "Calle" + "Ave." + tran.Avenida, tran.Partner);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "usuariosReport.xls");

                        }
                    }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        #endregion

        #region CLIENTE

        public IActionResult ClientsReport()
        {

            return View();
        }

        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<ActionResult> ClientsReportHTML()
        {
            string token = HttpContext.User.FindFirst("token").Value;
            var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;

            return View(data);
        }

        /////////////////////////////////////////////////////////////////////////////////////////
        public async Task<IActionResult> ClientsReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {

            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                data = data.Where(x => x.Role_ID == 2);
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                /* switch (filtertype)
                 {
                     case "sexo":
                         data = data.Where(x => x.Sexo == filtervalue).ToList();
                         break;
                     case "colonia":
                         data = data.Where(x => x.ColoniaID == Convert.ToInt32(filtervalue)).ToList();
                         break;
                     default:
                         break;
                 }
                */
                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\clientesReport.rdlc";
                LocalReport localReport = new LocalReport(path);

               
                    DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[7]{
                            new DataColumn("DNI"),
                            new DataColumn("Nombrecompleto"),
                            new DataColumn("Sexo"),
                            new DataColumn("Fecha_Nacimiento"),
                            new DataColumn("Email"),
                            new DataColumn("Telefono"),
                            new DataColumn("Direccion")});
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.DNI, tran.Nombre + " " + tran.Apellido, tran.Sexo, tran.Fecha_Nacimiento, tran.Email, tran.Telefono, "Col." + tran.Colonia + "," + tran.Calle + "Calle" + "Ave." + tran.Avenida);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "clientesReport.xls");

                        }
                    }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            

            
        }
        #endregion

        #region RESERVACION

        public IActionResult ReservacionesReport()
        {

            return View();
        }

        /////////////////////////////////////////////////////////////////////////////////////////

        //HACE EL ARCHIVO HMTL QUE ANDRES DE PUEDE3 HACER 
        public async Task<ActionResult> ReservacionesReportHTML()
        {
            var token = HttpContext.User.FindFirstValue("Token");

            var data = (IEnumerable<ReservationViewModel>)(await _reservationService.ReservationList(token)).Data;

            return View(data);
        }


        /////////////////////////////////////////////////////////////////////////////////////////
        public async Task<IActionResult> ReservacionesReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<ReservationListViewModel>)(await _reservationService.ReservationList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                /*  switch (filtertype)
                  {

                      //case "tipo_Parnert":
                      //    data = data.Where(x => x.PartnerID == Convert.ToInt32(filtervalue)).ToList();
                      //    break;
                      case "Hotel":
                          data = data.Where(x => x.Hotel_ID == Convert.ToInt32(filtervalue)).ToList();
                          break;
                      case "Paquete":
                          data = data.Where(x => x.Id_Paquete == Convert.ToInt32(filtervalue)).ToList();
                          break;
                      case "fecha":
                          DateTime fecha = DateTime.Parse(filtervalue);
                          data = data.Where(x => x.Fecha_Entrada == fecha).ToList();
                          break;
                      default:
                          break;
                  }*/
                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\Reservaciones.rdlc";
                LocalReport localReport = new LocalReport(path);

               DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[8]{
                            new DataColumn("NumeroPersonas"),
                            new DataColumn("CantidadPagos"),
                            new DataColumn("DescripcionPaquete"),
                            new DataColumn("DurecionPaquete"),
                            new DataColumn("precio"),
                            new DataColumn("Fecha_Entrada"),
                            new DataColumn("Fecha_Salida"),
                            new DataColumn("Nombre_Hotel")});
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.NumeroPersonas, tran.CantidadPagos, tran.DescripcionPaquete, tran.DurecionPaquete, tran.precio, tran.Fecha_Entrada, tran.Fecha_Salida, tran.Nombre_Hotel);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "reservationReport.xls");

                        }
                    }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            
        }
        #endregion

        #region REGISTRO_DE_PAGO 
        public IActionResult RecordPaymentReport()
        {

            return View();
        }


        /////////////////////////////////////////////////////////////////////////////////////////

        //HACE EL ARCHIVO HMTL QUE ANDRES DE PUEDE3 HACER 
        public async Task<ActionResult> RecordPaymentReportHTML()
        {
            var data = (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;

            return View(data);
        }

        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<IActionResult> RecordPaymentReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                /* switch (filtertype)
                 {
                     case "Id_cliente":
                         data = data.Where(x => x.Id_Cliente == Convert.ToInt32(filtervalue)).ToList();
                         break;

                     case "fecha":
                         DateTime fecha = DateTime.Parse(filtervalue);
                         data = data.Where(x => x.fechaPago == fecha).ToList();
                         break;

                     case "TipoPaquete":
                         data = data.Where(x => x.Id_Paquete == Convert.ToInt32(filtervalue)).ToList();
                         break;
                     case "TipoPago":
                         data = data.Where(x => x.Id_TipoPago == Convert.ToInt32(filtervalue)).ToList();
                         break;
                     default:
                         break;
                 }*/
                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\RegistrospagosReporst.rdlc";
                LocalReport localReport = new LocalReport(path);

                    DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[8]{
                            new DataColumn("Nombre_Completo"),
                            new DataColumn("DNI"),
                            new DataColumn("Telefono"),
                            new DataColumn("nombre_paquete"),
                            new DataColumn("precio_paquete"),
                            new DataColumn("MontoPago"),
                            new DataColumn("fechaPago"),
                            new DataColumn("TipoPago")});
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.Nombre_Completo, tran.DNI, tran.Telefono, tran.nombre_paquete, tran.precio_paquete, tran.MontoPago, tran.fechaPago, tran.TipoPago);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "tipopagoReport.xls");

                        }
                    }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
            
            
        }

        #endregion

        #region PAQUETE_PREDETERMIANDO 

        public IActionResult DefaultPackagesReport()
        {

            return View();

        }


        /////////////////////////////////////////////////////////////////////////////////////////

        //HACE EL ARCHIVO HMTL QUE ANDRES DE PUEDE3 HACER 
        public async Task<ActionResult> DefaultPackagesReportHTML()
        {
            var token = HttpContext.User.FindFirstValue("Token");

            var data = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;

            return View(data);
        }


        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<IActionResult> DefaultPackagesReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                /*  switch (filtertype)
                  {
                      case "id_hotel":
                          data = data.Where(x => x.ID_Hotel == Convert.ToInt32(filtervalue)).ToList();
                          break;
                      case "id_restaurante":
                          data = data.Where(x => x.ID_Restaurante == Convert.ToInt32(filtervalue)).ToList();
                          break;
                      case "TipoPaquete":
                          data = data.Where(x => x.Id == Convert.ToInt32(filtervalue)).ToList();
                          break;
                      default:
                          break;

                  }
                */
                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\Paquetespredeterminadosreporst.rdlc";
                LocalReport localReport = new LocalReport(path);

               
                    DataTable dt = new DataTable("Grid");
                    dt.Columns.AddRange(new DataColumn[6]{
                            new DataColumn("Nombre"),
                            new DataColumn("Descripcion_Paquete"),
                            new DataColumn("Duracion_Paquete"),
                            new DataColumn("precio"),
                            new DataColumn("Hotel"),
                            new DataColumn("Restaurante")
                          });
                    var tra = from tran in data.ToList() select tran;

                    foreach (var tran in tra)
                    {
                        dt.Rows.Add(tran.Nombre, tran.Descripcion_Paquete, tran.Duracion_Paquete, tran.precio, tran.Hotel, tran.Restaurante);
                    }
                    using (XLWorkbook wb = new XLWorkbook())
                    {
                        wb.Worksheets.Add(dt);
                        using (MemoryStream stream = new MemoryStream())
                        {
                            wb.SaveAs(stream);
                            return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "paquetepredeterminadoReport.xls");

                        }
                    }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }
        }
        #endregion
    }
}
