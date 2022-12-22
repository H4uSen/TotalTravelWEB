const reservationList = ajaxRequest(urlAPI + "/API/ReservationActivitiesExtra/List");
$("document").ready(function () {
    GraficoPastel();

})
//contructChart();


//function contructChart() {//fecha_Entrada

//    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//    if (reservationList.code == 200) {
//        $.each(reservationList.data, function (i, reservation) {

//            if (reservation.fecha_Reservacion != null) {
//                const date = GetDateFormat({
//                    string_date: reservation.fecha_Reservacion,
//                    hour_format: 12,
//                    date_format: "default"
//                });
//                const actual_month = parseInt(date.datetime_data.month) - 1;
//                const actual_count = data[actual_month];

//                data[actual_month] = actual_count + 1;
//            }
//        });
//    }

//    const ctxAdmin = document.getElementById('lineCahrt').getContext('2d');
//    const months = [
//        "enero", "febrero", "marzo", "abril",
//        "mayo", "junio", "julio", "agosto",
//        "septiembre", "octubre", "noviembre", "diciembre"
//    ]
//    const myChart = new Chart(ctxAdmin, {
//        type: 'bar',
//        data: {
//            labels: months,
//            datasets: [{
//                label: `Total de Reservaciones 2022 (${reservationList.data.length} en total)`,
//                data: data,
//                backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                borderColor: 'rgba(54, 162, 235, 0.2)',
//                borderWidth: 1
//            }]
//        },
//        options: {
//            scales: {
//                y: {
//                    beginAtZero: true
//                }
//            }
//        },
        
//    });
//}

function GraficoPastel() {
    var arrayReserv = [
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
    var ResvaList = reservationList.data;

    for (var i = 0; i < arrayReserv.length; i++) {
        const item = arrayReserv[i];
        var ResCant = 0;
        var Fecha = item.x;
        for (var j = 0; j < ResvaList.length; j++) {
            const item2 = ResvaList[j];
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
            text: 'Actividades reservadas segun mes'
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
            data: arrayReserv
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