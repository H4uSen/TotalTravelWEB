using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class HomeControllerTest
    {
        private readonly ILogger<HomeController> _logger;
        private readonly GeneralService _generalServices;
        private readonly SaleServices _SaleServices;
        private readonly ReservationService _ReservationService;
        private readonly AccessService _AccessService;
        private readonly HotelsService _HotelsService;
        private readonly ActivitiesServices _ActivitiesServices;
        private readonly RestaurantService _restaurantService;

        [Test]
        public void TestIndex()
        {
            HomeController controller = new HomeController(
                    _logger,
                    _generalServices,
                    _SaleServices,
                    _ReservationService,
                    _AccessService,
                    _HotelsService,
                    _ActivitiesServices,
                    _restaurantService                  
                   );

            // Act
            var result = controller.Index();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestadminDashboard()
        {
            HomeController controller = new HomeController(
                     _logger,
                     _generalServices,
                     _SaleServices,
                     _ReservationService,
                     _AccessService,
                     _HotelsService,
                     _ActivitiesServices,
                     _restaurantService
                    );

            // Act
            var result = controller.adminDashboard().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestrestaurantDashboard()
        {
            HomeController controller = new HomeController(
                     _logger,
                     _generalServices,
                     _SaleServices,
                     _ReservationService,
                     _AccessService,
                     _HotelsService,
                     _ActivitiesServices,
                     _restaurantService
                    );

            // Act
            var result = controller.restaurantDashboard().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestactivitiesDashboard()
        {
            HomeController controller = new HomeController(
                      _logger,
                      _generalServices,
                      _SaleServices,
                      _ReservationService,
                      _AccessService,
                      _HotelsService,
                      _ActivitiesServices,
                      _restaurantService
                     );

            // Act
            var result = controller.activitiesDashboard().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        [Test]
        public void TestPrivacy()
        {
            HomeController controller = new HomeController(
                     _logger,
                     _generalServices,
                     _SaleServices,
                     _ReservationService,
                     _AccessService,
                     _HotelsService,
                     _ActivitiesServices,
                     _restaurantService
                    );

            // Act
            var result = controller.Privacy();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
        
        [Test]
        public void TestError()
        {
            HomeController controller = new HomeController(
                     _logger,
                     _generalServices,
                     _SaleServices,
                     _ReservationService,
                     _AccessService,
                     _HotelsService,
                     _ActivitiesServices,
                     _restaurantService
                    );

            // Act
            var result = controller.Error();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestError404()
        {
            HomeController controller = new HomeController(
                     _logger,
                     _generalServices,
                     _SaleServices,
                     _ReservationService,
                     _AccessService,
                     _HotelsService,
                     _ActivitiesServices,
                     _restaurantService
                    );

            // Act
            var result = controller.Error404();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestError401()
        {
            HomeController controller = new HomeController(
                     _logger,
                     _generalServices,
                     _SaleServices,
                     _ReservationService,
                     _AccessService,
                     _HotelsService,
                     _ActivitiesServices,
                     _restaurantService
                    );

            // Act
            var result = controller.Error401();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
