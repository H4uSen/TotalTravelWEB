using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class TypesTransportListViewModel
    {
        public int ID { get; set; }
        public string Trasporte { get; set; }
        public int? Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }
    }
    public class TypesTransportViewModel
    {
        public int TiTr_ID { get; set; }
        public string TiTr_Descripcion { get; set; }
        public int? TiTr_UsuarioCreacion { get; set; }
        public int? TiTr_UsuarioModifica { get; set; }
 
    }
}
