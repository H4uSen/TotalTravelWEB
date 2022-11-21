

namespace AHM_TOTAL_TRAVEL_WEB.Models
{
    public class ReportCreationModel
    {
        //Nombre del reporte
        public string ReportName { get; set; }
        //El nombre de la vista HTML que se va a mostrar en el reporte
        public string HTMLFile { get; set; }
        //El index de la lista que se llamara para asignar los datos de la tabla
        public int DataSourceIndex { get; set; }
        //Nombre del campo a filtrar
        public string FilterType { get; set; }
        //Valor por el que filtra el datasource
        public int FilterValue { get; set; } 


    }
}
