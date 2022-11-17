using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationRestaurantsViewModel
    {
      
            public int ReRe_ID { get; set; }
            public int? Resv_ID { get; set; }
            public int? Rest_ID { get; set; }
            public DateTime? ReRe_FechaReservacion { get; set; }
            public string ReRe_HoraReservacion { get; set; }
            public int? ReRe_UsuarioCreacion { get; set; }
            public DateTime? ReRe_FechaCreacion { get; set; }
            public int? ReRe_UsuarioModifica { get; set; }
            public DateTime? ReRe_FechaModifica { get; set; }
            public bool? ReRe_Estado { get; set; }
        }

        public class ReservationRestaurantsListViewModel
    {
        public int Id { get; set; }
        public int Resv_ID { get; set; }
        public string Cliente { get; set; }
        public int ID_Restaurante { get; set; }
        public string Restaurante { get; set; }
        public int? ID_Parter { get; set; }
        public string? Partner_Nombre { get; set; }
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
