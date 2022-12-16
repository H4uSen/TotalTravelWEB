using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class ReservationTransportationControllerTest
    {
        ReservationService _reservationService;
        TransportService _transportService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            ReservationTransportationController controller = new ReservationTransportationController(
                _reservationService,
                _transportService
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
            ReservationTransportationController controller = new ReservationTransportationController(
                _reservationService,
                _transportService
            );

            // Act
            ReservationTransportationViewModel model = new ReservationTransportationViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            ReservationTransportationController controller = new ReservationTransportationController(
                _reservationService,
                _transportService
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
            ReservationTransportationController controller = new ReservationTransportationController(
                _reservationService,
                _transportService
            );

            // Act
            ReservationTransportationViewModel model = new ReservationTransportationViewModel();
            model.ReTr_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            // Arrange
            ReservationTransportationController controller = new ReservationTransportationController(
                _reservationService,
                _transportService
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