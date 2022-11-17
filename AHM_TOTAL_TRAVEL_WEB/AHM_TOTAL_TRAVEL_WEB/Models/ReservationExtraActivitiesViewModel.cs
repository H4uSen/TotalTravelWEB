using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationExtraActivitiesViewModel
    {
        public int ReAE_ID { get; set; }
        public int? Resv_ID { get; set; }
        public int? AcEx_ID { get; set; }
        public int? ReAE_Cantidad { get; set; }
        public DateTime? ReAE_FechaReservacion { get; set; }
        public string ReAE_HoraReservacion { get; set; }
        public int? ReAE_UsuarioCreacion { get; set; }
        public DateTime? ReAE_FechaCreacion { get; set; }
        public int? ReAE_UsuarioModifica { get; set; }
        public DateTime? ReAE_FechaModifica { get; set; }
        public bool? ReAE_Estado { get; set; }
    }

    public class ReservationExtraActivitiesListViewModel
    {
        public int ID { get; set; }
        public int Reservacion { get; set; }
        public string Cliente { get; set; }
        public int Id_Actividad_Extra { get; set; }
        public string Actividad_Extra { get; set; }
        public int? Cantidad { get; set; }
        public DateTime? Fecha_Reservacion { get; set; }
        public string Hora_Reservacion { get; set; }
        public int? ID_Partner { get; set; }
        public string? Partner_Nombre { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }
    }
}
