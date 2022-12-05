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
    public class CategoriesRoomsController : Controller
    {
        HotelsService _hotelsServices;

        public CategoriesRoomsController(HotelsService hotelsServices)
        {
            _hotelsServices = hotelsServices;
        }
        [HttpGet]
        public async Task<IActionResult> Index()
        {
            try { 

            var model = new List<categoryroomsViewModel>();
            var list = await _hotelsServices.CategoriesRoomsList();
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
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(categoryroomsViewModel categoria)
        {
            try { 

            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var id = HttpContext.User.FindFirst("User_Id").Value;
                categoria.CaHa_UsuarioCreacion = int.Parse(id);
                var list = await _hotelsServices.CategoriesRoomsCreate(categoria, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)list.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/CategoriesRooms?success=true");
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
        public async Task<IActionResult> Update(int id)
        {
            try { 
            var item = new categoryroomsViewModel();
            var list = await _hotelsServices.CategoriesRoomsList();
            IEnumerable<categoryroomsListViewModel> data = (IEnumerable<categoryroomsListViewModel>)list.Data;
            var element = data.Where(x => x.ID == id).ToList()[0];

            item.CaHa_ID = element.ID;
            item.CaHa_Descripcion = element.Descripcion;

            return View(item);
        }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
    }
}

        [HttpPost]
        public async Task<IActionResult> Update(categoryroomsViewModel categoria)
        {
            try {   
            if (ModelState.IsValid)
            {
                string token = HttpContext.User.FindFirst("Token").Value;
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                categoria.CaHa_UsuarioModifica = int.Parse(idd);
                var lista = await _hotelsServices.CategoriesRoomsUpdate(categoria, token);
                var l = ((AHM_TOTAL_TRAVEL_WEB.Models.RequestStatus)lista.Data).CodeStatus;
                if (l > 0)
                {
                    return Redirect("~/CategoriesRooms?success=true");
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
        public async Task<IActionResult> Delete(categoryroomsViewModel categoria, int id)
        {
            try { 
            if (ModelState.IsValid)
            {
                ServiceResult result = new ServiceResult();
                var idd = HttpContext.User.FindFirst("User_Id").Value;
                categoria.CaHa_UsuarioModifica = int.Parse(idd);

                string token = HttpContext.User.FindFirst("Token").Value;
                var list = (RequestStatus)(await _hotelsServices.CategoriesRoomsDelete(categoria, id, token)).Data;

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
            var categoria = (categoryroomsListViewModel)(await _hotelsServices.CategoriesRoomsFind(id, token)).Data;

            return View(categoria);
        }
            catch (Exception)
            {
                return RedirectToAction("Error", "Home");
    }
}
    }
}