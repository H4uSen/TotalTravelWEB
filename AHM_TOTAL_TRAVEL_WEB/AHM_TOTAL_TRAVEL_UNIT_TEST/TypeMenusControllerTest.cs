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
    public class TypeMenusControllerTest
    {
        private readonly RestaurantService _restaurantServices;

        [Test]
        public void TestIndex()
        {
            // Arrange
            TypeMenusController controller = new TypeMenusController(_restaurantServices);
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
            TypeMenusController controller = new TypeMenusController(_restaurantServices);
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
            TypeMenusController controller = new TypeMenusController(_restaurantServices);
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
            TypeMenusController controller = new TypeMenusController(_restaurantServices);
            // Act
            TypeMenusViewModel model = new TypeMenusViewModel();
            model.Time_UsuarioModifica = 2;

            var result = controller.Delete(model,0).Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            TypeMenusController controller = new TypeMenusController(_restaurantServices);
            // Act
            var result = controller.Details("0").Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
