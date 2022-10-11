using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class DefaultPackagesViewModel
    {
        public int Paqu_ID { get; set; }
        public string Paqu_Nombre { get; set; }
        public string Paqu_Descripcion { get; set; }
        public string Paqu_Duracion { get; set; }
        public int? Hote_ID { get; set; }
        public int? Rest_ID { get; set; }
        public int? Paqu_UsuarioCreacion { get; set; }
        public DateTime? Paqu_FechaCreacion { get; set; }
        public int? Paqu_UsuarioModifica { get; set; }
        public DateTime? Paqu_FechaModifica { get; set; }
        public bool? Paqu_Estado { get; set; }
    }
    public class DefaultPackagesListViewModel
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion_Paquete { get; set; }
        public string Duracion_Paquete { get; set; }
        public string Hotel { get; set; }
        public string Descripcion_Hotel { get; set; }
        public string Restaurante { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifcia { get; set; }
        public bool? Estado { get; set; }
    }
}
