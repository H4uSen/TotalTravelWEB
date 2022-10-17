using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationViewModel
    {
        public int Resv_ID { get; set; }
        public int? Usua_ID { get; set; }
        public int? Paqu_ID { get; set; }
        public bool? Resv_esPersonalizado { get; set; }
        public int? Resv_CantidadPagos { get; set; }
        public int? Resv_NumeroPersonas { get; set; }
        public bool? Resv_ConfirmacionPago { get; set; }
        public bool? Resv_ConfirmacionHotel { get; set; }
        public bool? Resv_ConfirmacionRestaurante { get; set; }
        public bool? Resv_ConfirmacionTrans { get; set; }
        public decimal? Resv_Precio { get; set; }
        public int? Resv_UsuarioCreacion { get; set; }
        public DateTime? Resv_FechaCreacion { get; set; }
        public int? Resv_UsuarioModifica { get; set; }
        public DateTime? Resv_FechaModifica { get; set; }
        public bool? Resv_Estado { get; set; }
    }
    public class ReservationListViewModel
    {
        public int ID { get; set; }
        public int? NumeroPersonas { get; set; }
        public int? CantidadPagos { get; set; }
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
