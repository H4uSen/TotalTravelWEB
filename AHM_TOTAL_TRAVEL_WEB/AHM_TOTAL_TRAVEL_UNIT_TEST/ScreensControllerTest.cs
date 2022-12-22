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
    class ScreensControllerTest
    {
        private readonly GeneralService _GeneralServices;
        private readonly AccessService _AccessService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ScreensController controller = new ScreensController(
             _GeneralServices,
             _AccessService
             );

            // Act
            var result = controller.Index(routeValues).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetCreate()
        {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ScreensController controller = new ScreensController(
            _GeneralServices,
            _AccessService
            );


            // Act
            var result = controller.Create(routeValues);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestGetUpdate()
        {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ScreensController controller = new ScreensController(
             _GeneralServices,
             _AccessService
             );


            // Act
            var result = controller.Update(11, routeValues);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }


        [Test]
        public void TestDelete()
        {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ScreensController controller = new ScreensController(
             _GeneralServices,
             _AccessService
             );



            // Act
            var result = controller.Delete(0);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }


        [Test]
        public void TestDeleteModule()
        {
            // Arrange
            RouteValuesModel routeValues = new RouteValuesModel();
            ScreensController controller = new ScreensController(
             _GeneralServices,
             _AccessService
             );



            // Act
            var result = controller.Delete(0);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }


    }
}