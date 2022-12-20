using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class HotelControllerTest
    {
        private readonly HotelsService _hotelService;
        private readonly GeneralService _generalService;

        [Test]
        public void TestIndex()
        {
            HotelController controller = new HotelController(
                     _hotelService,
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
            HotelController controller = new HotelController(
                      _hotelService,
                      _generalService
                     );

            // Act
            HotelViewModel model = new HotelViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            HotelController controller = new HotelController(
                     _hotelService,
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
            HotelController controller = new HotelController(
                     _hotelService,
                     _generalService
                    );

            // Act
            HotelViewModel model = new HotelViewModel();
            model.Hote_UsuarioModifica = 2;
            var result = controller.Delete(model,0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestDetails()
        {
            HotelController controller = new HotelController(
                     _hotelService,
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
