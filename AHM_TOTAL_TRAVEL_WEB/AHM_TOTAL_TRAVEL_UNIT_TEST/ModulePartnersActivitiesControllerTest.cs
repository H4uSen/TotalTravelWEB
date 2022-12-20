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
    public class ModulePartnersActivitiesControllerTest
    {
        private readonly AccessService _accessService;
        private readonly GeneralService _generalService;
        private readonly ActivitiesServices _activitiesService;

        private readonly IMapper _mapper;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                    _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);

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
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                    _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);

            // Act
            var result = controller.Create().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestCreateTypeActivities()
        {
            // Arrange
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                    _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);

            // Act
            TypesActivitiesViewModel model = new TypesActivitiesViewModel();
            var result = controller.CreateTypeActivities(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetUpdate()
        {
            // Arrange
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                     _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);

            // Act
            var result = controller.Update(2).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetUpdatePartner()
        {
            // Arrange
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                     _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);

            // Act
            var result = controller.UpdatePartner().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDelete()
        {
            // Arrange
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                    _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);

            // Act
            ActivitiesExtrasViewModel model = new ActivitiesExtrasViewModel();
            model.AcEx_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestInfo()
        {
            // Arrange
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                    _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);
            // Act
            var result = controller.Info().Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestReservations()
        {
            // Arrange
            ModulePartnersActivitiesController controller = new ModulePartnersActivitiesController(
                    _accessService,
                    _generalService,
                    _activitiesService,
                    _mapper);
            // Act
            var result = controller.Reservations().Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
