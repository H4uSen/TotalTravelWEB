using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class RestrictionsViewModel
    {
    }

    public class RestrictionsListViewModel
    {
        public int ID { get; set; }
        public int ID_Rol { get; set; }
        public string Rol { get; set; }
        public int? id_modulo { get; set; }
        public string modulo { get; set; }
        public int ID_Permiso { get; set; }
        public string Permiso { get; set; }
        public string controlador { get; set; }
        public string accion { get; set; }
        public bool? esVisible { get; set; }
        public int ID_UsuaCrea { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
    }
}
