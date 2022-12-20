using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class ActivitiesControllerTest
    {
        ActivitiesServices _activitiesServices;
        HotelsService _HotelsService;

        [Test]
        public void TestIndex()
        {
            ActivitiesController controller = new ActivitiesController(
                    _activitiesServices,
                    _HotelsService
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
            ActivitiesController controller = new ActivitiesController(
                _activitiesServices,
                    _HotelsService
                );

            // Act
            ActivitiesViewModel model = new ActivitiesViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }


        [Test]
        public void TestUpdate()
        {
            ActivitiesController controller = new ActivitiesController(
                     _activitiesServices,
                     _HotelsService
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
            ActivitiesController controller = new ActivitiesController(
               _activitiesServices,
                   _HotelsService
               );

            // Act
            ActivitiesViewModel model = new ActivitiesViewModel();
            model.actv_UsuarioModifica = 2;
            var result = controller.Delete(model,0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDetails()
        {
            ActivitiesController controller = new ActivitiesController(
                     _activitiesServices,
                     _HotelsService
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
