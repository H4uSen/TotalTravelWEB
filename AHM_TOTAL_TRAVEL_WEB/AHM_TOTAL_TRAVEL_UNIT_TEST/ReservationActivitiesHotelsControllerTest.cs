using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class ReservationActivitiesHotelsControllerTest
    {
        ReservationService _reservationService;
        HotelsService _hotelsService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ReservationActivitiesHotelsController controller = new ReservationActivitiesHotelsController(
                _reservationService,
                _hotelsService
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
            ReservationActivitiesHotelsController controller = new ReservationActivitiesHotelsController(
                _reservationService,
                _hotelsService
                );

            // Act
            ReservationActivitiesHotelsViewModel model = new ReservationActivitiesHotelsViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            ReservationActivitiesHotelsController controller = new ReservationActivitiesHotelsController(
                _reservationService,
                _hotelsService
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
            ReservationActivitiesHotelsController controller = new ReservationActivitiesHotelsController(
                _reservationService,
                _hotelsService
                );

            // Act
            ReservationActivitiesHotelsViewModel model = new ReservationActivitiesHotelsViewModel();
            model.ReAH_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            ReservationActivitiesHotelsController controller = new ReservationActivitiesHotelsController(
                _reservationService,
                _hotelsService
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