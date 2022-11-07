using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class HotelsMenuListViewModel
    {
        public int ID { get; set; }
        public string Hotel { get; set; }
        public string Tipo { get; set; }
        public string Menu { get; set; }
        public decimal? Precio { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
        public int PartnerID { get; set; }


    }
    public class HotelsMenuViewModel
    {
        public int HoMe_ID { get; set; }
        public string HoMe_Descripcion { get; set; }
        public decimal? HoMe_Precio { get; set; }
        public int? Hote_ID { get; set; }
        public int? Time_ID { get; set; }
        public int? HoMe_UsuarioCreacion { get; set; }      
        public int? HoMe_UsuarioModifica { get; set; }
        
      
    }
}
