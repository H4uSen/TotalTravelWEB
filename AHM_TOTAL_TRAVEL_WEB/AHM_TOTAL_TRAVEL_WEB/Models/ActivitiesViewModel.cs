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
        public int? TipoActividad { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }

    }

    public class ActivitiesViewModel
    {

    }
}
