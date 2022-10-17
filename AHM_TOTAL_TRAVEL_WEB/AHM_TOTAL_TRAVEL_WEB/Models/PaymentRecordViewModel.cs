using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class PaymentRecordListViewModel
    {
        public int ID { get; set; }
        public decimal? MontoPago { get; set; }
        public DateTime? fechaPago { get; set; }
        public int Id_TipoPago { get; set; }
        public string TipoPago { get; set; }
        public int Id_Reservacion { get; set; }
        public int? Id_Paquete { get; set; }
        public int Id_Cliente { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string DNI { get; set; }
        public string Telefono { get; set; }
        public int? Id_UsuarioCrea { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? Id_UsuarioModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
    }
    public class PaymentRecordViewModel
    {
        public int RePa_ID { get; set; }
        public int? Resv_ID { get; set; }
        public int? TiPa_ID { get; set; }
        public decimal? RePa_Monto { get; set; }
        public DateTime? RePa_FechaPago { get; set; }
        public int? RePa_UsuarioCreacion { get; set; }
        public DateTime? RePa_FechaCreacion { get; set; }
        public int? RePa_UsuarioModifica { get; set; }
        public DateTime? RePa_FechaModifica { get; set; }
        public bool? RePa_Estado { get; set; }

    }
}
