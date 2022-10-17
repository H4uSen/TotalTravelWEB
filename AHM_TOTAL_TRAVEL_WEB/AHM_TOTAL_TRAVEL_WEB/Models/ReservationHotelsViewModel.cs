using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationHotelsViewModel
    {
        public int ReHo_ID { get; set; }
        public DateTime? ReHo_FechaEntrada { get; set; }
        public DateTime? ReHo_FechaSalida { get; set; }
        public int? Resv_ID { get; set; }
        public decimal? ReHo_PrecioTotal { get; set; }
        public int? ReHo_UsuarioCreacion { get; set; }
        public DateTime? ReHo_FechaCreacion { get; set; }
        public int? ReHo_UsuarioModifica { get; set; }
        public DateTime? ReHo_FechaModifica { get; set; }
        public bool? ReHo_Estado { get; set; }
    }

    public class ReservationHotelsListViewModel
    {
        public int ID { get; set; }
        public DateTime? Fecha_Entrada { get; set; }
        public DateTime? Fecha_Salida { get; set; }
        public int ReservacionID { get; set; }
        public int? UsuarioCreacionID { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificaID { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }
}
