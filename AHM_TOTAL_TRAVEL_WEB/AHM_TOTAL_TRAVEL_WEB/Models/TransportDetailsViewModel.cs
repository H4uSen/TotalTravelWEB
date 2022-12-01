using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class TransportDetailsListViewModel
    {
        public int ID { get; set; }
        public int ID_Transporte { get; set; }
        public string Nombre_Transporte { get; set; }
        public string Parter { get; set; }
        public int Tipo_Transporte_ID { get; set; }
        public string Tipo_Transporte { get; set; }
        public int Horario_ID { get; set; }
        public DateTime? Fecha_Salida { get; set; }
        public int DestinoDetalle_ID { get; set; }
        public int Partner_ID { get; set; }
        public int Ciudad_Salida_ID { get; set; }
        public string Ciudad_Salida { get; set; }
        public int Ciudad_Llegada_ID { get; set; }
        public string Ciudad_Llegada { get; set; }
        public string Hora_Salida { get; set; }
        public string Hora_Llegada { get; set; }
        public int? Capacidad { get; set; }
        public double? Precio { get; set; }
        public string Matricula { get; set; }
        public int Usuario_Creacion_ID { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public int? Usuario_Modifica_ID { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }

    }

    public class TransportDetailsViewModel
    {
        public int DeTr_ID { get; set; }
        public int? Tprt_ID { get; set; }
        public int? HoTr_ID { get; set; }
        public int? DeTr_Capacidad { get; set; }
        public double? DeTr_Precio { get; set; }
        public string DeTr_Matricula { get; set; }
        public int? DeTr_UsuarioCreacion { get; set; }
        public DateTime? DeTr_FechaCreacion { get; set; }
        public int? DeTr_UsuarioModifica { get; set; }
        public DateTime? DeTr_FechaModifica { get; set; }
        public bool? DeTr_Estado { get; set; }

    }
}
