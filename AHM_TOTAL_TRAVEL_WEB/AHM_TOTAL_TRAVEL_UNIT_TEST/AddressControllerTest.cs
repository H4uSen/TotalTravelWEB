using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class AddressControllerTest
    {
        GeneralService _generalService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            AddressController controller = new AddressController(
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
            AddressController controller = new AddressController(
                _generalService
                );

            // Act
            AddressViewModel model = new AddressViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDelete()
        {
            // Arrange
            AddressController controller = new AddressController(
                _generalService
                );

            // Act
            AddressViewModel model = new AddressViewModel();
            model.Dire_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

    }
}