using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class TipeofpayController : Controller
    {
        SaleServices _saleServices;

        public TipeofpayController(SaleServices saleServices)
        {
            _saleServices = saleServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try { 
            var model = new List<TipeofpayViewModel>();
            var list = await _saleServices.PaymentTypesList();
            return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        [HttpGet]
        public IActionResult Create()
        {
            try { 
            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(TipeofpayViewModel payment)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                payment.TiPa_UsuarioCreacion = int.Parse(id);
                var list = await _saleServices.PaymentTypesCreate(payment, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            try { 
            var item = new TipeofpayViewModel();
            var list = await _saleServices.PaymentTypesList();
            IEnumerable<TipeofpayListViewModel> data = (IEnumerable<TipeofpayListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];

            item.TiPa_ID = element.ID;
            item.TiPa_Descripcion = element.Descripcion;

            return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(TipeofpayViewModel payment)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                payment.TiPa_UsuarioModifica = int.Parse(idd);
                var lista = await _saleServices.PaymentTypesUpdate(payment, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Delete(TipeofpayViewModel pay, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                pay.TiPa_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _saleServices.PaymentTypesDelete(pay, id, token)).Data;

                return Ok(list.CodeStatus);
            }
            else
            {
                return View();
            }
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public async Task<IActionResult> Details(string id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var payment = (TipeofpayListViewModel)(await _saleServices.PaymentTypesFind(id, token)).Data;

            return View(payment);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

    }
}    