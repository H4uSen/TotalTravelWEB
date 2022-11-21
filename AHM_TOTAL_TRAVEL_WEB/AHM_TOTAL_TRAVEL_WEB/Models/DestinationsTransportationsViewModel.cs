using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class DestinationsTransportationsViewModel
    {
        public int DsTr_ID { get; set; }
        public int? Partner_ID { get; set; }
        public int? DsTr_CiudadSalida { get; set; }
        public int? DsTr_CiudadDestino { get; set; }
        public int? DsTr_UsuarioCreacion { get; set; }
        public DateTime? DsTr_FechaCreacion { get; set; }
        public int? DsTr_UsuarioModifica { get; set; }
        public DateTime? DsTr_FechaModifica { get; set; }
        public bool? DsTr_Estado { get; set; }
    }

    public class DestinationsTransportationsListViewModel
    {
        public int ID { get; set; }
        public string CiudadSalida { get; set; }
        public int CiudadSalidaID { get; set; }
        public string CiudadDestino { get; set; }
        public int CiudadDestinoID { get; set; }
        public int? UsuarioCreacion { get; set; }
        public string UsuarioCreacionID { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModifica { get; set; }
        public string UsuarioModificaID { get; set; }
        public DateTime? FechaModifica { get; set; }
        public int? Partner_ID { get; set; }
        public string Partner_Nombre { get; set; }
        public bool? Estado { get; set; }

        public static explicit operator List<object>(DestinationsTransportationsListViewModel v)
        {
            throw new NotImplementedException();
        }
    }
}
