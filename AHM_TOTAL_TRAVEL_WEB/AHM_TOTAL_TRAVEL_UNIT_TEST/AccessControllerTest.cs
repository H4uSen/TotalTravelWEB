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
    public class AccessControllerTest
    {
        //int userId;
        private readonly AccessService _accessServices;
        private readonly GeneralService _generalService;
        
        [Test]
        public void TestLogin()
        {
            // Arrange
            AccessController controller = new AccessController(
                    _accessServices,
                    _generalService
                    );

            // Act
            var result = controller.Login("");

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }
        [Test]
        public void TestRecoverPassword()
        {
            AccessController controller = new AccessController(
                    _accessServices,
                    _generalService
                    );

            // Act
            var result = controller.RecoverPassword();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }

        [Test]
        public void TestEmailVerification()
        {
            AccessController controller = new AccessController(
                    _accessServices,
                    _generalService
                    );

            // Act
            EmailVerificationModel model = new EmailVerificationModel();
            var result = controller.EmailVerification(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }
        [Test]
        public void TestRegisterAsync()
        {
            AccessController controller = new AccessController(
                     _accessServices,
                     _generalService
                     );

            // Act
            var result = controller.RegisterAsync().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }

        [Test]
        public void TestChangePassword()
        {
            AccessController controller = new AccessController(
                     _accessServices,
                     _generalService
                     );

            // Act
            changePassword model = new changePassword();
            var result = controller.ChangePassword(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }

        [Test]
        public void TestCodeConfirmX()
        {

            AccessController controller = new AccessController(
                    _accessServices,
                    _generalService
                    );

            // Act
            userCodevalidation model = new userCodevalidation();
            var result = controller.CodeConfirmX(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }

        
        [Test]
        public void TestLandingPage()
        {
            AccessController controller = new AccessController(
                   _accessServices,
                   _generalService
                   );

            // Act
            var result = controller.LandingPage();

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }

        [Test]
        public void TestManualLogIn()
        {
            AccessController controller = new AccessController(
                      _accessServices,
                      _generalService
                      );

            // Act
            UserLoginModel model = new UserLoginModel();
            var result = controller.ManualLogIn(model).Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<object>(result);

        }

        //USAR REFERENCIAS Models y Data
        [Test]
        public void TestLogIn()
        {

            AccessController controller = new AccessController(
                      _accessServices,
                      _generalService
                      );

            // Act
            UserLoginModel model = new UserLoginModel();
            var result = controller.LogIn(model,"").Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);

        }
        [Test]
        public void TestClaimReading()
        {
            AccessController controller = new AccessController(
                      _accessServices,
                      _generalService
                      );

            // Act
            
            var result = controller.ClaimReading(null);

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<ServiceResult>(result);

        }
        [Test]
        public void TestLogOut()
        {
            AccessController controller = new AccessController(
                      _accessServices,
                      _generalService
                      );

            // Act
            var result = controller.LogOut().Result;

            // Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOf<IActionResult>(result);
        }
    }
}
