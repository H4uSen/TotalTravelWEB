using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class DefaultPackagesDetailsListViewModel
    {
        public int ID { get; set; }
        public int PaqueteID { get; set; }
        public string NombrePaquete { get; set; }
        public string DescripcionPaquete { get; set; }
        public string DuracionPaquete { get; set; }
        public int ActividadID { get; set; }
        public string DescripcionActividad { get; set; }
        public int? UsuarioCreacionID { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificaID { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }

    }
    public class DefaultPackagesDetailsViewModel
    {
        public int PaDe_ID { get; set; }
        public int? Paqu_ID { get; set; }
        public int? Actv_ID { get; set; }
        public int? PaDe_UsuarioCreacion { get; set; }
        public DateTime? PaDe_FechaCreacion { get; set; }
        public int? PaDe_UsuarioModifica { get; set; }
        public DateTime? PaDe_FechaModifica { get; set; }
        public bool? PaDe_Estado { get; set; }

    }
}
