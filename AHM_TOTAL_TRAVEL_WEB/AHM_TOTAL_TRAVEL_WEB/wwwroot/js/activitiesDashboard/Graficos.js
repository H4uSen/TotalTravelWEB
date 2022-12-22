var Actividades = ajaxRequest(urlAPI + "/API/Activities/List");
var ActividadesExtra = ajaxRequest(urlAPI + "/API/ActivitiesExtra/List");
var ActividadesHotel = ajaxRequest(urlAPI + "/API/HotelsActivities/List");
var ReservationActividadesExtra = ajaxRequest(urlAPI + "/API/ReservationActivitiesExtra/List");
var ReservacionActividades = ajaxRequest(urlAPI + "/API/ReservationActivitiesHotels/List");

$("document").ready(function () {
    GraficoPastelActividadesExtras();
    GraficoPastelActividades();
})

function GraficoPastelActividades() {
    var ActividadList = ActividadesHotel.data;
    var arrayActividad = [];
    //var ActividadFiltro = ActividadList.filter(act => act.ID == parseInt(ID));
    for (var i = 0; i < ActividadList.length; i++) {
        const item = ActividadList[i];
        var objeto = {
            name: item.descripcion,
            y: 0,
            idd: item.id
        }
        arrayActividad.push(objeto);
    }
    var ResvHotelActv = ReservacionActividades.data;

    for (var i = 0; i < arrayActividad.length; i++) {
        const item = arrayActividad[i];
        var ResevHotActv = ResvHotelActv.filter(resva => resva.iD_Actividad == item.idd);
        item.y = ResevHotActv.length;
    }

    Highcharts.chart('container', {
        lang: {
            viewFullscreen: "Ver en pantalla completa",
            printChart: "Imprimir grafico",
            downloadPNG: "Descargar PNG",
            downloadJPEG: "Descargar JPEG",
            downloadPDF: "Descargar PDF",
            downloadSVG: "Descargar SVG",
            downloadCSV: "Excel Tabla CSV",
            downloadXLS: "Excel Tabla XLS",
            viewData: "Ver tabla",
            hideData: "Esconder tabla",
            exitFullscreen: "Salir de pantalla completa",
            exportData: {
                categoryHeader: "Actividades de Hoteles"
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 10,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Actividades de hoteles mas reservadas'
        },
        exporting: {
            showTable: true,
            buttons: {
                contextButton: {
                    menuItems: ["viewFullscreen", "separator", "downloadXLS", "downloadCSV", "separator", "viewData"]
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}% = {point.y:.1f}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Cantidad',
            colorByPoint: true,
            data: arrayActividad
        }]
    });
}

function GraficoPastelActividadesExtras() {
    var ActividadExtraList = ActividadesExtra.data;
    var arrayActividadExtra = [];
    //var ActividadFiltro = ActividadList.filter(act => act.ID == parseInt(ID));
    for (var i = 0; i < ActividadExtraList.length; i++) {
        const item = ActividadExtraList[i];
        var objeto = {
            name: item.actividad,
            y: 0,
            idd: item.id
        }
        arrayActividadExtra.push(objeto);
    }

    var ResvExtraActv = ReservationActividadesExtra.data;

    for (var i = 0; i < arrayActividadExtra.length; i++) {
        const item = arrayActividadExtra[i];
        var ResevExActv = ResvExtraActv.filter(resva => resva.iD_Actividad == item.idd);
        item.y = ResevExActv.length;
    }

    Highcharts.chart('container2', {
        lang: {
            viewFullscreen: "Ver en pantalla completa",
            printChart: "Imprimir grafico",
            downloadPNG: "Descargar PNG",
            downloadJPEG: "Descargar JPEG",
            downloadPDF: "Descargar PDF",
            downloadSVG: "Descargar SVG",
            downloadCSV: "Excel Tabla CSV",
            downloadXLS: "Excel Tabla XLS",
            viewData: "Ver tabla",
            hideData: "Esconder tabla",
            exitFullscreen: "Salir de pantalla completa",
            exportData: {
                categoryHeader: "Actividades Extra"
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 10,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Actividades extra mas reservadas'
        },
        exporting: {
            showTable: true,
            buttons: {
                contextButton: {
                    menuItems: ["viewFullscreen", "separator", "downloadXLS", "downloadCSV", "separator", "viewData"]
                }
            }
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}% = {point.y:.1f}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Cantidad',
            colorByPoint: true,
            data: arrayActividadExtra
        }]
    });

}

function printDiv(id) {
    var objeto = "";

    objeto = document.querySelector(id);

    /*obtenemos el objeto a imprimir*/
    var ventana = window.open('', '_blank');//abrimos una ventana vacía nueva
    var objeto2 = `
    <style>
        .highcharts-figure,
        .highcharts-data-table table {
            min-width: 320px;
            max-width: 660px;
            margin: 1em auto;
        }

        .highcharts-data-table table {
            font-family: Verdana, sans-serif;
            border-collapse: collapse;
            border: 1px solid #ebebeb;
            margin: 10px auto;
            text-align: center;
            width: 100%;
            max-width: 500px;
        }

        .highcharts-data-table caption {
            padding: 1em 0;
            font-size: 1.2em;
            color: #555;
        }

        .highcharts-data-table th {
            font-weight: 600;
            padding: 0.5em;
        }

        .highcharts-data-table td,
        .highcharts-data-table th,
        .highcharts-data-table caption {
            padding: 0.5em;
        }

        .highcharts-data-table thead tr,
        .highcharts-data-table tr:nth-child(even) {
            background: #f8f8f8;
        }

        .highcharts-data-table tr:hover {
            background: #f1f7ff;
        }

        #a {
            text-decoration: none;
        }

        #carta {
            max-height: 300px !important;
        }
    </style>
    `
    ventana.document.write(objeto2)
    ventana.document.write(objeto.innerHTML);  //imprimimos el HTML del objeto en la nueva ventana   
    //ventana.document.close();  //cerramos el documento
    ventana.print();  //imprimimos la ventana
    ventana.close();  //cerramos la ventana

}