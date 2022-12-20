using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;


namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class DashBoardTransportsHomeControllerTest
    {
        private readonly TransportService _transportService;
        private readonly GeneralService _generalService;

        [Test]
        public void TestIndex()
        {
            DashBoardTransportsHomeController controller = new DashBoardTransportsHomeController(
                      _transportService,
                     _generalService
                     );

            // Act
            var result = controller.Index();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
       
    }
}
