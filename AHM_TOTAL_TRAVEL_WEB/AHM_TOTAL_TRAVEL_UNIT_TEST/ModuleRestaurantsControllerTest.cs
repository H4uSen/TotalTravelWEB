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
    public class ModuleRestaurantsControllerTest
    {
        private readonly AccessService _accessService;
        private readonly RestaurantService _restaurantService;
        private readonly GeneralService _generalService;
        private readonly ReservationService _reservationService;

        private readonly IMapper _mapper;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ModuleRestaurantsController controller = new ModuleRestaurantsController(
                    _accessService,
                    _restaurantService,
                    _generalService,
                    _reservationService,
                    _mapper);

            // Act
            var result = controller.Index().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetUpdate()
        {
            // Arrange
            ModuleRestaurantsController controller = new ModuleRestaurantsController(
                     _accessService,
                    _restaurantService,
                    _generalService,
                    _reservationService,
                    _mapper);

            // Act
            var result = controller.Update().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestCreateTypeMenu()
        {
            // Arrange
            ModuleRestaurantsController controller = new ModuleRestaurantsController(
                    _accessService,
                    _restaurantService,
                    _generalService,
                    _reservationService,
                    _mapper);

            // Act
            TypeMenusViewModel model = new TypeMenusViewModel();
            var result = controller.CreateTypeMenu(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDelete()
        {
            // Arrange
            ModuleRestaurantsController controller = new ModuleRestaurantsController(
                    _accessService,
                    _restaurantService,
                    _generalService,
                    _reservationService,
                    _mapper);

            // Act
            MenusViewModel model = new MenusViewModel();
            model.Menu_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestInfo()
        {
            // Arrange
            ModuleRestaurantsController controller = new ModuleRestaurantsController(
                    _accessService,
                    _restaurantService,
                    _generalService,
                    _reservationService,
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
            ModuleRestaurantsController controller = new ModuleRestaurantsController(
                    _accessService,
                    _restaurantService,
                    _generalService,
                    _reservationService,
                    _mapper);
            // Act
            var result = controller.Reservations().Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
