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
        public int ID { get; set; }
        public string Actv_Descripcion { get; set; }
        public int? TiAc_ID { get; set; }
        public int? Actv_UsuarioCreacion { get; set; }
        public int? Actv_UsuarioModifica { get; set; }
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

    }public class ActivitiesExtrasViewModel
    {
        public int? Part_ID { get; set; }
        public int? Actv_ID { get; set; }
        public decimal? AcEx_Precio { get; set; }
        public string AcEx_Descripcion { get; set; }
        public int? AcEx_UsuarioCreacion { get; set; }
        public int? AcEx_UsuarioModifica { get; set; }
        public IFormFile File { get; set; }
    }
}
