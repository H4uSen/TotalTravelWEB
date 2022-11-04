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
        public readonly IHttpContextAccessor _IHttpContextAccessor;
        public readonly AccessService _accessService;
        public readonly SaleServices _saleService;


        public ReportController(ReportService reportService, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor, AccessService accessService,TransportService transportService, SaleServices saleServices)
        {
            this._webHostEnvironment = webHostEnvironment;
            _IHttpContextAccessor = httpContextAccessor;
            _reportServices = reportService;
            _accessService = accessService;
            _transportService = transportService;
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

        //registros pagos---------------------------------------
        public IActionResult RecordPaymentReport()
        {

            return View();
        }

        public async Task<IActionResult> RecordPaymentReportPDF(string filtertype, string filtervalue)
        {
            var data = (IEnumerable<PaymentRecordListViewModel>)(await _saleService.PaymentRecordsList()).Data;
            switch (filtertype)
            {
                case "Id_cliente":
                    data = data.Where(x => x.Id_Cliente == Convert.ToInt32(filtervalue)).ToList();
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


    }
}
