using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class CityListViewModel
    {
        public int ID { get; set; }
        public string Ciudad { get; set; }
        public string Pais { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCrea { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
    }

    public class CityViewModel
    {
        public int Ciud_ID { get; set; }
        public string ciud_Descripcion { get; set; }
        public int? pais_ID { get; set; }
        public int ciud_UsuarioCreacion { get; set; }
        public DateTime? Ciud_FechaCreacion { get; set; }
        public int ciud_UsuarioModifica { get; set; }
        public DateTime? Ciud_FechaModifica { get; set; }
        public bool? Ciud_Estado { get; set; }


    }

}
