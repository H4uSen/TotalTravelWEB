using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;


namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class DashBoardHotelHomeControllerTest 
    {
        private readonly AccessService _AccessService;
        private readonly GeneralService _GeneralService;
        private readonly HotelsService _HotelsService;


        [Test]
        public void TestHotelDashboard()
        {
            DashBoardHotelHomeController controller = new DashBoardHotelHomeController(
                    _HotelsService,
                    _AccessService,
                    _GeneralService 
                    );

            // Act
            var result = controller.HotelDashboard().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
