using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class SuburbsViewModel
    {
        public int Colo_ID { get; set; }
        public string Colo_Descripcion { get; set; }
        public int? Ciud_ID { get; set; }
        public int? Colo_UsuarioCreacion { get; set; }
        public DateTime? Colo_FechaCreacion { get; set; }
        public int? Colo_UsuarioModifica { get; set; }
        public DateTime? Colo_FechaModifica { get; set; }
        public bool? Colo_Estado { get; set; }
    }

    public class SuburbsListViewModel
    {
        public int ID { get; set; }
        public string Colonia { get; set; }
        public int CiudadID { get; set; }
        public string Ciudad { get; set; }
        public int? Usuario_CreacionID { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? Usuario_ModificaID { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }
    }
}
