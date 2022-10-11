using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class TypesActivitiesViewModel
    {
        public int TiAc_ID { get; set; }
        public string TiAc_Descripcion { get; set; }
        public int? TiAc_UsuarioCreacion { get; set; }
        public DateTime? TiAc_FechaCreacion { get; set; }
        public int? TiAc_UsuarioModifica { get; set; }
        public DateTime? TiAc_FechaModifica { get; set; }
        public bool? TiAc_Estado { get; set; }
    }
    public class TypesActivitiesListViewModel
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCrea { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
    }
}
