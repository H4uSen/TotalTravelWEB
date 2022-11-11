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

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class ReportController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ReportService _reportServices;
        private readonly TransportService _transportService;
        private readonly RestaurantService _restaurantService;
        private readonly HotelsService _hotelsService;
        private readonly ReservationService _reservationService;
        public readonly IHttpContextAccessor _IHttpContextAccessor;
        public readonly AccessService _accessService;
        public readonly SaleServices _saleService;



        public ReportController(ReportService reportService, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, AccessService accessService, TransportService transportService, RestaurantService restaurantService, HotelsService hotelsService, ReservationService reservationService, SaleServices saleServices)
        {
            this._webHostEnvironment = webHostEnvironment;
            _IHttpContextAccessor = httpContextAccessor;
            _accessService = accessService;
            _transportService = transportService;
            _restaurantService = restaurantService;
            _hotelsService = hotelsService;
            _reservationService = reservationService;
            _saleService = saleServices;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }
    public IActionResult Index()
        {
            ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

            return View();
        }


        public IActionResult TransportReport()
        {

            return View();
        }

        public IActionResult HotelesReport()
        {

            return View();

        }

        public IActionResult RestauranteReport()
        {

            return View();
        }

        public IActionResult ClientReport()
        {

            return View();
        }
        public IActionResult ClientsReport()
        {

            return View();
        }

        public IActionResult ReservacionesReport()
        {

            return View();
        }
        public IActionResult RecordPaymentReport()
        {

            return View();
        }

        public IActionResult DefaultPackagesReport()
        {

            return View();
        }

        #region Transporte
        public async Task<IActionResult> TransportReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {
            var data = (IEnumerable<TransportListViewModel>)(await _transportService.TransportList()).Data;

            switch (filtertype)
            {
                case "tipo_transporte":
                    data = data.Where(x => x.TipoTransporteID == Convert.ToInt32(filtervalue)).ToList();
                    break;
                case "tipo_Parnert":
                    data = data.Where(x => x.PartnerID == Convert.ToInt32(filtervalue)).ToList();
                    break;
                case "Ciudad":
                    data = data.Where(x => x.Ciudad_ID == Convert.ToInt32(filtervalue)).ToList();
                    break;
            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\TransporteReport.rdlc";
            // Dictionary<string, string> parameters = new Dictionary<string, string>();
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("Transportes", data);


            if (ReportTiype == 1)
            {
                var resultpdf = localReport.Execute(RenderType.Pdf);
                return File(resultpdf.MainStream, "application/pdf");

            }
            else if (ReportTiype == 2)
            {
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

            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        #endregion

        #region RESTAURANTE
        public async Task<IActionResult> RestauranteReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            var data = (IEnumerable<RestaurantListViewModel>)(await _restaurantService.RestaurantsList(token)).Data;
            switch (filtertype)
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
            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\RestaurantesReport.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("Restaurante", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();


            if (ReportTiype == 1)
            {
                var resultpdf = localReport.Execute(RenderType.Pdf);
                return File(resultpdf.MainStream, "application/pdf");

            }
            else if (ReportTiype == 2)
            {
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


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        #endregion

        #region HOTELES
        public async Task<IActionResult> HotelesReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            var data = (IEnumerable<HotelListViewModel>)(await _hotelsService.HotelsList(token)).Data;
            switch (filtertype)
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
            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\HotelesReport.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("hoteles", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();

            if (ReportTiype == 1)
            {
                var resultpdf = localReport.Execute(RenderType.Pdf);
                return File(resultpdf.MainStream, "application/pdf");

            }
            else if (ReportTiype == 2)
            {
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


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        #endregion

        #region USUARIOS
        public async Task<IActionResult> ClientReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
            //data = data.Where(x => x.Role_ID == 2);
            switch (filtertype)
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

            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\UsuariosReport.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("usuario", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();

            if (ReportTiype == 1)
            {
                var resultpdf = localReport.Execute(RenderType.Pdf);
                return File(resultpdf.MainStream, "application/pdf");

            }
            else if (ReportTiype == 2)
            {
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


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }
        #endregion

        #region CLIENTE
        public async Task<IActionResult> ClientsReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var data = (IEnumerable<UserListViewModel>)(await _accessService.UsersList(token)).Data;
            data = data.Where(x => x.Role_ID == 2);
            switch (filtertype)
            {
                case "sexo":
                    data = data.Where(x => x.Sexo == filtervalue).ToList();
                    break;
                case "colonia":
                    data = data.Where(x => x.ColoniaID == Convert.ToInt32(filtervalue)).ToList();
                    break;
            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\clientesReport.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("Usuarios", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();

            if (ReportTiype == 1)
            {
                var resultpdf = localReport.Execute(RenderType.Pdf);
                return File(resultpdf.MainStream, "application/pdf");

            }
            else if (ReportTiype == 2)
            {
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


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }
        #endregion

        #region RESERVACION
        public async Task<IActionResult> ReservacionesReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            var data = (IEnumerable<ReservationListViewModel>)(await _reservationService.ReservationList(token)).Data;
            switch (filtertype)
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
            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\Reservaciones.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("Reservaciones", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();

            if (ReportTiype == 1)
            {
                var resultpdf = localReport.Execute(RenderType.Pdf);
                return File(resultpdf.MainStream, "application/pdf");

            }
            else if (ReportTiype == 2)
            {
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

            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }
        #endregion

        #region REGISTRO_DE_PAGO 
        public async Task<IActionResult> RecordPaymentReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {

            var data = (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;
            switch (filtertype)
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



            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\RegistrospagosReporst.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("datoscliente", data);


            if (ReportTiype == 1)
            {
                var resultpdf = localReport.Execute(RenderType.Pdf);
                return File(resultpdf.MainStream, "application/pdf");

            }
            else if (ReportTiype == 2)
            {
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


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        #endregion

        #region PAQUETE_PREDETERMIANDO 
        public async Task<IActionResult> DefaultPackagesReportPDF(int ReportTiype, string filtertype, string filtervalue)
        {
            {
                string token = HttpContext.User.FindFirst("Token").Value;

                var data = (IEnumerable<DefaultPackagesListViewModel>)(await _saleService.DefaultPackagesList(token)).Data;
                switch (filtertype)
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




                }
                //crea y asigna direccion url de ubicacion de archivo .rdlc
                var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\Paquetespredeterminadosreporst.rdlc";
                LocalReport localReport = new LocalReport(path);

                //añade valores recibidos de el endpoint de la API al dataset indicado
                localReport.AddDataSource("paquetepredeterminado", data);





                if (ReportTiype == 1)
                {
                    var resultpdf = localReport.Execute(RenderType.Pdf);
                    return File(resultpdf.MainStream, "application/pdf");

                }
                else if (ReportTiype == 2)
                {
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


                //crea y retorna pdf reader
                var result = localReport.Execute(RenderType.Pdf);


                return File(result.MainStream, "application/pdf");
            }


        }
        #endregion

    }
}
