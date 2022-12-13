using AHM_TOTAL_TRAVEL_WEB.Configuration;
using AHM_TOTAL_TRAVEL_WEB.Controllers;
using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using AHM_TOTAL_TRAVEL_WEB.WebAPI;
using AspNetCore.Report.ReportService2010_;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace AHM_TOTAL_TRAVEL_UNIT_TEST
{
    [TestFixture]
    public class AccountControllerTest
    {
        private readonly AccessService _accessService;
        private readonly GeneralService _generalService;
        private readonly IMapper _mapper;

        [Test]
        public void TestIndex()
        {
            // Arrange
            AccountController controller = new AccountController(
                    _accessService,
                    _generalService,
                    _mapper);

            // Act
            var result = controller.Index().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

        [Test]
        public void TestGetUpdate()
        {
            // Arrange
            AccountController controller = new AccountController(
                    _accessService,
                    _generalService,
                    _mapper);

            // Act
            var result = controller.Update().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }

    }
}
