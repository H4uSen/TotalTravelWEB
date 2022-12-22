using AHM_TOTAL_TRAVEL_WEB.Models;
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
    public class RoomsController : Controller
    {
        HotelsService _hotelsServices;

        public RoomsController(HotelsService hotelsService)
        {
            _hotelsServices = hotelsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index(RouteValuesModel routeValues)
        {
            try
            {


                var id = HttpContext.Session.GetInt32("PartnerID");
                var rol = HttpContext.Session.GetString("Role");
                string token = HttpContext.User.FindFirst("Token").Value;
                var model = new List<RoomsListViewModel>();
                var list = await _hotelsServices.RoomsList(token);
                IEnumerable<RoomsListViewModel> lista = (IEnumerable<RoomsListViewModel>)list.Data;

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
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpGet]
        public async Task<IActionResult> Create(RouteValuesModel routeValues)
        {
            try { 
            var id = HttpContext.Session.GetInt32("PartnerID");
            var rol = HttpContext.Session.GetString("Role");
            var model = new List<HotelListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;

            var Hotel = await _hotelsServices.HotelsList(token);
            IEnumerable<HotelListViewModel> data_Hotel = (IEnumerable<HotelListViewModel>)Hotel.Data;

            if (rol == "Cliente" || rol == "Administrador")
            {
                ViewBag.Hote_ID = new SelectList(data_Hotel, "ID", "Hotel");
            }

            else
            {
                var list = data_Hotel.Where(c => c.ID_Partner == Convert.ToInt32(id)).ToList();
                ViewBag.Hote_ID = new SelectList(list, "ID", "Hotel");
            }
            

            var mode = new List<HotelListViewModel>();
            var categoria = await _hotelsServices.CategoriesRoomsList();
            IEnumerable<categoryroomsListViewModel> data_categoria = (IEnumerable<categoryroomsListViewModel>)categoria.Data;
            ViewBag.CaHa_ID = new SelectList(data_categoria, "ID", "Descripcion");


            return View();
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        public object Delete(int v)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoomsViewModel habitacion)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                habitacion.Habi_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _hotelsServices.RoomsCreate(habitacion, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/Rooms?success=true");
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


        [HttpGet]
        public async Task<IActionResult> Update(int id, RouteValuesModel routeValues)
        {
            try { 
            var idd = HttpContext.Session.GetInt32("PartnerID");
            var item = new RoomsListViewModel();
            string token = HttpContext.User.FindFirst("Token").Value;
            var list = await _hotelsServices.RoomsList(token);
            IEnumerable<RoomsListViewModel> data = (IEnumerable<RoomsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.ID = element.ID;
            item.Hotel = element.Hotel;
            item.Habitacion = element.Habitacion;
            item.Descripcion = element.Descripcion;
            item.CategoriaHabitacionID = element.CategoriaHabitacionID;
            item.HotelID = element.HotelID;
            item.Precio = element.Precio;
            item.Balcon = element.Balcon;
            item.Wifi = element.Wifi;
            item.Camas = element.Camas;
            item.Capacidad = element.Capacidad;

            
            var Hotel = await _hotelsServices.HotelsList(token);
            IEnumerable<HotelListViewModel> data_Hotel = (IEnumerable<HotelListViewModel>)Hotel.Data;

            var list2 = data_Hotel.Where(c => c.ID_Partner == Convert.ToInt32(idd)).ToList();
            ViewBag.Hote_ID = new SelectList(data_Hotel, "ID", "Hotel", element.HotelID);


            var mode = new List<HotelListViewModel>();
            var categoria = await _hotelsServices.CategoriesRoomsList();
            IEnumerable<categoryroomsListViewModel> data_categoria = (IEnumerable<categoryroomsListViewModel>)categoria.Data;
            ViewBag.CaHa_ID = new SelectList(data_categoria, "ID", "Descripcion", element.CategoriaHabitacionID);



            ViewData["RoomsFolder"] = $"Hotel/Hotel-{element.HotelID}/Place/Hotel_Room-{element.HotelID}";
            ViewData["RoomFolder"] = $"Hotels/CaHa-{element.CategoriaHabitacionID}/Rooms";
            ViewData["RoomsID"] = element.ID;


            ViewData["ID_Update"] = element.HotelID;

            return View(item);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Update(RoomsViewModel habitacion, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                habitacion.Habi_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _hotelsServices.RoomsUpdate(habitacion, id, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)lista.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/ReservationTransportation?success=true");
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
        public async Task<IActionResult> Delete(RoomsViewModel rooms, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                rooms.Habi_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _hotelsServices.RoomsDelete(rooms, id, token)).Data;

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
            var rooms = (RoomsListViewModel)(await _hotelsServices.RoomsFind(id, token)).Data;
            if (!rooms.Equals(null))
            {
                ViewData["RoomsFolder"] = $"Hotel/Hotel-{rooms.HotelID}/Place/Hotel_Room-{rooms.HotelID}";
                ViewData["HotelID"] = id;
            }
            
            return View(rooms);
            }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
            }
        }
    }
}