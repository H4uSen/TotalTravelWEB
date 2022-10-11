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
        public string Partner { get; set; }
        public string Restaurante { get; set; }
        public string Direccion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }

    }

    public class RestaurantViewModel
    {
        public int Dire_ID  { get; set; }
        public string Rest_Nombre { get; set; }
        public string Part_ID { get; set; }
        public string Rest_UsuarioCreacion { get; set; }
        public string Rest_UsuarioModifica { get; set; }
        public List<IFormFile> File { get; set; }
    }
}
