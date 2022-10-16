using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class RolListViewModel
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public int ID_UsuaCrea { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_UsuaModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }

    }

    public class RolViewModel
    {
        public int Role_ID { get; set; }
        public string Role_Descripcion { get; set; }
        public int? Role_UsuarioCreacion { get; set; }
        public DateTime? Role_FechaCreacion { get; set; }
        public int? Role_UsuarioModifica { get; set; }
        public DateTime? Role_FechaModifica { get; set; }
        public bool? Role_Estado { get; set; }


    }
}
