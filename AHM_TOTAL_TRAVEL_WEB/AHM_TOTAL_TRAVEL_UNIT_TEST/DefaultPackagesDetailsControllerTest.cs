using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class DefaultPackagesDetailsControllerTest 
    {
        SaleServices _saleServices;
        ActivitiesServices _activitiesServices;

        [Test]
        public void TestIndex()
        {
            DefaultPackagesDetailsController controller = new DefaultPackagesDetailsController(
                     _saleServices,
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
            DefaultPackagesDetailsController controller = new DefaultPackagesDetailsController(
                     _saleServices,
                     _activitiesServices
                    );

            // Act
            DefaultPackagesDetailsViewModel model = new DefaultPackagesDetailsViewModel();
            var result = controller.Create(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            DefaultPackagesDetailsController controller = new DefaultPackagesDetailsController(
                    _saleServices,
                    _activitiesServices
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
            DefaultPackagesDetailsController controller = new DefaultPackagesDetailsController(
                     _saleServices,
                     _activitiesServices
                    );

            // Act
            DefaultPackagesDetailsViewModel model = new DefaultPackagesDetailsViewModel();
            model.PaDe_UsuarioModifica = 2;
            var result = controller.Delete(model,0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestDetails()
        {
            DefaultPackagesDetailsController controller = new DefaultPackagesDetailsController(
                    _saleServices,
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
