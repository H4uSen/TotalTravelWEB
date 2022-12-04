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
        public decimal? Precio { get; set; }
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
        public int ID_Partner { get; set; }
        public string Partner { get; set; }
        public int CiudadID { get; set; }
        public string Ciudad { get; set; }
        public int ID_Actividad { get; set; }
        public string Actividad { get; set; }
        public decimal? Precio { get; set; }
        public string Descripcion { get; set; }
        public int? ID_Crea { get; set; }
        public string ImageURL { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_Modifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
        public int? ColoniaID { get; set; }
        public string Colonia { get; set; }
        public string Avenida { get; set; }
        public string Calle { get; set; }
        public int? DireccionID { get; set; }
        public int? TipoActividadID { get; set; }
        public string TipoActividad { get; set; }

        public string ddlItem => $"{Actividad} - L.{string.Format("{0:C2}", Precio)} ";

    }
    
    public class ActivitiesExtrasViewModel
    {
        public int AcEx_ID { get; set; }
        public int? Part_ID { get; set; }
        public int? Actv_ID { get; set; }
        public decimal? AcEx_Precio { get; set; }
        public string AcEx_Descripcion { get; set; }
        public int? AcEx_UsuarioCreacion { get; set; }
        public DateTime? AcEx_FechaCreacion { get; set; }
        public int? AcEx_UsuarioModifica { get; set; }
        public DateTime? AcEx_FechaModifica { get; set; }
        public bool? AcEx_Estado { get; set; }
        public string AcEx_Url { get; set; }
        public int? Dire_ID { get; set; }
        public IFormFile file { get; set; }
    }
}
