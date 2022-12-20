using AHM_TOTAL_TRAVEL_WEB.Configuration;
using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using AspNetCore.Report.ReportService2010_;
using AutoMapper;
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
    public class RegistrationPaymentsControllerTest
    {
        private readonly SaleServices _saleServices;
        private readonly ReservationService _reservationServices;

        [Test]
        public void TestIndex()
        {
            // Arrange
            RegistrationPaymentsController controller = new RegistrationPaymentsController(
                    _saleServices,
                    _reservationServices);

            // Act
            var result = controller.Index().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestIndexHistory()
        {
            // Arrange
            RegistrationPaymentsController controller = new RegistrationPaymentsController(
                    _saleServices,
                    _reservationServices);

            // Act
            var result = controller.IndexHistory().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetCreate()
        {
            // Arrange
            RegistrationPaymentsController controller = new RegistrationPaymentsController(
                    _saleServices,
                    _reservationServices);

            // Act
            var result = controller.Create();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetUpdate()
        {
            // Arrange
            RegistrationPaymentsController controller = new RegistrationPaymentsController(
                     _saleServices,
                    _reservationServices);

            // Act
            var result = controller.Update("2").Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDelete()
        {
            // Arrange
            RegistrationPaymentsController controller = new RegistrationPaymentsController(
                    _saleServices,
                    _reservationServices);

            // Act
            var result = controller.Delete(0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
