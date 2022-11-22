using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class RouteValuesModel
    {
        public string BackController { get; set; }
        public string BackAction { get; set; }
        public bool IsRedirect { get; set; } = false;
        public int responseID { get; set; } = 0;
        public string Divider { get; set; }
    }

}
