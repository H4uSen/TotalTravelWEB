using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class HotelViewModel
    {
        public int Hote_ID { get; set; }
        public string Hote_Nombre { get; set; }
        public string Hote_Descripcion { get; set; }
        public int? Dire_ID { get; set; }
        public int? Part_ID { get; set; }
        public int? Hote_UsuarioCreacion { get; set; }
        public DateTime? Hote_FechaCreacion { get; set; }
        public int? Hote_UsuarioModifica { get; set; }
        public DateTime? Hote_FechaModifica { get; set; }
        public bool? Hote_Estado { get; set; }
        public string Hote_Url { get; set; }
    }

    public class HotelListViewModel
    {
        public int ID { get; set; }
        public string Hotel { get; set; }
        public string Descripcion { get; set; }
        public int CiudadID { get; set; }
        public string Ciudad { get; set; }
        public int ID_Direc { get; set; }
        public int ColoniaID { get; set; }
        public string Colonia { get; set; }
        public string Calle { get; set; }
        public string Avenida { get; set; }
        public int? ID_Partner { get; set; }
        public string Partners { get; set; }
        public string Image_URL { get; set; }
        public int ID_UsuaCrea { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_UsuaModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }
}
