using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ScheduleTransportationListViewModel
    {
        public int ID { get; set; }
        public string Ciudad_Salida { get; set; }
        public string Ciudad_Destino { get; set; }
        public DateTime? Fecha { get; set; }
        public string Hora_Salida { get; set; }
        public string Hora_Llegada { get; set; }
        public int? Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }

    }
}
