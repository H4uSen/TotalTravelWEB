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
    public class ActivitiesExtraControllerTest
    {
        ActivitiesServices _activitiesServices;
        GeneralService _generalService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ActivitiesExtraController controller = new ActivitiesExtraController(
                    _activitiesServices,
                    _generalService);

            // Act
            var result = controller.Index().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetCreate()
        {
            // Arrange
            ActivitiesExtraController controller = new ActivitiesExtraController(
                    _activitiesServices,
                    _generalService);

            // Act
            var result = controller.Create().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetUpdate()
        {
            // Arrange
            ActivitiesExtraController controller = new ActivitiesExtraController(
                     _activitiesServices,
                     _generalService);

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
            ActivitiesExtraController controller = new ActivitiesExtraController(
                    _activitiesServices,
                    _generalService);

            // Act
            ActivitiesExtrasViewModel model = new ActivitiesExtrasViewModel();
            model.AcEx_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
