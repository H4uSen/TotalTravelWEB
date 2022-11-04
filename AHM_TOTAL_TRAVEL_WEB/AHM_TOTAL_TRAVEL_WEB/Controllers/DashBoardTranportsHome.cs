using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Controllers
{
    public class DashBoardTranportsHome : Controller
    {
        
        public ActionResult Index()
        {
            return View();
        }
       
    }
}
