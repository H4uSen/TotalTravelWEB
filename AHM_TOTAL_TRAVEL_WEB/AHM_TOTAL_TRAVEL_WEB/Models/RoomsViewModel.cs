using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class RoomsViewModel
    {
        public string Habi_Nombre { get; set; }
        public string Habi_Descripcion { get; set; }
        public int? CaHa_ID { get; set; }
        public int? Hote_ID { get; set; }
        public decimal? Habi_Precio { get; set; }
        public int? Habi_capacidad { get; set; }
        public byte? Habi_camas { get; set; }
        public byte? Habi_wifi { get; set; }
        public int? Habi_balcon { get; set; }
        public string Habi_url { get; set; }
        public int? Habi_UsuarioCreacion { get; set; }
        public int? Habi_UsuarioModifica { get; set; }

    }

    public class RoomsListViewModel
    {
        public int ID { get; set; }
        public string Habitacion { get; set; }
        public string Descripcion { get; set; }
        public int ID_Categoria { get; set; }
        public string Categoria { get; set; }
        public int ID_Hotel { get; set; }
        public string Hotel { get; set; }
        public decimal? Precio { get; set; }
        public string Image_Url { get; set; }
        public int ID_UsuaCrea { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_UsuaModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
        public int? Balcon { get; set; }
        public byte? Wifi { get; set; }
        public byte? Camas { get; set; }
        public int? Capacidad { get; set; }
        public string Urls { get; set; }
    }
}