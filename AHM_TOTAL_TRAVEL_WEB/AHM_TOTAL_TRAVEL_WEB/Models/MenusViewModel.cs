using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class MenusListViewModel
    {
        public int ID { get; set; }
        public int ID_Restaurante { get; set; }
        public string Restaurante { get; set; }
        public int ID_TipoMenu { get; set; }
        public string TipoMenu { get; set; }
        public string Menu { get; set; }
        public string Descripcion { get; set; }
        public decimal? Precio { get; set; }
        public int ID_UsuarioCreacion { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? ID_UsuarioModifica { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
        public string Image_Url { get; set; }
    }

    public class MenusViewModel
    {
        public int Menu_ID { get; set; }
        public int? Time_ID { get; set; }
        public string Menu_Descripcion { get; set; }
        public string Menu_Nombre { get; set; }
        public decimal? Menu_Precio { get; set; }
        public int? Rest_ID { get; set; }
        public int? Menu_UsuarioCreacion { get; set; }
        public DateTime? Menu_FechaCreacion { get; set; }
        public int? Menu_UsuarioModifica { get; set; }
        public DateTime? Menu_FechaModifica { get; set; }
        public bool? Menu_Estado { get; set; }
        public string Menu_Url { get; set; }
    }
}
