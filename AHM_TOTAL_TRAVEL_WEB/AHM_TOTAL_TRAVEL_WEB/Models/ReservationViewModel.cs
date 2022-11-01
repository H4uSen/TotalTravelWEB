using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationViewModel
    {

        [DisplayName("ID")]
        public int Resv_ID { get; set; }
        [DisplayName("Cliente")]
        public int? Usua_ID { get; set; }
        [DisplayName("Paquete")]
        public int? Paqu_ID { get; set; }
        [DisplayName("Paquete personalizado")]
        public bool? Resv_esPersonalizado { get; set; }
        [DisplayName("Cantidad de pagos")]
        public int? Resv_CantidadPagos { get; set; }
        [Required(ErrorMessage = "Ingrese una cantidad de personas")]
        public int? Resv_NumeroPersonas { get; set; }
        public bool? Resv_ConfirmacionPago { get; set; }
        public bool? Resv_ConfirmacionHotel { get; set; }
        public bool? Resv_ConfirmacionRestaurante { get; set; }
        public bool? Resv_ConfirmacionTrans { get; set; }
        public decimal? Resv_Precio { get; set; }
        public int? Resv_UsuarioCreacion { get; set; }


        public string Usua_DNI { get; set; }
        public List<ActivitiesListViewModel> Activities { get; set; }
        
        public List<ActivitiesExtrasListViewModel> ActivitiesExtra { get; set; }
        
        public List<HotelListViewModel> Hotels { get; set; }
        
        public List<RestaurantListViewModel> Restaurants { get; set; }
        
        public List<TransportListViewModel> Transports { get; set; }
        
        public List<DefaultPackagesListViewModel> DefaultPackages { get; set; }
    }
    public class ReservationListViewModel
    {
        public int ID { get; set; }
        public int? NumeroPersonas { get; set; }
        public int? CantidadPagos { get; set; }
        public int? Id_Paquete { get; set; }
        public string DescripcionPaquete { get; set; }
        public string DurecionPaquete { get; set; }
        public decimal? precio { get; set; }
        public int ReservacionHotelID { get; set; }
        public DateTime? Fecha_Entrada { get; set; }
        public DateTime? Fecha_Salida { get; set; }
        public int Hotel_ID { get; set; }
        public string Nombre_Hotel { get; set; }
        public string Habitacion { get; set; }
        public string Categoria_Habitacion { get; set; }
        public int? Camas { get; set; }
        public int Id_Cliente { get; set; }
        public string Nombre { get; set; }
        public string Apellido { get; set; }
        public string Nombrecompleto { get; set; }
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
        public string NombreCompleto { get; set; }
    }

}
