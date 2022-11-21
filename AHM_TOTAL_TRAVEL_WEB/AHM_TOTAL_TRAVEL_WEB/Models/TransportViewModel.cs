using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class TransportViewModel
    {
        public int Tprt_ID { get; set; }
        public int? TiTr_ID { get; set; }
        public int? Part_ID { get; set; }
        public int? Dire_ID { get; set; }
        public string Tprt_Nombre { get; set; }
        public int? Tprt_UsuarioCreacion { get; set; }
        public DateTime? Tprt_FechaCreacion { get; set; }
        public int? Tprt_UsuarioModifica { get; set; }
        public DateTime? Tprt_FechaModifica { get; set; }
        public bool? Tprt_Estado { get; set; }
    }

    public class TransportListViewModel
    {
        public int ID { get; set; }
        public int? TipoTransporteID { get; set; }
        public string Nombre { get; set; }
        public string TipoTransporte { get; set; }
        public int? PartnerID { get; set; }
        public string Partner_Nombre { get; set; }
        public string NombrePartner { get; set; }
        public string image_URL { get; set; }
        public int Ciudad_ID { get; set; }
        public string Ciudad { get; set; }
        public int? DireccionId { get; set; }
        public int ColoniaId { get; set; }
        public string Colonia { get; set; }
        public string Calle { get; set; }
        public string Avenida { get; set; }
        public int? UsuarioCreacionID { get; set; }
        public string UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificaID { get; set; }
        public string UsuarioModifica { get; set; }
        public DateTime? FechaModifica { get; set; }
        public bool? Estado { get; set; }
    }
    public class TransportListViewBag
    {
        public int ID { get; set; }
        public string Transportes { get; set; }
        
    }


}
