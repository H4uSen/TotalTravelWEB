﻿using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    [Authorize(Policy = "MyPolicy")]
    public class DefaultPackagesController : Controller
    {
        SaleServices _saleServices;
        HotelsService _HotelsService;
        RestaurantService _RestaurantService;

        public DefaultPackagesController(SaleServices saleServices, HotelsService hotelsService, RestaurantService restaurantService)
        {
            _saleServices = saleServices;
            _HotelsService = hotelsService;
            _RestaurantService = restaurantService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try { 
            string token = HttpContext.User.FindFirst("Token").Value;

            var model = new List<DefaultPackagesListViewModel>();
            var list = await _saleServices.DefaultPackagesList(token);
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
            var model = new List<RestaurantListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;


            var hotel = await _HotelsService.HotelsList(token);
            IEnumerable<HotelListViewModel> data_hotel = (IEnumerable<HotelListViewModel>)hotel.Data;
            ViewBag.hote_ID = new SelectList(data_hotel, "ID", "Hotel");

            var habi = await _HotelsService.RoomsList(token);
            IEnumerable<RoomsListViewModel> data_habi = (IEnumerable<RoomsListViewModel>)habi.Data;
            ViewBag.habi_ID = new SelectList(data_habi, "ID", "Habitacion");
                 
            var rest = await _RestaurantService.RestaurantsList(token);
            IEnumerable<RestaurantListViewModel> data_restaurant = (IEnumerable<RestaurantListViewModel>)rest.Data;
            ViewBag.rest_ID = new SelectList(data_restaurant, "ID", "Restaurante");

            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }


        }

        [HttpPost]
        public async Task<IActionResult> Create(DefaultPackagesViewModel actividad, IFormCollection form)
        {
            try { 

                if (actividad.paqu_ID > 0)
                {
                string token = HttpContext.User.FindFirst("Token").Value;
                RoomsPackagesViewModel rooms = new RoomsPackagesViewModel();
                rooms.habi_Id = actividad.habi_Id;
                rooms.paqu_Id = actividad.paqu_ID;
                rooms.paHa_UsuarioCreacion = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _saleServices.RoomsPackagesCreate(rooms, token);

                //Extra activities of the hotel
                int amountHtelActvities = form.Keys.Count(x => x.Contains("ddlhotelsExtraActivities_"));
                    var ExtraHtelActivities = form.Keys.Where(x => x.Contains("ddlhotelsExtraActivities_")).ToList();
                    var ExtraHtelActivitiesAmount = form.Keys.Where(x => x.Contains("hotelsExtraActivitiesAmount_")).ToList();
                    var ExtraHtelActivitiesPrice = form.Keys.Where(x => x.Contains("hotelsExtraActivitiesPrice_")).ToList();
                    if (!amountHtelActvities.Equals(0))
                    {
                        try
                        {  
                        var id = HttpContext.User.FindFirst("User_Id").Value;
                        ServiceResult responseActivities = null;
                        var listResponse = responseActivities;
                            for (int i = 0; i < amountHtelActvities; i++)
                            {
                            DefaultPackagesDetailsViewModel package = new DefaultPackagesDetailsViewModel();
                            package.Paqu_ID = actividad.paqu_ID;
                            package.Actv_ID = Convert.ToInt32(form[ExtraHtelActivities[i]].ToString());
                            package.PaDe_Cantidad = Convert.ToInt32(form[ExtraHtelActivitiesAmount[i]].ToString());
                            package.PaDe_Precio = Convert.ToInt32(form[ExtraHtelActivitiesPrice[i]].ToString());
                            package.PaDe_UsuarioCreacion = int.Parse(id);
                            listResponse = await _saleServices.DefaultPackagesDetailsCreate(package, token);

                             }
                            if (listResponse.Success)
                            {
                             return Redirect("/DefaultPackages?success=true");
                            }
                        }
                        catch (Exception e)
                        {

                            throw e;
                        }

                    }




                    return Redirect("~/DefaultPackages?success=true");
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
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;

                var item = new DefaultPackagesViewModel();
                var Items = (DefaultPackagesListViewModel)(await _saleServices.DefaultPackagesFind(id.ToString(), token)).Data;
                var list = await _saleServices.DefaultPackagesList(token);
                IEnumerable<DefaultPackagesListViewModel> data = (IEnumerable<DefaultPackagesListViewModel>)list.Data;
                var element = data.Where(x => x.Id == id).ToList()[0];
                item.paqu_ID = element.Id;
                item.paqu_Descripcion = element.Descripcion_Paquete;
                item.paqu_Duracion = element.Duracion_Paquete;
                item.paqu_Nombre = element.Nombre;
                item.paqu_Precio = element.precio;
                item.hote_ID = element.ID_Hotel;
                item.rest_ID = element.ID_Restaurante;
                item.paqu_CantPersonas = element.Cantidad_de_personas;

                var hotel = await _HotelsService.HotelsList(token);
                IEnumerable<HotelListViewModel> data_hotel = (IEnumerable<HotelListViewModel>)hotel.Data;
                ViewBag.hote_ID = new SelectList(data_hotel, "ID", "Hotel", element.ID_Hotel);

                var habi = await _HotelsService.RoomsList(token);
                IEnumerable<RoomsListViewModel> data_habi = (IEnumerable<RoomsListViewModel>)habi.Data;
                ViewBag.habi_ID = new SelectList(data_habi, "ID", "Habitacion");

                var rest = await _RestaurantService.RestaurantsList(token);
                IEnumerable<RestaurantListViewModel> data_restaurant = (IEnumerable<RestaurantListViewModel>)rest.Data;
                ViewBag.rest_ID = new SelectList(data_restaurant, "ID", "Restaurante", element.ID_Restaurante);

                ViewData["PackageFolder"] = $"DefaultPackage/DefaultPackage-{Items.Id}/Place";
                ViewData["Descripcion"] = element.Descripcion_Paquete;
                ViewData["Duracion"] = element.Duracion_Paquete;
                ViewData["Nombre"] = element.Nombre;
                ViewData["Precio"] = element.precio;
                ViewData["HotelID"] = element.ID_Hotel;
                ViewData["RestID"] = element.ID_Restaurante;
                ViewData["ID"] = element.Id;

                return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(DefaultPackagesViewModel actividad, IFormCollection form)
        {
            try
            {
                if (actividad.rest_ID == 0)
                {
                    actividad.rest_ID = null;
                }
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    actividad.paqu_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);
                    RoomsPackagesViewModel rooms = new RoomsPackagesViewModel();
                    var roomid = actividad.RoPa_ID;
                    rooms.habi_Id = actividad.habi_Id;
                    rooms.paqu_Id = actividad.paqu_ID;
                    rooms.paHa_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                    var list = await _saleServices.RoomsPackagesUpdate(rooms, roomid, token);

                    int amountHtelActvities = form.Keys.Count(x => x.Contains("ddlhtelActivitiesUpdt_"));
                    var ExtraHtelActivitiesID = form.Keys.Where(x => x.Contains("htelActivitiesIDUpdt_")).ToList();
                    var ExtraHtelActivities = form.Keys.Where(x => x.Contains("ddlhtelActivitiesUpdt_")).ToList();
                    var ExtraHtelActivitiesAmount = form.Keys.Where(x => x.Contains("htelActivitiesAmountUpdt_")).ToList();
                    var ExtraHtelActivitiesPrice = form.Keys.Where(x => x.Contains("htelActivitiesPriceUpdt_")).ToList();
                    if (!amountHtelActvities.Equals(0))
                    {
                        try
                        {
                            var id = HttpContext.User.FindFirst("User_Id").Value;
                            ServiceResult responseActivities = null;
                            var listResponse = responseActivities;
                            for (int i = 0; i < amountHtelActvities; i++)
                            {
                                DefaultPackagesDetailsViewModel package = new DefaultPackagesDetailsViewModel();
                                package.PaDe_ID = Convert.ToInt32(form[ExtraHtelActivitiesID[i]].ToString());
                                package.Paqu_ID = actividad.paqu_ID;
                                package.Actv_ID = Convert.ToInt32(form[ExtraHtelActivities[i]].ToString());
                                package.PaDe_Cantidad = Convert.ToInt32(form[ExtraHtelActivitiesAmount[i]].ToString());
                                package.PaDe_Precio = Convert.ToInt32(form[ExtraHtelActivitiesPrice[i]].ToString());
                                package.PaDe_UsuarioModifica = int.Parse(id);
                                listResponse = await _saleServices.DefaultPackagesDetailsUpdate(package, token);

                            }
                            if (listResponse.Success)
                            {
                                return Redirect("/DefaultPackages?success=true");
                            }
                        }
                        catch (Exception e)
                        {

                            throw e;
                        }

                    }
                    return Redirect("~/DefaultPackages?success=true");
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
        public async Task<IActionResult> Delete(DefaultPackagesViewModel DePa, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                DePa.paqu_UsuarioModifica = Convert.ToInt32(HttpContext.User.FindFirst("User_Id").Value);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = await _saleServices.DefaultPackagesDelete(DePa, id, token);

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
            var transporte = (DefaultPackagesListViewModel)(await _saleServices.DefaultPackagesFind(id, token)).Data;
            ViewData["PackageFolder"] = $"DefaultPackage/DefaultPackage-{transporte.Id}/Place";
            return View(transporte);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

    }
}
