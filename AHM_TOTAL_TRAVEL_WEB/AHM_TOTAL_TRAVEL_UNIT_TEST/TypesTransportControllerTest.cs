using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class TypesTransportControllerTest
    {
        private readonly TransportService _transportService;
        [Test]
        public void TestIndex()
        {
            // Arrange
            TypesTransportController controller = new TypesTransportController(_transportService);
            // Act
            var result = controller.Index().Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDelete()
        {
            // Arrange
            TypesTransportController controller = new TypesTransportController(_transportService);
            // Act
            TypesTransportViewModel model = new TypesTransportViewModel();
            model.TiTr_UsuarioModifica = 2;

            var result = controller.Delete(model, 0).Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            TypesTransportController controller = new TypesTransportController(_transportService);
            // Act
            var result = controller.Details("0").Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

    }
}
