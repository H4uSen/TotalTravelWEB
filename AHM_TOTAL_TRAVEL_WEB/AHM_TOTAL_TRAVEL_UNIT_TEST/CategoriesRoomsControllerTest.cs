using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class CategoriesRoomsControllerTest
    {
        HotelsService _hotelsServices;

        [Test]
        public void TestIndex()
        {
            // Arrange
            CategoriesRoomsController controller = new CategoriesRoomsController(
                _hotelsServices
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
            CategoriesRoomsController controller = new CategoriesRoomsController(
                _hotelsServices
                );

            // Act
            categoryroomsViewModel model = new categoryroomsViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            CategoriesRoomsController controller = new CategoriesRoomsController(
                _hotelsServices
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
            CategoriesRoomsController controller = new CategoriesRoomsController(
                _hotelsServices
                );

            // Act
            categoryroomsViewModel model = new categoryroomsViewModel();
            model.CaHa_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

    }
}