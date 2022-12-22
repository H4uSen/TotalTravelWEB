const reservationList = ajaxRequest(urlAPI + "/API/ReservationRestaurant/List");
const RestaurantList = ajaxRequest(urlAPI + "/API/Restaurants/List");
const MenuTypesList = ajaxRequest(urlAPI + "/API/MenuTypes/List");
const MenusList = ajaxRequest(urlAPI + "/API/Menus/List");

$("document").ready(function () {
    GraficaPastel();
    GraficaPastel2();
    GraficaPastel3();
})

var Restaurante = RestaurantList.data.filter(resva => resva.iD_Partner == parseInt(Client_Partner_ID))[0];
var RestautanteID = parseInt(Restaurante.id);
function GraficaPastel() {
    var arrayhote = [
        { name: "Enero", y: 0, x: "01" },
        { name: "Febrero", y: 0, x: "02" },
        { name: "Marzo", y: 0, x: "03" },
        { name: "Abril", y: 0, x: "04" },
        { name: "Mayo", y: 0, x: "06" },
        { name: "Junio", y: 0, x: "07" },
        { name: "Julio", y: 0, x: "08" },
        { name: "Agosto", y: 0, x: "08" },
        { name: "Septiembre", y: 0, x: "09" },
        { name: "Octubre", y: 0, x: "10" },
        { name: "Noviembre", y: 0, x: "11" },
        { name: "Diciembre", y: 0, x: "12" }
    ];
    var ResvHotList = reservationList.data.filter(resva => resva.iD_Parter == parseInt(Client_Partner_ID));

    for (var i = 0; i < arrayhote.length; i++) {
        const item = arrayhote[i];
        var ResCant = 0;
        var Fecha = item.x;
        for (var j = 0; j < ResvHotList.length; j++) {
            const item2 = ResvHotList[j];
            var FechaResv = item2.fecha_Reservacion.toString().split('-')[1];
            if (Fecha == FechaResv) {
                ResCant += 1;
            }        
        }
        item.y = ResCant;
    }
    //Construccion del grafico
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
                categoryHeader: "Categoria"
            }
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 10,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Reservaciones por mes'
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
            data: arrayhote
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
