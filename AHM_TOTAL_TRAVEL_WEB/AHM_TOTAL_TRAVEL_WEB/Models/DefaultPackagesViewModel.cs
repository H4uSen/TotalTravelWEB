using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class DefaultPackagesViewModel
    {
        public int paqu_ID { get; set; }
        public string paqu_Nombre { get; set; }
        public string paqu_Descripcion { get; set; }
        public string paqu_Duracion { get; set; }
        public int? hote_ID { get; set; }
        public int? rest_ID { get; set; }
        public int? paqu_UsuarioCreacion { get; set; }
        public int? paqu_UsuarioModifica { get; set; }
        public bool? paqu_Estado { get; set; }
        public decimal? paqu_Precio { get; set; }
    }
    public class DefaultPackagesListViewModel
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Descripcion_Paquete { get; set; }
        public string Duracion_Paquete { get; set; }
        public decimal? precio { get; set; }
        public int? Cantidad_de_personas { get; set; }
        public int ID_Hotel { get; set; }
        public string Hotel { get; set; }
        public string Descripcion_Hotel { get; set; }
        public int Ciudad_ID { get; set; }
        public string Ciudad { get; set; }
        public int? ID_Restaurante { get; set; }
        public string Restaurante { get; set; }
        public string Image_URL { get; set; }
        public int ID_Usuario_Creacion { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? ID_Usuario_Modifica { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifcia { get; set; }
        public bool? Estado { get; set; }
    }
}
