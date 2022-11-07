using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AspNetCore.Reporting;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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



        public async Task<IActionResult> TransportReportPDF(string filtertype,string filtervalue)
        {
            var data=(IEnumerable<TransportListViewModel>) (await _transportService.TransportList()).Data;
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
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\TransportesReport.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("transporte", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);

            
            return File(result.MainStream, "application/pdf");
        }

        public async Task<IActionResult> RestauranteReportPDF(string filtertype, string filtervalue)
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
            localReport.AddDataSource("restaurante", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        public async Task<IActionResult> HotelesReportPDF(string filtertype, string filtervalue)
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
            localReport.AddDataSource("hotel", data);

            // crea y asigna parametros
            //Dictionary<string, string> parameters = new Dictionary<string, string>();


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        public async Task<IActionResult> ClientReportPDF(string filtertype, string filtervalue)
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


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        public async Task<IActionResult> ReservacionesReportPDF(string filtertype, string filtervalue)
        {
            string token = HttpContext.User.FindFirst("Token").Value;

            var data = (IEnumerable<ReservationListViewModel>)(await _reservationService.ReservationList(token)).Data;
            switch (filtertype)
            {
               
                case "tipo_Parnert":
                    data = data.Where(x => x.PartnerID == Convert.ToInt32(filtervalue)).ToList();
                    break;
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


            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }

        public async Task<IActionResult> RecordPaymentReportPDF(string filtertype, string filtervalue)
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
              

            }
            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Report\\RegistrospagosReporst.rdlc";
            LocalReport localReport = new LocalReport(path);

            //añade valores recibidos de el endpoint de la API al dataset indicado
            localReport.AddDataSource("datoscliente", data);



            //crea y retorna pdf reader
            var result = localReport.Execute(RenderType.Pdf);


            return File(result.MainStream, "application/pdf");
        }


        public async Task<IActionResult> DefaultPackagesReportPDF(string filtertype, string filtervalue)
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



                //crea y retorna pdf reader
                var result = localReport.Execute(RenderType.Pdf);


                return File(result.MainStream, "application/pdf");
            }


        }
    }
}
