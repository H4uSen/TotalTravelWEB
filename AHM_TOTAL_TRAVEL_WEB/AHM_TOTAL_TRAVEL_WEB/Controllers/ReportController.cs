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
        public readonly IHttpContextAccessor _IHttpContextAccessor;
        public readonly AccessService _accessService;


        public ReportController(ReportService reportService, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, AccessService accessService,TransportService transportService, RestaurantService restaurantService )
        {
            this._webHostEnvironment = webHostEnvironment;
            _IHttpContextAccessor = httpContextAccessor;
            _reportServices = reportService;
            _accessService = accessService;
            _transportService = transportService;
            _restaurantService = restaurantService;
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

        public IActionResult RestauranteReport()
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



    }
}
