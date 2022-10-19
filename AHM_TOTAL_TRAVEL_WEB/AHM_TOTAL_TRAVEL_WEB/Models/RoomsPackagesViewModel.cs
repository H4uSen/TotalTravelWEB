using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class RoomsPackagesViewModel
    {
        public int paqu_Id { get; set; }
        public int habi_Id { get; set; }
        public int paHa_UsuarioCreacion { get; set; }
        public int paHa_UsuarioModifica { get; set; }
    }

    public class RoomsPackagesListViewModel
    {
        public int ID { get; set; }
        public int? Paquete_Id { get; set; }
        public string Nombre_Hotel { get; set; }
        public string Hotel_Descripcion { get; set; }
        public int? Habitacion_Id { get; set; }
        public string Habitacion_Nombre { get; set; }
        public string Habitacion_Descripcion { get; set; }
        public int? Habitacion_Capacidad { get; set; }
        public decimal? Habitacion_Precio { get; set; }
        public int Categoria_Habitacion_Id { get; set; }
        public string Categoria_Habitacion { get; set; }
        public int? UsuarioCreacion_Id { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModifica_Id { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
    }
}
