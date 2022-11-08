using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class HotelsActivitiesListViewModel
    {
        public int ID { get; set; }
        public string Actividad { get; set; }
        public string Descripcion { get; set; }
        public decimal? Precio { get; set; }
        public string HotelNombre { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }

        public string Image_Url { get; set; }
        public bool? Estado { get; set; }
        public int PartnerID { get; set; }

    }
    public class HotelsActivitiesViewModel
    {
        public int HoAc_ID { get; set; }
        public int? Actv_ID { get; set; }
        public string HoAc_Descripcion { get; set; }
        public decimal? HoAc_Precio { get; set; }
        public int? Hote_ID { get; set; }
        public int? HoAc_UsuarioCreacion { get; set; }     
        public int? HoAc_UsuarioModifica { get; set; }
        
    }
}
