﻿using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
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
        [DefaultValue (false)]
        public bool? Resv_ConfirmacionPago { get; set; }
        [DefaultValue(false)]
        public bool? Resv_ConfirmacionHotel { get; set; }
        [DefaultValue(false)]
        public bool? Resv_ConfirmacionRestaurante { get; set; }
        [DefaultValue(false)]
        public bool? Resv_ConfirmacionTrans { get; set; }
        public decimal? Resv_Precio { get; set; }
        public int? Resv_UsuarioCreacion { get; set; }

        public DateTime? ReHo_FechaEntrada { get; set; }
        public DateTime? ReHo_FechaSalida { get; set; }
        public string Resv_FechaEntradaUnformatted { get; set; }
        public string Resv_FechaSalidaUnformatted { get; set; }
        public string Usua_DNI { get; set; }
        



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
        public int? Hotel_ID { get; set; }
        public string Nombre_Hotel { get; set; }
        public int? PartnerID { get; set; }
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
        [JsonIgnore]
        public int AmountOfPayments { get; set; }
    }

}
