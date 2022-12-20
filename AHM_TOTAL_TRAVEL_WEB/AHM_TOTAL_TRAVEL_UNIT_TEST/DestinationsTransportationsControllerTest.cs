using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class DestinationsTransportationsControllerTest
    {
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;

        [Test]
        public void TestIndex()
        {
            DestinationsTransportationsController controller = new DestinationsTransportationsController(
                    _transportService,
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
            DestinationsTransportationsController controller = new DestinationsTransportationsController(
                   _transportService,
                   _generalService
                  );

            // Act
            DestinationsTransportationsViewModel model = new DestinationsTransportationsViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            DestinationsTransportationsController controller = new DestinationsTransportationsController(
                    _transportService,
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
            DestinationsTransportationsController controller = new DestinationsTransportationsController(
                   _transportService,
                   _generalService
                  );

            // Act
            DestinationsTransportationsViewModel model = new DestinationsTransportationsViewModel();
            model.DsTr_UsuarioModifica = 2;
            var result = controller.Delete(model,0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDetails()
        {
            DestinationsTransportationsController controller = new DestinationsTransportationsController(
                    _transportService,
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
