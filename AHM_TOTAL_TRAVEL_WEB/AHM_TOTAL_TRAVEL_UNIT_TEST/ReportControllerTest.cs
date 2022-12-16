using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using NUnit.Framework;
using System;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class ReportControllerTest
    {
        IWebHostEnvironment _webHostEnvironment;
        IMemoryCache _cache;
        ReportService _reportServices;
        TransportService _transportService;
        GeneralService _generalService;
        RestaurantService _restaurantService;
        HotelsService _hotelsService;
        ReservationService _reservationService;
        IHttpContextAccessor _IHttpContextAccessor;
        AccessService _accessService;
        SaleServices _saleService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.Index();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexHoteles()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexHoteles().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexPaquetesPredeterminadosReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexPaquetesPredeterminadosReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);            
        }

        [Test]
        public void TestIndexSociosReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexSociosReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexTipoPagoReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexTipoPagoReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexReservacionesReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexReservacionesReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexRestaurantesReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexRestaurantesReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexTransporteReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexTransporteReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexUsuariosReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexUsuariosReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexClientesReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.IndexClientesReport().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        //[Test]
        //public void TestExportPDF()
        //{
        //    // Arrange
        //    ReportController controller = new ReportController(
        //        _cache,
        //        _reportServices,
        //        _webHostEnvironment,
        //        _IHttpContextAccessor,
        //        _accessService,
        //        _transportService,
        //        _restaurantService,
        //        _hotelsService,
        //        _reservationService,
        //        _saleService,
        //        _generalService
        //    );

        //    // Act
        //    ReportCreationModel model = new ReportCreationModel();
        //    var result = controller.ExportPDF(model).Result;

        //    // Assert
        //    Assert.IsNotNull(result);
        //    Assert.IsInstanceOf<IActionResult>(result);
        //}

        //[Test]
        //public void TestPdfAsByte()
        //{
        //    // Arrange
        //    ReportController controller = new ReportController(
        //        _cache,
        //        _reportServices,
        //        _webHostEnvironment,
        //        _IHttpContextAccessor,
        //        _accessService,
        //        _transportService,
        //        _restaurantService,
        //        _hotelsService,
        //        _reservationService,
        //        _saleService,
        //        _generalService
        //    );

        //    // Act
        //    ReportCreationModel model = new ReportCreationModel();
        //    var result = controller.PdfAsByte(model).Result;

        //    // Assert
        //    Assert.IsNotNull(result);
        //    Assert.IsInstanceOf<IActionResult>(result);
        //}

        //[Test]
        //public void TestListOfDataSources()
        //{
        //    // Arrange
        //    ReportController controller = new ReportController(
        //        _cache,
        //        _reportServices,
        //        _webHostEnvironment,
        //        _IHttpContextAccessor,
        //        _accessService,
        //        _transportService,
        //        _restaurantService,
        //        _hotelsService,
        //        _reservationService,
        //        _saleService,
        //        _generalService
        //    );

        //    // Act
        //    ReportCreationModel model = new ReportCreationModel();
        //    string token = "";
        //    var result = controller.ListOfDataSources(model, token).Result;

        //    // Assert
        //    Assert.IsNotNull(result);
        //    Assert.IsInstanceOf<IActionResult>(result);
        //}

        [Test]
        public void TestTransportReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.TransportReport();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestTransportReportHTML()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.TransportReportHTML().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestReservacionesReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.ReservacionesReport();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestReservacionesReportHTML()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.ReservacionesReportHTML().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestRecordPaymentReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.RecordPaymentReport();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestRecordPaymentReportHTML()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.RecordPaymentReportHTML().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDefaultPackagesReport()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.DefaultPackagesReport();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDefaultPackagesReportHTML()
        {
            // Arrange
            ReportController controller = new ReportController(
                _cache,
                _reportServices,
                _webHostEnvironment,
                _IHttpContextAccessor,
                _accessService,
                _transportService,
                _restaurantService,
                _hotelsService,
                _reservationService,
                _saleService,
                _generalService
            );

            // Act
            var result = controller.DefaultPackagesReportHTML().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}