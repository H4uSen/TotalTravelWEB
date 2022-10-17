using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{


    public class TipeofpayViewModel
    {
        public int TiPa_ID { get; set; }
        public string? TiPa_Descripcion { get; set; }
        public int? TiPa_UsuarioCreacion { get; set; }
        public int? TiPa_UsuarioModifica { get; set; }

    }

    public class TipeofpayListViewModel
    {
        public int ID { get; set; }
        public string? Descripcion { get; set; }
        public int? UsuarioCreacionID { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificaID { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
       
    }
}

