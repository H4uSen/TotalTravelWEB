using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class RoomsViewModel
    {
        public int Habi_ID { get; set; }
        public string Habi_Nombre { get; set; }
        public string Habi_Descripcion { get; set; }
        public int? CaHa_ID { get; set; }
        public int? Hote_ID { get; set; }
        public decimal? Habi_Precio { get; set; }
        public int? Habi_UsuarioCreacion { get; set; }
        public DateTime? Habi_FechaCreacion { get; set; }
        public int? Habi_UsuarioModifica { get; set; }
        public DateTime? Habi_FechaModifica { get; set; }
        public bool? Habi_Estado { get; set; }
        public int? Habi_balcon { get; set; }
        public bool? Habi_wifi { get; set; }
        public bool? Habi_camas { get; set; }
        public int? Habi_capacidad { get; set; }
        public string Habi_url { get; set; }
    }

    public class RoomsListViewModel
    {
        public int ID { get; set; }
        public string Habitacion { get; set; }
        public string Descripcion { get; set; }
        public string Categoria { get; set; }
        public string Hotel { get; set; }
        public decimal? Precio { get; set; }
        public int? Balcon { get; set; }
        public bool? Wifi { get; set; }
        public bool? Camas { get; set; }
        public int? Capacidad { get; set; }
        public string ImageUrl { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }
}