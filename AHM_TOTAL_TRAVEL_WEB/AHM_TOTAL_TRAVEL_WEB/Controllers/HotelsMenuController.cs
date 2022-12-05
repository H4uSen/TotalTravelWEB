using AHM_TOTAL_TRAVEL_WEB.Models;
using AHM_TOTAL_TRAVEL_WEB.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class HotelsMenuController : Controller
    {
        private readonly HotelsService _hotelService;
        private readonly RestaurantService _restaurantServices;

        public HotelsMenuController(HotelsService hotelService, RestaurantService restaurantServices)
        {
            _hotelService = hotelService;
            _restaurantServices = restaurantServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try {
                var id = HttpContext.Session.GetInt32("PartnerID");
                var rol = HttpContext.Session.GetString("Role");
                string token = HttpContext.User.FindFirst("Token").Value;
                var type = await _hotelService.HotelsList(token);

                var hotel = await _hotelService.HotelsList(token);
                IEnumerable<HotelListViewModel> data_hotel = (IEnumerable<HotelListViewModel>)hotel.Data;
                ViewBag.hote_ID = new SelectList(data_hotel, "ID", "Hotel");

                var type2 = await _restaurantServices.TypeMenusList();
                IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
                ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");

                var model = new List<HotelsMenuListViewModel>();
                var list = await _hotelService.HotelsMenuList(token);
                IEnumerable<HotelsMenuListViewModel> lista = (IEnumerable<HotelsMenuListViewModel>)list.Data;

                if (string.IsNullOrEmpty(id.ToString()))
                {
                    return View(lista);
                }
                else
                {
                    if (rol == "Cliente" || rol == "Administrador")
                    {
                        return View(lista);
                    }

                    else
                    {
                        var list2 = lista.Where(c => c.PartnerID == Convert.ToInt32(id)).ToList();
                        return View(list2);
                    }

                }

            }
            catch
            {
                return RedirectToAction("LogOut", "Access");
            }
        }


        [HttpGet]
        public async Task<IActionResult> Create()
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.Session.GetInt32("PartnerID");
                var model = new List<HotelListViewModel>();

                var Hotel = await _hotelService.HotelsList(token);
                IEnumerable<HotelListViewModel> data_Hotel = (IEnumerable<HotelListViewModel>)Hotel.Data;

                var list2 = data_Hotel.Where(c => c.ID_Partner == Convert.ToInt32(idd)).ToList();
                ViewBag.Hote_ID = new SelectList(list2, "ID", "Hotel");


                var type2 = await _restaurantServices.TypeMenusList();
                IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
                ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");

                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)type2.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/HotelsMenu?success=true");
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
        public async Task<IActionResult> Create(HotelsMenuViewModel actividad)
        {
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                actividad.HoMe_UsuarioCreacion = 1;
                RequestStatus response = (RequestStatus)(await _hotelService.HotelsMenuCreate(actividad, token)).Data;
                if (response.CodeStatus != 0)
                {
                    return RedirectToAction("Index");
                }
                else
                {

                    ViewData["Error"] = response.MessageStatus;
                    IEnumerable<HotelListViewModel> model = null;
                    var type = await _hotelService.HotelsList(token);
                    IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
                    ViewBag.Hote_ID = new SelectList(data_type, "ID", "Descripcion");

                    var type2 = await _restaurantServices.TypeMenusList();
                    IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
                    ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");
                    return View();
                };
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
                var item = new HotelsMenuViewModel();
                IEnumerable<HotelsMenuListViewModel> model = null;
                var list = await _hotelService.HotelsMenuList(token);
                IEnumerable<HotelsMenuListViewModel> data = (IEnumerable<HotelsMenuListViewModel>)list.Data;
                var element = data.Where(x => x.ID == id).ToList()[0];
                item.HoMe_Descripcion = element.Menu;
                item.HoMe_Precio = element.Precio;


                IEnumerable<HotelListViewModel> model2 = null;
                var type = await _hotelService.HotelsList(token);
                IEnumerable<HotelListViewModel> data_type = (IEnumerable<HotelListViewModel>)type.Data;
                ViewBag.Hote_ID = new SelectList(data_type, "ID", "Descripcion");

                var type2 = await _restaurantServices.TypeMenusList();
                IEnumerable<TypeMenusListViewModel> data_type2 = (IEnumerable<TypeMenusListViewModel>)type2.Data;
                ViewBag.Time_ID = new SelectList(data_type2, "ID", "descripcion");

                return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }

        }

        [HttpPost]
        public async Task<IActionResult> Update(HotelsMenuViewModel actividad, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    string token = HttpContext.User.FindFirst("Token").Value;
                    actividad.HoMe_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                    var lista = await _hotelService.HotelsMenuUpdate(actividad, id, token);
                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)lista.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/HotelsMenu?success=true");
                    }
                    else
                    {
                        return View();
                    }
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
        public async Task<IActionResult> Delete(HotelsMenuViewModel actividad, int id)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    actividad.HoMe_UsuarioModifica = 1;

                    string token = HttpContext.User.FindFirst("Token").Value;
                    var list = await _hotelService.HotelsMenuDelete(actividad, id, token);

                    var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                    if (l > 0)
                    {
                        return Redirect("~/HotelsMenu?success=true");
                    }
                    else
                    {
                        return View();
                    }
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
            try
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var detalle = (HotelsMenuListViewModel)(await _hotelService.HotelsMenuFind(id, token)).Data;
                return View(detalle);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}
