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
    public class TypeActivitiesControllerTest
    {
        private readonly ActivitiesServices _activitiesServices;

        [Test]
        public void TestIndex()
        {
            // Arrange
            TypesActivitiesController controller = new TypesActivitiesController(_activitiesServices);
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
            TypesActivitiesController controller = new TypesActivitiesController(_activitiesServices);
            // Act
            var result = controller.Create();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            TypesActivitiesController controller = new TypesActivitiesController(_activitiesServices);
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
            TypesActivitiesController controller = new TypesActivitiesController(_activitiesServices);
            // Act
            TypesActivitiesViewModel model = new TypesActivitiesViewModel();
            model.TiAc_UsuarioModifica = 2;

            var result = controller.Delete(model,0).Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            TypesActivitiesController controller = new TypesActivitiesController(_activitiesServices);
            // Act
            var result = controller.Details("0").Result;
            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
