using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReservationDetailsViewModel
    {
        public int ReDe_ID { get; set; }
        public int? Habi_ID { get; set; }
        public int? ReHo_ID { get; set; }
        public int? ReDe_UsuarioCreacion { get; set; }
        public DateTime? ReDe_FechaCreacion { get; set; }
        public int? ReDe_UsuarioModifica { get; set; }
        public DateTime? ReDe_FechaModifica { get; set; }
        public bool? ReDe_Estado { get; set; }
    }

    public class ReservationDetailsListViewModel
    {
        public int ID { get; set; }
        public int HabitacionID { get; set; }
        public string Nombre_Habitacion { get; set; }
        public string Descripcion_Habitacion { get; set; }
        public int CategoriaID { get; set; }
        public string Categoria_Habitacion { get; set; }
        public int HotelID { get; set; }
        public string Hotel { get; set; }
        public decimal? Precio_Habitacion { get; set; }
        public int ReservacionHotelID { get; set; }
        public DateTime? Fecha_Entrada { get; set; }
        public DateTime? Fecha_Salida { get; set; }
        public decimal? Precio_ReservacionHotel { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }
    }
}
