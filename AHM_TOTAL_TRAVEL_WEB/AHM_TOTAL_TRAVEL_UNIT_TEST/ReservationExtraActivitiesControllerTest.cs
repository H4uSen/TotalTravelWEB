using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class ReservationExtraActivitiesControllerTest
    {
        ReservationService _reservationService;
        ActivitiesServices _activitiesServices;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ReservationExtraActivitiesController controller = new ReservationExtraActivitiesController(
                _reservationService,
                _activitiesServices
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
            ReservationExtraActivitiesController controller = new ReservationExtraActivitiesController(
                _reservationService,
                _activitiesServices
            );

            // Act
            ReservationExtraActivitiesViewModel model = new ReservationExtraActivitiesViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            ReservationExtraActivitiesController controller = new ReservationExtraActivitiesController(
                _reservationService,
                _activitiesServices
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
            ReservationExtraActivitiesController controller = new ReservationExtraActivitiesController(
                _reservationService,
                _activitiesServices
            );

            // Act
            ReservationExtraActivitiesViewModel model = new ReservationExtraActivitiesViewModel();
            model.ReAE_UsuarioModifica = 2;
            var result = controller.Delete(1).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            ReservationExtraActivitiesController controller = new ReservationExtraActivitiesController(
                _reservationService,
                _activitiesServices
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