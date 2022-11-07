using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class PermissionsViewModel
    {
        public int ID { get; set; }
        public string Icono { get; set; }
        public string Descripcion { get; set; }
        public string Controlador { get; set; }
        public string Action { get; set; }
        public int? id_modulo { get; set; }
        public string modulo { get; set; }
        public int ID_UsuaCrea { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_UsuaModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }
}
