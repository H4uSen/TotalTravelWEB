using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class RestaurantListViewModel
    {
        public int ID { get; set; }
        public int ID_Partner { get; set; }
        public string Partner { get; set; }
        public string Restaurante { get; set; }
        public int CiudadID { get; set; }
        public string Ciudad { get; set; }
        public int ID_Direccion { get; set; }
        public int ID_Colonia { get; set; }
        public string Colonia { get; set; }
        public string Calle { get; set; }
        public string Avenida { get; set; }
        public int ID_UsuarioCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_UsuarioModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
        public string Image_URL { get; set; }


    }

    public class RestaurantViewModel
    {

        public int Rest_ID { get; set; }
        public int? Dire_ID { get; set; }
        public string Rest_Nombre { get; set; }
        public int? Part_ID { get; set; }
        public int? Rest_UsuarioCreacion { get; set; }
        public DateTime? Rest_FechaCreacion { get; set; }
        public int? Rest_UsuarioModifica { get; set; }
        public DateTime? Rest_FechaModifica { get; set; }
        public bool? Rest_Estado { get; set; }
        public string Rest_Url { get; set; }
    }
}
