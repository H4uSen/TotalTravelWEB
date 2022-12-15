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
    public class TransportDetailsControllerTest
    {
        private readonly TransportService _transportService;
        private readonly AccessService _AccessService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            TransportDetailsController controller = new TransportDetailsController(_transportService, _AccessService);
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
            TransportDetailsController controller = new TransportDetailsController(_transportService, _AccessService);
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
            TransportDetailsController controller = new TransportDetailsController(_transportService, _AccessService);
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
            TransportDetailsController controller = new TransportDetailsController(_transportService, _AccessService);
            // Act
            var result = controller.Delete( 0).Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            TransportDetailsController controller = new TransportDetailsController(_transportService, _AccessService);
            // Act
            var result = controller.Details("0").Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
