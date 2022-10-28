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
            string token = HttpContext.User.FindFirst("Token").Value;
            var model = new List<RoomsListViewModel>();
            var list = await _hotelsServices.RoomsList(token);
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

            var mode = new List<HotelListViewModel>();
            var categoria = await _hotelsServices.CategoriesRoomsList();
            IEnumerable<categoryroomsListViewModel> data_categoria = (IEnumerable<categoryroomsListViewModel>)categoria.Data;
            ViewBag.CaHa_ID = new SelectList(data_categoria, "ID", "Descripcion");


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


        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {

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
          

            var rooms = await _hotelsServices.HotelsList(token);
            IEnumerable<HotelListViewModel> data_rooms = (IEnumerable<HotelListViewModel>)rooms.Data;
            ViewBag.Hote_ID = new SelectList(data_rooms, "ID", "Hotel", element.HotelID);

          
            var mode = new List<HotelListViewModel>();
            var categoria = await _hotelsServices.CategoriesRoomsList();
            IEnumerable<categoryroomsListViewModel> data_categoria = (IEnumerable<categoryroomsListViewModel>)categoria.Data;
            ViewBag.CaHa_ID = new SelectList(data_categoria, "ID", "Descripcion", element.CategoriaHabitacionID);



            ViewData["RoomsFolder"] = $"Hotels/Hotel-{element.HotelID}/Rooms";
            ViewData["RoomFolder"] = $"Hotels/CaHa-{element.CategoriaHabitacionID}/Rooms";
           
         
            ViewData["ID_Update"] = element.HotelID;

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
            var rooms = (RoomsListViewModel)(await _hotelsServices.RoomsFind(id, token)).Data;

            return View(rooms);
        }
    }
}