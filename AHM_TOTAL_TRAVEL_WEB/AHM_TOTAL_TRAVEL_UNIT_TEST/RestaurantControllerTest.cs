using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class RestaurantControllerTest
    {
        GeneralService _generalService;
        RestaurantService _restaurantServices;

        [Test]
        public void TestIndex()
        {
            // Arrange
            RestaurantController controller = new RestaurantController(
                _restaurantServices,
                _generalService
            );

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
            RestaurantController controller = new RestaurantController(
                _restaurantServices,
                _generalService
            );

            // Act
            RestaurantViewModel model = new RestaurantViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            RestaurantController controller = new RestaurantController(
                _restaurantServices,
                _generalService
            );

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
            RestaurantController controller = new RestaurantController(
                _restaurantServices,
                _generalService
            );

            // Act
            RestaurantViewModel model = new RestaurantViewModel();
            model.Rest_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            RestaurantController controller = new RestaurantController(
                _restaurantServices,
                _generalService
            );

            // Act
            string id = "2";
            var result = controller.Details(id).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

    }
}