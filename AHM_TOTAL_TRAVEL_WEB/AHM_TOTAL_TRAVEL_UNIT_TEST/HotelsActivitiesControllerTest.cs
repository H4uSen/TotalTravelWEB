using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class HotelsActivitiesControllerTest
    {
        private readonly HotelsService _hotelService;
        ActivitiesServices _activitiesServices;

        [Test]
        public void TestIndex()
        {
            HotelsActivitiesController controller = new HotelsActivitiesController(
                     _hotelService,
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
            HotelsActivitiesController controller = new HotelsActivitiesController(
                    _hotelService,
                    _activitiesServices
                   );

            // Act
            HotelsActivitiesViewModel model = new HotelsActivitiesViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDelete()
        {
            HotelsActivitiesController controller = new HotelsActivitiesController(
                     _hotelService,
                     _activitiesServices
                    );

            // Act
            HotelsActivitiesViewModel model = new HotelsActivitiesViewModel();
            model.HoAc_UsuarioModifica = 2;
            var result = controller.Delete(model,0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDetails()
        {
            HotelsActivitiesController controller = new HotelsActivitiesController(
                      _hotelService,
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
