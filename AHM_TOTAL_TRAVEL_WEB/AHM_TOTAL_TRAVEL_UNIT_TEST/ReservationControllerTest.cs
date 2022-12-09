using AHM_TOTAL_TRAVEL_WEB.Configuration;
using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using AspNetCore.Report.ReportService2010_;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class ReservationControllerTest
    {

        private ReservationService _reservationService;
        private HotelsService _hotelsService;
        private AccessService _accessService;
        private SaleServices _saleServices;
        private ActivitiesServices _activitiesServices;
        private GeneralService _GeneralService;


        [Test]
        public void TestIndex() {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ReservationController controller = new ReservationController(
                    _reservationService,
                    _hotelsService,
                    _accessService,
                    _saleServices,
                    _activitiesServices,
                    _GeneralService);

            // Act
            var result = controller.Index(routeValues).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetCreate() {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ReservationController controller = new ReservationController(
                    _reservationService,
                    _hotelsService,
                    _accessService,
                    _saleServices,
                    _activitiesServices,
                    _GeneralService);

            // Act
            var result = controller.Create(routeValues).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetUpdate() {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ReservationController controller = new ReservationController(
                    _reservationService,
                    _hotelsService,
                    _accessService,
                    _saleServices,
                    _activitiesServices,
                    _GeneralService);

            // Act
            var result = controller.Update(11, routeValues).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDelete(){
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ReservationController controller = new ReservationController(
                    _reservationService,
                    _hotelsService,
                    _accessService,
                    _saleServices,
                    _activitiesServices,
                    _GeneralService);

            // Act
            var result = controller.Delete(0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestPersonalizePackages() {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ReservationController controller = new ReservationController(
                    _reservationService,
                    _hotelsService,
                    _accessService,
                    _saleServices,
                    _activitiesServices,
                    _GeneralService);

            // Act
            var result = controller.PersonalizePackages(routeValues).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
