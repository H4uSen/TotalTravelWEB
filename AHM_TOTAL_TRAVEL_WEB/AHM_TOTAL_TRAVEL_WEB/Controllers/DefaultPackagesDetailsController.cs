using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class DefaultPackagesDetailsController : Controller
    {
        SaleServices _saleServices;
        ActivitiesServices _activitiesServices;
        public DefaultPackagesDetailsController(SaleServices saleServices, ActivitiesServices activitiesServices)
        {
            _saleServices = saleServices;
            _activitiesServices = activitiesServices;

        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try { 
            var model = new List<DefaultPackagesDetailsListViewModel>();
            var list = await _saleServices.DefaultPackagesDetailsList();

            var model2 = new List<DefaultPackagesListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;


            var Depa = await _saleServices.DefaultPackagesList(token);
            IEnumerable<DefaultPackagesListViewModel> data_dp = (IEnumerable<DefaultPackagesListViewModel>)Depa.Data;
            ViewBag.paqu_ID = new SelectList(data_dp, "Id", "Nombre");

            var ac = await _activitiesServices.ActivityList(token);
            IEnumerable<ActivitiesListViewModel> data_act = (IEnumerable<ActivitiesListViewModel>)ac.Data;
            ViewBag.Actv_ID = new SelectList(data_act, "ID", "Descripcion");
            return View(list.Data);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        [HttpGet]
        public async Task<IActionResult> Create()
        {
            try { 
            var model = new List<DefaultPackagesListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;


            var Depa = await _saleServices.DefaultPackagesList(token);
            IEnumerable<DefaultPackagesListViewModel> data_dp = (IEnumerable<DefaultPackagesListViewModel>)Depa.Data;
            ViewBag.paqu_ID = new SelectList(data_dp, "Id", "Nombre");

            var ac = await _activitiesServices.ActivityList(token);
            IEnumerable<ActivitiesListViewModel> data_act = (IEnumerable<ActivitiesListViewModel>)ac.Data;
            ViewBag.Actv_ID = new SelectList(data_act, "ID", "Descripcion");

            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
        [HttpPost]
        public async Task<IActionResult> Create(DefaultPackagesDetailsViewModel package)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                package.PaDe_UsuarioCreacion = int.Parse(id);
                var list = await _saleServices.DefaultPackagesDetailsCreate(package, token);
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
            var item = new DefaultPackagesDetailsViewModel();
            var list = await _saleServices.DefaultPackagesDetailsList();
            IEnumerable<DefaultPackagesDetailsListViewModel> data = (IEnumerable<DefaultPackagesDetailsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.PaDe_ID = element.ID;
            item.Paqu_ID = element.PaqueteID;
            item.Actv_ID = element.ActividadID;
            item.PaDe_Precio = element.Precio;
            item.PaDe_Cantidad = element.Cantidad;

            return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(DefaultPackagesDetailsViewModel ppd)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                ppd.PaDe_UsuarioModifica = int.Parse(idd);
                var lista = await _saleServices.DefaultPackagesDetailsUpdate(ppd, token);
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
        public async Task<IActionResult> Delete(DefaultPackagesDetailsViewModel transporte, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                transporte.PaDe_UsuarioModifica = 1;

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _saleServices.DefaultPackagesDetailsDelete(transporte, id, token);

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

        public async Task<IActionResult> Details(string id)
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;
            var detalle = (DefaultPackagesDetailsListViewModel)(await _saleServices.DefaultPackagesDetailsFind(id, token)).Data;
            return View(detalle);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

    }
}
