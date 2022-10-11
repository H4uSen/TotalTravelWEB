using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class TransportDetailsListViewModel
    {
        public int ID { get; set; }
        public string Transporte { get; set; }
        public DateTime Fecha { get; set; }
        public string Hora_Salida { get; set; }
        public string Hora_Llegada { get; set; }
        public int Capacidad { get; set; }
        public decimal? Precio { get; set; }
        public string Matricula { get; set; }
        public string Usuario_Creacion { get; set; }
        public DateTime? Fecha_Creacion { get; set; }
        public string Usuario_Modifica { get; set; }
        public DateTime? Fecha_Modifica { get; set; }
        public bool? Estado { get; set; }

    }

    public class TransportDetailsViewModel
    {
        public int Tprt_ID { get; set; }
        public int HoTr_ID { get; set; }
        public int Detr_Capacidad { get; set; }
        public decimal? DeTr_Precio { get; set; }
        public string DeTr_Matricula { get; set; }
        public string DeTr_UsuarioCreacion { get; set; }
        public string DeTr_UsuarioModifica { get; set; }

    }
}
