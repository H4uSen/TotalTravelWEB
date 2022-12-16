using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class ReservationRestaurantControllerTest
    {
        ReservationService _reservationService;
        RestaurantService _restaurantService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ReservationRestaurantController controller = new ReservationRestaurantController(
                _reservationService,
                _restaurantService
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
            ReservationRestaurantController controller = new ReservationRestaurantController(
                _reservationService,
                _restaurantService
            );

            // Act
            ReservationRestaurantsViewModel model = new ReservationRestaurantsViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            ReservationRestaurantController controller = new ReservationRestaurantController(
                _reservationService,
                _restaurantService
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
            ReservationRestaurantController controller = new ReservationRestaurantController(
                _reservationService,
                _restaurantService
            );

            // Act
            ReservationRestaurantsViewModel model = new ReservationRestaurantsViewModel();
            model.ReRe_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            ReservationRestaurantController controller = new ReservationRestaurantController(
                _reservationService,
                _restaurantService
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