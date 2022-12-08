using AHM_TOTAL_TRAVEL_WEB.Models;
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
using Microsoft.AspNetCore.Authorization;
//using System.Web.Mvc;
//using Microsoft.Reporting.WinForms;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
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

        #region HOTELES_PHP
        public async Task<IActionResult> IndexHoteles()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                ViewBag.Ciudades = (IEnumerable<CityListViewModel>)(await _generalService.CitiesList()).Data;
                ViewBag.Hoteles = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
                ViewBag.Socios = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public async Task<IActionResult> HotelesReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            { 
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\HotelesReport.rdlc";
                LocalReport localReport = new LocalReport(path);

                //añade las columnas que tiene la tabla

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
        #endregion // // 

        #region PAQUETES_PREDETERMINADOS_PHP
        public async Task<IActionResult> IndexPaquetesPredeterminadosReport()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                ViewBag.Ciudades = (IEnumerable<CityListViewModel>)(await _generalService.CitiesList()).Data;
                ViewBag.Paquetes = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;
                ViewBag.Hoteles = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
                ViewBag.Restaurantes = (IEnumerable<RestaurantListViewModel>)(await _restaurantService.RestaurantsList(token)).Data;

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public async Task<IActionResult> DefaultPackagesReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

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

        #region SOCIOS_PHP
        public async Task<IActionResult> IndexSociosReport()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                ViewBag.Socios = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;
                ViewBag.TipoSocios = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }


        public async Task<IActionResult> SociosReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\parnerts.rdlc";
                LocalReport localReport = new LocalReport(path);

                DataTable dt = new DataTable("Grid");
                dt.Columns.AddRange(new DataColumn[5]{
                            new DataColumn("Id"),
                            new DataColumn("Nombre"),
                            new DataColumn("Email"),
                            new DataColumn("Telefono"),
                            new DataColumn("Tipo_Partner")});
                var tra = from tran in data.ToList() select tran;

                foreach (var tran in tra)
                {
                    dt.Rows.Add(tran.ID, tran.Nombre, tran.Email, tran.Telefono, tran.TipoPartner);
                }
                using (XLWorkbook wb = new XLWorkbook())
                {
                    wb.Worksheets.Add(dt);
                    using (MemoryStream stream = new MemoryStream())
                    {
                        wb.SaveAs(stream);
                        return File(stream.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "tiposocioReport.xls");

                    }
                }
            }
            catch (Exception e)
            {

                return BadRequest(e.Message);
            }


        }
        #endregion

        #region TIPO_PAGOS_PHP

        public async Task<IActionResult> IndexTipoPagoReport()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                ViewBag.Usuario = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                ViewBag.TipoPago = (IEnumerable<TipeofpayListViewModel>)(await _saleService.PaymentTypesList()).Data;

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public async Task<IActionResult> RecordPaymentReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

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

        #region RESERVACIONES_PHP

        public async Task<IActionResult> IndexReservacionesReport()
        {
            try
            {
            var token = HttpContext.User.FindFirst("Token").Value;
                ViewBag.Usuario = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                ViewBag.Paquete = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;
                ViewBag.Hoteles = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
                ViewBag.Socios = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;

            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
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

        #region RESTAURANTES_PHP

        public async Task<IActionResult> IndexRestaurantesReport()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                ViewBag.Restaurantes = (IEnumerable<RestaurantListViewModel>)(await _restaurantService.RestaurantsList(token)).Data;
                ViewBag.Socios = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
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

                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\RestaurantesReport.rdlc";
                LocalReport localReport = new LocalReport(path);

                DataTable dt = new DataTable("Grid");
                dt.Columns.AddRange(new DataColumn[3]{
                            new DataColumn("Partner"),
                            new DataColumn("Restaurante"),
                            new DataColumn("Direccion")});
                var tra = from tran in data.ToList() select tran;

                foreach (var tran in tra)
                {
                    dt.Rows.Add(tran.Partner, tran.Restaurante, "Col." + tran.Colonia + "," + tran.Calle + "Calle" + "Ave." + tran.Avenida);
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

        #region TRANSPORTE_PHP

        public async Task<IActionResult> IndexTransporteReport()
        {
            try
            {
                var token = HttpContext.User.FindFirst("Token").Value;
                ViewBag.Transporte = (IEnumerable<TransportListViewModel>)(await _transportService.TransportList()).Data;
                ViewBag.Tipotransporte = (IEnumerable<TypesTransportListViewModel>)(await _transportService.TypesTransportList()).Data;
                ViewBag.Socios = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;

                return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

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

        #region Usuarios_PHP

        public async Task<IActionResult> IndexUsuariosReport()
        {
            try
            {

            var token = HttpContext.User.FindFirst("Token").Value;
           // ViewBag.Edad = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
           // ViewBag.Sexo = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
            ViewBag.Rol = (IEnumerable<RolListViewModel>)(await _accessService.RolesList(token)).Data;
            ViewBag.Partners = (IEnumerable<PartnersListViewModel>)(await _generalService.PartnersList()).Data;

            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        public async Task<IActionResult> UsuarioReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\UsuariosReport.rdlc";
                LocalReport localReport = new LocalReport(path);


                DataTable dt = new DataTable("Grid");
                dt.Columns.AddRange(new DataColumn[7]{
                            new DataColumn("DNI"),
                            new DataColumn("Nombrecompleto"),
                            new DataColumn("Sexo"),
                            new DataColumn("Fecha_Nacimiento"),
                            new DataColumn("Email"),
                            new DataColumn("Telefono"),
                            new DataColumn("Direccion")
                            });
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

        #region CLIENTES_PHP

        public async Task<IActionResult> IndexClientesReport()
        {
            try
            {
            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public async Task<IActionResult> ClientsReportXLS(int ReportTiype, string filtertype, string filtervalue)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                string UserID = HttpContext.User.FindFirst("User_Id").Value;
                var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
                data = data.Where(x => x.Role_ID == 2);
                var print_user = ((UserListViewModel)(await _accessService.UsersFind(int.Parse(UserID), token)).Data).Nombre;

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


        /// /////////////////////////////////////////////////////////////////////////////////////////////////////////


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
            try
            {
            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        /////////////////////////////////////////////////////////////////////////////////////////

        public async Task<ActionResult> TransportReportHTML()
        {
            try
            {
            var data = (IEnumerable<TransportListViewModel>)(await _transportService.TransportList()).Data;

            ViewData["IndexDataSource"] = 1;

            return View(data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////




        #endregion

        #region RESERVACION

        public IActionResult ReservacionesReport()
        {
            try
            {
            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////

        //HACE EL ARCHIVO HMTL QUE ANDRES DE PUEDE3 HACER 
        public async Task<ActionResult> ReservacionesReportHTML()
        {
            try
            {
            var token = HttpContext.User.FindFirstValue("Token");

            var data = (IEnumerable<ReservationViewModel>)(await _reservationService.ReservationList(token)).Data;

            return View(data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }


      
        #endregion

        #region REGISTRO_DE_PAGO 
        public IActionResult RecordPaymentReport()
        {
            try { 
            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }


        /////////////////////////////////////////////////////////////////////////////////////////

        //HACE EL ARCHIVO HMTL QUE ANDRES DE PUEDE3 HACER 
        public async Task<ActionResult> RecordPaymentReportHTML()
        {
            try { 
            var data = (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;

            return View(data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        /////////////////////////////////////////////////////////////////////////////////////////

     

        #endregion

        #region PAQUETE_PREDETERMIANDO 

        public IActionResult DefaultPackagesReport()
        {
            try { 
            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }


        /////////////////////////////////////////////////////////////////////////////////////////

        //HACE EL ARCHIVO HMTL QUE ANDRES DE PUEDE3 HACER 
        public async Task<ActionResult> DefaultPackagesReportHTML()
        {
            try { 
            var token = HttpContext.User.FindFirstValue("Token");

            var data = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;

            return View(data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }


        /////////////////////////////////////////////////////////////////////////////////////////

     
        #endregion
    }
}
