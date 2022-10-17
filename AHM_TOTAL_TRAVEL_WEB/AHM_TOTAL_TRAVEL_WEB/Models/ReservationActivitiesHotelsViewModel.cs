using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationActivitiesHotelsViewModel
    {
        public int ReAH_ID { get; set; }
        public int? Resv_ID { get; set; }
        public int? HoAc_ID { get; set; }
        public int? ReAH_Cantidad { get; set; }
        public DateTime? ReAH_FechaReservacion { get; set; }
        public string ReAH_HoraReservacion { get; set; }
        public int? ReAH_UsuarioCreacion { get; set; }
        public DateTime? ReAH_FechaCreacion { get; set; }
        public int? ReAH_UsuarioModifica { get; set; }
        public DateTime? ReAH_FechaModifica { get; set; }
        public bool? ReAH_Estado { get; set; }
    }

    public class ReservationActivitiesHotelsListViewModel
    {
        public int ID { get; set; }
        public int ReservacionID { get; set; }
        public int ID_Cliente { get; set; }
        public string Cliente { get; set; }
        public int ID_Actividad { get; set; }
        public string Actividad { get; set; }
        public int? Cantidad { get; set; }
        public DateTime? Fecha_Reservacion { get; set; }
        public string Hora_Reservacion { get; set; }
        public int ID_Usuario_Creacion { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? ID_Usuario_Modifica { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }
    }
}
