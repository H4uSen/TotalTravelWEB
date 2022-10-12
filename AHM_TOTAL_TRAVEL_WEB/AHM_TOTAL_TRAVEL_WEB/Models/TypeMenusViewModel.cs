using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class TypeMenusViewModel
    {
        public int Time_ID { get; set; }
        public string Time_Descripcion { get; set; }
        public int? Time_UsuarioCreacion { get; set; }
        public DateTime? Time_FechaCreacion { get; set; }
        public int? Time_UsuarioModifica { get; set; }
        public DateTime? Time_FechaModifica { get; set; }
        public bool? Time_Estado { get; set; }
    }

    public class TypeMenusListViewModel
    {
        public int ID { get; set; }
        public string descripcion { get; set; }
        public int? Id_UsuarioCrea { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? Id_UsuarioModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
    }
}
