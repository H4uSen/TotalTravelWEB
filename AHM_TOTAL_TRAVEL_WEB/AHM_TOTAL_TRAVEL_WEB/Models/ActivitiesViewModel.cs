using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ActivitiesListViewModel
    {
        public int ID { get; set; }
        public string Descripcion { get; set; }
        public int ID_TiAc { get; set; }
        public string Tipo { get; set; }
        public int? ID_Crea { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_Modifca { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }

    public class ActivitiesViewModel
    {
        public int Actv_ID { get; set; }
        public string actv_Descripcion { get; set; }
        public int? actv_UsuarioCreacion { get; set; }
        public int? actv_UsuarioModifica { get; set; }
        public int? tiAc_ID { get; set; }
        public bool? Actv_Estado { get; set; }
    }

    public class ActivitiesExtrasListViewModel
    {
        public int ID { get; set; }
        public string Partner { get; set; }
        public string Actividad { get; set; }
        public decimal? Precio { get; set; }
        public string Descripcion { get; set; }
        public int? ID_Crea { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_Modifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }



    }
    
    public class ActivitiesExtrasViewModel
    {
        public int? AcEx_ID { get; set; }
        public int? part_ID { get; set; }
        public int? actv_ID { get; set; }
        public decimal? acEx_Precio { get; set; }
        public string acEx_Descripcion { get; set; }
        public int? acEx_UsuarioCreacion { get; set; }
        public int? acEx_UsuarioModifica { get; set; }
        public IFormFile file { get; set; }
    }
}
