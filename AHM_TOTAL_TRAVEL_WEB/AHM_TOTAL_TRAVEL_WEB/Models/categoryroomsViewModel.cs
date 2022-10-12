using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class categoryroomsViewModel
    {
        public int CaHa_ID { get; set; }
        public string? CaHa_Descripcion { get; set; }
        public int? CaHa_UsuarioCreacion { get; set; }
        public DateTime? CaHa_FechaCreacion { get; set; }
        public int? CaHa_UsuarioModifica { get; set; }
        public DateTime? CaHa_FechaModifica { get; set; }
        public bool? CaHa_Estado { get; set; }

    }

    public class categoryroomsListViewModel
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
        public int CaHa_FechaCreacio { get; internal set; }
    }
}
