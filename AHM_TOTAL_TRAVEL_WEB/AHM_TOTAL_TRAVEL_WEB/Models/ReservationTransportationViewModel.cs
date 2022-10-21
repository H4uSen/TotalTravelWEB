using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationTransportationViewModel
    {
        public int ReTr_ID { get; set; }
        public int? Detr_ID { get; set; }
        public int? Resv_ID { get; set; }
        public int? ReTr_CantidadAsientos { get; set; }
        public bool? ReTr_Cancelado { get; set; }
        public DateTime? ReTr_FechaCancelado { get; set; }
        public int? ReTr_UsuarioCreacion { get; set; }
        public DateTime? ReTr_FechaCreacion { get; set; }
        public int? ReTr_UsuarioModifica { get; set; }
        public DateTime? ReTr_FechaModifica { get; set; }
        public bool? ReTr_Estado { get; set; }
    }

    public class ReservationTransportationListViewModel
    {
        public int Id { get; set; }
        public int Reservacion { get; set; }
        public string Cliente { get; set; }
        public int? Asientos { get; set; }
        public bool? Cancelado { get; set; }
        public DateTime? Fecha_Cancelado { get; set; }
        public int ID_detalle_Transporte { get; set; }
        public string Tipo_Transporte { get; set; }
        public int? Capacidad { get; set; }
        public decimal? Precio { get; set; }
        public int ID_Usuario_Creacion { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? ID_Usuario_Modifica { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }

    }
}
