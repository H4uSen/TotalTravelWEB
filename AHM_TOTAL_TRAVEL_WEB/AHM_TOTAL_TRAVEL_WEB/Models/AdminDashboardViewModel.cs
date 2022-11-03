using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class AdminDashboardViewModel
    {
        public List<HotelListViewModel> Hotel_Top_3 { get; set; }
        public List<ActivitiesListViewModel> Activities_top_5 { get; set; }
    }
}
