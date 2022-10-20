using System;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class PartnersViewModel
    {
        public int Part_ID { get; set; }
        public string Part_Nombre { get; set; }
        public string Part_Email { get; set; }
        public string Part_Telefono { get; set; }
        public int? TiPart_Id { get; set; }
        public int? Part_UsuarioCreacion { get; set; }
        public DateTime? Part_FechaCreacion { get; set; }
        public int? Part_UsuarioModifica { get; set; }
        public DateTime? Part_FechaModifica { get; set; }
        public bool? Part_Estado { get; set; }
        public string Part_Url { get; set; }
    }
    public class PartnersListViewModel
    {
        public int ID { get; set; }
        public string Image_Url { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
        public int TipoPartner_Id { get; set; }
        public string TipoPartner { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }
}
