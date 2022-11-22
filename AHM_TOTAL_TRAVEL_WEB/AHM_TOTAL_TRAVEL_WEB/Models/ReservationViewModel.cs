﻿using AHM_TOTAL_TRAVEL_WEB.Controllers;
using Microsoft.VisualBasic;
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
        public int Resv_ID { get; set; }= 0;
        [DisplayName("Cliente")]
        public int? Usua_ID { get; set; }
        [DisplayName("Paquete")]
        public int? Paqu_ID { get; set; } = 0;
        [DisplayName("Paquete personalizado")]
        public bool? Resv_esPersonalizado { get; set; }
        [DisplayName("Cantidad de pagos")]
        public int? Resv_CantidadPagos { get; set; }
        [Required(ErrorMessage = "Ingrese una cantidad de personas")]
        public int? Resv_NumeroPersonas { get; set; } 
        [DefaultValue (false)]
        public bool? Resv_ConfirmacionPago { get; set; } = false;
        [DefaultValue(false)]
        public bool? Resv_ConfirmacionHotel { get; set; } = false;
        [DefaultValue(false)]
        public bool? Resv_ConfirmacionRestaurante { get; set; } = false;
        [DefaultValue(false)]
        public bool? Resv_ConfirmacionTrans { get; set; } = false;
        public bool CrearUsuario { get; set; } = false;
        public bool CrearPersonalizado { get; set; } = false;
        public decimal? Resv_Precio { get; set; }
        public int? Resv_UsuarioCreacion { get; set; } = 0;
        public int? Resv_UsuarioModifica { get; set; } = 0;
        public DateTime? ReHo_FechaEntrada { get; set; }
        public DateTime? ReHo_FechaSalida { get; set; }
        //public string Resv_FechaEntradaUnformatted { get; set; }
        //public string Resv_FechaSalidaUnformatted { get; set; }
        //public string Usua_DNI { get; set; }

        //Need this in order to make a reservation of a custom package
        public int? Hote_ID { get; set; }
        public List<ReservacionesActividadesExtras> ActividadesExtras { get; set; } = null;
        public List<ReservacionRestaurantes> Restaurantes { get; set; } = null;
        public List<ReservacionesActividadesHoteles> ActividadesHoteles { get; set; } = null;
        public List<ReservacionHabitaciones> Resv_Habitaciones { get; set; } = null;
        public int? TipoPago { get; set; }
        public int? Habi_ID { get; set; }
        public int? Habi_Cantidad { get; set; }

        //Need this to make the reservation of a transport
        public List<ReservationTransportationViewModel> reservacionTransportes { get; set; }

        public List<int> ID_HotelsActivities { get; set; }
        public List<int> ID_ExtrasActivities { get; set; }


        #region Crea las clases de las listas de arriba
        public class ReservacionesActividadesExtras
        {
            public int ReAE_ID { get; set; }
            public int? AcEx_ID { get; set; }
            public decimal ReAE_Precio { get; set; }
            public int? ReAE_Cantidad { get; set; }
            public DateTime? ReAE_FechaReservacion { get; set; }
            public string ReAE_HoraReservacion { get; set; }
        }
        public class ReservacionRestaurantes
        {
            public int ReRe_ID { get; set; }
            public int? Resv_ID { get; set; }
            public int? Rest_ID { get; set; }
            public DateTime? ReRe_FechaReservacion { get; set; }
            public string ReRe_HoraReservacion { get; set; }
        }
        public class ReservacionesActividadesHoteles
        {
            public int ReAH_ID { get; set; }
            public int? HoAc_ID { get; set; }
            public decimal? ReAH_Precio { get; set; }
            public int? ReAH_Cantidad { get; set; }
            public DateTime? ReAH_FechaReservacion { get; set; }
            public string ReAH_HoraReservacion { get; set; }
        }
        //public class ReservacionTransporte
        //{
        //    public int ReTr_ID { get; set; }
        //    public int? Detr_ID { get; set; }
        //    public int? ReTr_CantidadAsientos { get; set; }
        //    public bool? ReTr_Cancelado { get; set; }
        //    public DateTime? ReTr_FechaCancelado { get; set; }

        //    public ReservacionTransporte()
        //    {
        //        ReTr_Cancelado = false;
        //    }
        //}
        public class ReservacionHabitaciones
        {
            public int ReDe_ID { get; set; }
            public int Habi_ID { get; set; }
            public int Habi_Cantidad { get; set; }
        }
        #endregion
    }
    public class ReservationListViewModel
    {
        public int ID { get; set; }
        public int? NumeroPersonas { get; set; }
        public int? CantidadPagos { get; set; }
        public int? Id_Paquete { get; set; }
        public bool? EsPersonalizado { get; set; }
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

        public List<int> ID_HotelsActivities { get; set; } = null;
        public List<int> ID_ExtrasActivities { get; set; } = null;
    }

}
