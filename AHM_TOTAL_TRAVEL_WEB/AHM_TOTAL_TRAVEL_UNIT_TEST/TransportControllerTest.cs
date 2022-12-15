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
    public class TransportControllerTest
    {
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            TransportController controller = new TransportController(_transportService, _generalService);
            // Act
            var result = controller.Index().Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestCreate()
        {
            // Arrange
            TransportController controller = new TransportController(_transportService, _generalService);
            // Act
            var result = controller.Create().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            TransportController controller = new TransportController(_transportService, _generalService);
            // Act
            var result = controller.Update(2).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDelete()
        {
            // Arrange
            TransportController controller = new TransportController(_transportService, _generalService);
            // Act
            TransportViewModel model = new TransportViewModel();
            model.Tprt_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

    }
}
