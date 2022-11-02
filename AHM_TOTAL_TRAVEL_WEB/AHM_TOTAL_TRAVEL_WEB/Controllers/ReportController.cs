using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Reporting.WinForms;
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
        public readonly IHttpContextAccessor _IHttpContextAccessor;
        public readonly AccessService _accessService;


        public ReportController(ReportService reportService, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, AccessService accessService)
        {
            this._webHostEnvironment = webHostEnvironment;
            _IHttpContextAccessor = httpContextAccessor;
            _reportServices = reportService;
            _accessService = accessService;
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
        }
        public IActionResult Index()
        {
            ViewData["Usuario"] = HttpContext.Request.Cookies["usuario"];

            return View();
        }


        /*
        [HttpGet]
        public async Task<IActionResult> TransportReport(int routeValue, string filterType)
        {
            IEnumerable<TransportReportListViewModel> datos = null;
            var concertSource = (IEnumerable<TransportReportListViewModel>)(await _reportServices.TransporteReportList(datos)).Data;
            object data = null;
            filterType = string.IsNullOrEmpty(filterType) ? "" : filterType;
            switch (filterType)
            {
                case "transport":
                    data = concertSource.Where(x => x.TipoTransporteID == routeValue).ToList();
                    break;

            }

            //almacena nombre del usuario para enviar como parametro a report builder
            var token = HttpContext.User.FindFirst("Token").Value;
            int? id_user = Convert.ToInt32(HttpContext.Request.Cookies["Usua_ID"]);
            var print_user = ((UserListViewModel)(await _accessService.UsersFind(id_user, token)).Data).Usuario;

            //crea y asigna direccion url de ubicacion de archivo .rdlc
            var path = $"{this._webHostEnvironment.WebRootPath}\\Reports\\TransportReport.rdlc";
            LocalReport localReport = new LocalReport();

            //añade valores recibidos de el endpoint de la API al dataset indicado
          //  localReport.AddDataSource("DataSet1", data);

            // crea y asigna parametros
            Dictionary<string, string> parameters = new Dictionary<string, string>();
            parameters.Add("User_print", print_user.ToString());

            //crea y retorna pdf reader
            //var result = localReport.Execute(RenderType.Pdf, 1, parameters);
            //return File(result.MainStream, "application/pdf");
        }

        */

       



        


       
    }
}
