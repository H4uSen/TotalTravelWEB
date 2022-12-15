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
    public class UsersControllerTest
    {
        private readonly GeneralService _GeneralServices;
        private readonly AccessService _AccessService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            UsersController controller = new UsersController(_GeneralServices, _AccessService);
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
            UsersController controller = new UsersController(_GeneralServices, _AccessService);
            // Act
            RouteValuesModel routeValues = new RouteValuesModel();
            var result = controller.Create(routeValues).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            UsersController controller = new UsersController(_GeneralServices, _AccessService);
            // Act
            var result = controller.Update().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDelete()
        {
            // Arrange
            UsersController controller = new UsersController(_GeneralServices, _AccessService);
            // Act
           UserViewModel model = new UserViewModel();
            model.Usua_UsuarioModifica = 2;

            var result = controller.Delete(0).Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            UsersController controller = new UsersController(_GeneralServices, _AccessService);
            // Act
            var result = controller.Details(0).Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
