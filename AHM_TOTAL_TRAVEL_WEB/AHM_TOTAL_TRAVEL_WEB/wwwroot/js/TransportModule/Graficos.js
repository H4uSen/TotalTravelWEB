var TransportesList = ajaxRequest(urlAPI +"/API/Transports/List");
var ReservacionTransp = ajaxRequest(urlAPI +"/API/ReservationTransportation/List");


$("document").ready(function () {
    GraficaPastel2();
})

//function GraficaPastel() {
//    var TipoTransp = TransportesList.data;
//    var arraytransp = [];

//    var TranspFiltro = TipoTransp.filter(resva => resva.partnerID == parseInt(Client_Partner_ID));
//    for (var i = 0; i < TranspFiltro.length; i++) {
//        const item = TranspFiltro[i];
//        var objeto = {
//            name: item.tipoTransporte,
//            y: 0,
//        }
//        arraytransp.push(objeto);
//    }
//    let transpoMap = arraytransp.map(item => {
//        return [item.name, item]
//    });
//    var transpoMapArr = new Map(transpoMap); // Pares de clave y valor

//    let arraytransp2 = [...transpoMapArr.values()];

//    var ResvHotList = ReservacionTransp.data.filter(x => x.partner_ID == parseInt(Client_Partner_ID));

//    for (var i = 0; i < arraytransp2.length; i++) {
//        const item = arraytransp2[i];
//        var ResvHotFiltro = ResvHotList.filter(resva => resva.tipo_Transporte == item.precio);
//        for (ResvHotFiltro.le) {
//            const item2 = arraytransp2[i];

//        }
//        item.y = ResvHotFiltro.length;
//    }

//}
function GraficaPastel2() {
    var TipoTransp = TransportesList.data;
    var arraytransp = [];

    var TranspFiltro = TipoTransp.filter(resva => resva.partnerID == parseInt(Client_Partner_ID));
    for (var i = 0; i < TranspFiltro.length; i++) {
        const item = TranspFiltro[i];
        var objeto = {
            name: item.tipoTransporte,
            y: 0,
        }
        arraytransp.push(objeto);
    }
    let transpoMap = arraytransp.map(item => {
        return [item.name, item]
    });
    var transpoMapArr = new Map(transpoMap); // Pares de clave y valor

    let arraytransp2 = [...transpoMapArr.values()];

    var ResvHotList = ReservacionTransp.data.filter(x => x.partner_ID == parseInt(Client_Partner_ID));

    for (var i = 0; i < arraytransp2.length; i++) {
        const item = arraytransp2[i];
        var ResvHotFiltro = ResvHotList.filter(resva => resva.tipo_Transporte == item.name);
      
        item.y = ResvHotFiltro.length;
    }

  
    //Construccion del grafico
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
            text: 'Transportes mas reservados'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}% = {point.y:.1f}</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        exporting: {
            showTable: true,
            buttons: {
                contextButton: {
                    menuItems: ["viewFullscreen", "separator", "downloadXLS", "downloadCSV", "separator", "viewData"]
                }
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
            data: arraytransp
        }]
    });

}
function GraficaPastel3() {
    var CategoryRoomsList = CategoryRooms.data;
    var arrayhote = [];
    for (var i = 0; i < CategoryRoomsList.length; i++) {
        const item = CategoryRoomsList[i];
        var objeto = {
            name: item.descripcion,
            y: 0,
            x: item.id
        }
        arrayhote.push(objeto);
    }
    var ResvHotList = ReservacionH.data;

    for (var i = 0; i < arrayhote.length; i++) {
        const item = arrayhote[i];
        var ResvHotFiltro = ResvHotList.filter(resva => resva.categoriaID == item.x);
        item.y = ResvHotFiltro.length;
    }
    //Construccion del grafico
    Highcharts.chart('container3', {
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
            type: 'column'
        },
        title: {
            text: 'Categorias de habitaciones más utilizadas'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: ''
        },
        exporting: {
            showTable: true,
            buttons: {
                contextButton: {
                    menuItems: ["viewFullscreen", "separator", "downloadXLS", "downloadCSV", "separator", "viewData"]
                }
            }
        },
        series: [{
            name: 'Cantidad',
            data: arrayhote,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
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
//    Highcharts.chart('container', {
//        chart: {
//            plotBackgroundColor: null,
//            plotBorderWidth: null,
//            plotShadow: false,
//            type: 'pie'
//        },
//        title: {
//            text: 'Tipo de Transportes más usados'
//        },
//        tooltip: {
//            pointFormat: '{series.name}: <b>{point.percentage:.1f}% = {point.y:.1f}</b>'
//        },
//        accessibility: {
//            point: {
//                valueSuffix: '%'
//            }
//        },
//        plotOptions: {
//            pie: {
//                allowPointSelect: true,
//                cursor: 'pointer',
//                dataLabels: {
//                    enabled: false
//                },
//                showInLegend: true
//            }
//        },
//        series: [{
//            name: 'Cantidad',
//            colorByPoint: true,
//            data: arraytransp2
//        }]
//    });

//}