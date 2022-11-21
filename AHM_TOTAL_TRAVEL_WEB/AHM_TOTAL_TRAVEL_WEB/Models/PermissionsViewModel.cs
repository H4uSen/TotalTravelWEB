using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ScreenPermissionsViewModel
    {
        public IEnumerable<PermissionsListViewModel> Permisos;
        public IEnumerable<ModulesListViewModel> Modulos;
    }

    public class PermissionsListViewModel
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

    public class PermissionsViewModel
    {
        public int Perm_ID { get; set; }
        public string Perm_Icono { get; set; }
        public string Perm_Descripcion { get; set; }
        public string Perm_Controlador { get; set; }
        public string Perm_Action { get; set; }
        public int? Modu_ID { get; set; }
        public bool? Perm_esVisible { get; set; }
        public int? Perm_UsuarioCreacion { get; set; }
        public DateTime? Perm_FechaCreacion { get; set; }
        public int? Perm_UsuarioModifica { get; set; }
        public DateTime? Perm_FechaModifica { get; set; }
        public bool? Perm_Estado { get; set; }
    }

}
