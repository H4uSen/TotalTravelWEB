using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Text;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class DefaultPackagesControllerTest
    {
        SaleServices _saleServices;
        HotelsService _HotelsService;
        RestaurantService _RestaurantService;

        [Test]
        public void TestIndex()
        {
            // Arrange
            DefaultPackagesController controller = new DefaultPackagesController(
                _saleServices,
                _HotelsService,
                _RestaurantService
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
            DefaultPackagesController controller = new DefaultPackagesController(
               _saleServices,
               _HotelsService,
               _RestaurantService
               );

            // Act
            var result = controller.Create().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestUpdate()
        {
            // Arrange
            DefaultPackagesController controller = new DefaultPackagesController(
                _saleServices,
                _HotelsService,
                _RestaurantService
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
            DefaultPackagesController controller = new DefaultPackagesController(
                 _saleServices,
                 _HotelsService,
                 _RestaurantService
                 );


            // Act
            DefaultPackagesViewModel model = new DefaultPackagesViewModel();
            model.paqu_UsuarioModifica = 2;
            var result = controller.Delete(model, 0).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
