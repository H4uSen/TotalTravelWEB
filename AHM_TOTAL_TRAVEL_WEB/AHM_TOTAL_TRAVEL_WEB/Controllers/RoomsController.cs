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

    public class RoomsController : Controller
    {
        HotelsService _hotelsServices;

        public RoomsController(HotelsService hotelsService)
        {
            _hotelsServices = hotelsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {

            var model = new List<RoomsListViewModel>();
            var list = await _hotelsServices.RoomsList(model);
            return View(list.Data);
        }

        [HttpGet]
        public async Task<IActionResult> Create()
        {
            var model = new List<HotelListViewModel>();
            string token = HttpContext.User.FindFirst("Token").Value;
            var Hotel = await _hotelsServices.HotelsList(token);
            IEnumerable<HotelListViewModel> data_Hotel = (IEnumerable<HotelListViewModel>)Hotel.Data;
            ViewBag.Hote_ID = new SelectList(data_Hotel, "ID", "Hotel");

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(RoomsViewModel habitacion)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                habitacion.Habi_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var list = await _hotelsServices.RoomsCreate(habitacion, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }


        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var item = new RoomsViewModel();
            IEnumerable<RoomsViewModel> model = null;
            var list = await _hotelsServices.RoomsList(null);
            IEnumerable<RoomsListViewModel> data = (IEnumerable<RoomsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];
            item.Hote_ID = element.ID;
            item.Habi_Nombre = element.Habitacion;
            item.Habi_Descripcion = element.Descripcion;
            //item.CaHa_ID = element.Categoria;
            item.Habi_Precio = element.Precio;
            item.Habi_balcon = element.Balcon;
            item.Habi_wifi = element.Wifi;
            item.Habi_camas = element.Camas;
            item.Habi_capacidad = element.Capacidad;
            //item.Habi_url = element.Image_Url;

            var rooms = await _hotelsServices.RoomsList(null);
            IEnumerable<RoomsListViewModel> data_rooms = (IEnumerable<RoomsListViewModel>)rooms.Data;
            ViewBag.Hote_ID = new SelectList(data_rooms, "ID", "Hotel", element.Hotel);


            return View(item);

        }

        [HttpPost]
        public async Task<IActionResult> Update(RoomsViewModel habitacion, int id)
        {

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                habitacion.Habi_UsuarioModifica = int.Parse(HttpContext.User.FindFirst("User_Id").Value);
                var lista = await _hotelsServices.RoomsUpdate(habitacion, id, token);
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }

        [HttpPost]
        public async Task<IActionResult> Delete(RoomsViewModel rooms, int id)
        {
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
        public async Task<IActionResult> Details(string id)
        {
            string token = HttpContext.User.FindFirst("Token").Value;
            var transporte = (RoomsListViewModel)(await _hotelsServices.RoomsFind(id, token)).Data;

            return View(transporte);
        }
    }
}