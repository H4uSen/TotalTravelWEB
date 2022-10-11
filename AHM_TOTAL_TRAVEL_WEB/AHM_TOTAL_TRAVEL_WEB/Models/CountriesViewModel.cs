using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class CountriesViewModel
    {
        public int Pais_ID { get; set; }
        public string Pais_Codigo { get; set; }
        public string Pais_Descripcion { get; set; }
        public string Pais_Nacionalidad { get; set; }
        public int? Pais_UsuarioCreacion { get; set; }
        public DateTime? Pais_FechaCreacion { get; set; }
        public int? Pais_UsuarioModifica { get; set; }
        public DateTime? Pais_FechaModifica { get; set; }
        public bool? Pais_Estado { get; set; }
    }
    public class CountriesListViewModel
    {
        public int ID { get; set; }
        public string Codigo { get; set; }
        public string Pais { get; set; }
        public string Nacionalidad { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }
}
