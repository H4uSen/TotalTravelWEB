using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationViewModel
    {
        
    }
    public class ReservationListViewModel
    {
        public int ID { get; set; }
        public int? NumeroPersonas { get; set; }
        public int? Id_Paquete { get; set; }
        public decimal? precio { get; set; }
        public int Id_Cliente { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string DNI { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public bool? ConfirmacionHotel { get; set; }
        public bool? ConfirmacionRestaurante { get; set; }
        public bool? ConfirmacionTransporte { get; set; }
        public bool? ConfirmacionPago { get; set; }
        public int? Id_UsuarioCrea { get; set; }
        public string UsuarioCrea { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? Id_UsuarioModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
    }

}
