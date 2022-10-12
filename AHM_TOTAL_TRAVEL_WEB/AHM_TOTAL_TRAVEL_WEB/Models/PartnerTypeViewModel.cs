using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class PartnerTypeListViewModel
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public int Rol_ID { get; set; }
        public string Rol_Descripcion { get; set; }
        public int Usuario_Creacion_Id { get; set; }
        public string Usuario_Creacion_Nombre { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }

    }

    public class PartnerTypeViewModel
    {
        public int TiPar_ID { get; set; }
        public string TiPar_Descripcion { get; set; }
        public int Rol_ID { get; set; }
        public int TiPar_UsuarioCreacion { get; set; }
       
    }
}
