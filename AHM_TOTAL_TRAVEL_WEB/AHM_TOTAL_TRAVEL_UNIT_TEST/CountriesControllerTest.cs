using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class CountriesControllerTest
    {
        private GeneralService _GeneralService;
        [Test]
        public void TestIndex()
        {
            // Arrange
            CountriesController controller = new CountriesController(_GeneralService);

            // Act
            var result = controller.Index();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestGetCreate()
        {
            // Arrange
            CountriesController controller = new CountriesController(_GeneralService);

            // Act
            var result = controller.Create();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestGetUpdate() {
            // Arrange
            int id = 0;
            CountriesController controller = new CountriesController(_GeneralService);

            // Act
            var result = controller.Update(id.ToString());

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDelete() {
            // Arrange
            int id = 0;
            CountriesViewModel countriesViewModel = new CountriesViewModel();
            CountriesController controller = new CountriesController(_GeneralService);

            // Act
            var result = controller.Delete(countriesViewModel,id);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetDetails()
        {
            // Arrange
            int id = 0;
            CountriesController controller = new CountriesController(_GeneralService);

            // Act
            var result = controller.Details(id.ToString());

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
