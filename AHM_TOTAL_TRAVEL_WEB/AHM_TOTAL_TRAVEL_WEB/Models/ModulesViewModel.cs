using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ModulesViewModel
    {
        public int Modu_Id { get; set; }
        public string Modu_Descripcion { get; set; }
        public bool? Modu_Estado { get; set; }
        public int? Modu_UsuarioCreacion { get; set; }
        public DateTime? Modu_FechaCreacion { get; set; }
        public int? Modu_UsuarioModifica { get; set; }
        public DateTime? Modu_FechaModifica { get; set; }

    }

    public class ModulesListViewModel
    {
        public int id_modulo { get; set; }
        public string modulo { get; set; }
    }


}
