var Reservacion = ajaxRequest(urlAPI + "/API/ReservationHotels/List");
var Reservacione = ajaxRequest(urlAPI + "/API/Reservation/List");
var Hoteles = ajaxRequest(urlAPI + "/API/Hotels/List");
var Rooms = ajaxRequest(urlAPI + "/API/Rooms/List");
var CategoryRooms = ajaxRequest(urlAPI + "/API/CategoriesRooms/List");
var ReservacionH = ajaxRequest(urlAPI + "/API/ReservationDetails/List");
var Partners = ajaxRequest(urlAPI + "/API/Partners/List");

function getDestiny2() {

    if (Partners.code == 200) {

        var DsTr_ID2 = Partners.data;
        var DsTr_ID = DsTr_ID2.filter(resva => resva.tipoPartner == "Hotel");

        ClearDropDownItem($('#dbbFiltro'));
        $("#dbbFiltro").append(
            `<option value="">Seleccione un socio. (required)</option>`
        );
        for (var i = 0; i < DsTr_ID.length; i++) {
            var item = DsTr_ID[i];
            AddDropDownItem($('#dbbFiltro'), item = { value: item.id, text: item.nombre });
        }
    }
};

var PartnerID;
$("document").ready(function () {
    getDestiny2();
    SetDropDownValue($("#dbbFiltro"), 2);
    PartnerID = "2";
    GraficaPastel(PartnerID);
    GraficaPastel2(PartnerID);
    GraficaPastel3(PartnerID);
    GraficaPastel4(PartnerID);
    GraficaPastel5(PartnerID);
})

var PartnerID;
$("#dbbFiltro").change(function () {
    PartnerID = $("#dbbFiltro").val().toString();
    GraficaPastel(PartnerID);
    GraficaPastel2(PartnerID);
    GraficaPastel3(PartnerID);
    GraficaPastel4(PartnerID);
    GraficaPastel5(PartnerID);
})
function GraficaPastel(PartnerID) {
    $("#c1").empty();
    $("#c1").append(`<div class="card-body" id="conten">
                         <div id="container"></div>
                    </div > `);
    $("#c1").append(`
                          <center>
                        <div class="col-md-6 mb-3">
                            <button class="btn btn-light" onclick="printDiv('#c1 .card-body')">
                                <span class="material-symbols-outlined">
                                    Imprimir
                                </span>
                            </button>
                        </div>
                    </center>
                    `);
    var HotelsList = Hoteles.data;
    var arrayhote = [];
    var HoteFiltro = HotelsList.filter(resva => resva.iD_Partner == parseInt(PartnerID));
    for (var i = 0; i < HoteFiltro.length; i++) {
        const item = HoteFiltro[i];
        var objeto = {
            name: item.hotel,
            y: 0,
            idd: item.id
        }
        arrayhote.push(objeto);
    }
    var ResvHotList = Reservacion.data.filter(resva => resva.partnerID == parseInt(PartnerID));

    for (var i = 0; i < arrayhote.length; i++) {
        const item = arrayhote[i];
        var ResvHotFiltro = ResvHotList.filter(resva => resva.hotel_ID == item.idd);
        item.y = ResvHotFiltro.length;
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
            text: 'Hoteles más reservados'
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
function GraficaPastel2(PartnerID) {
    $("#c2").empty();
    $("#c2").append(`<div class="card-body" id="conten2">
                         <div id="container2"></div>
                    </div > `);
    $("#c2").append(`
                          <center>
                        <div class="col-md-6 mb-3">
                            <button class="btn btn-light" onclick="printDiv('#c2 .card-body')">
                                <span class="material-symbols-outlined">
                                    Imprimir
                                </span>
                            </button>
                        </div>
                    </center>
                    `);
    var HotelsList = Hoteles.data;
    var arrayhote = [];
    var HoteFiltro = HotelsList.filter(resva => resva.iD_Partner == parseInt(PartnerID));
    for (var i = 0; i < HoteFiltro.length; i++) {
        const item = HoteFiltro[i];
        var objeto = {
            name: item.hotel,
            y: 0,
            idd: item.id
        }
        arrayhote.push(objeto);
    }
    var Habitaciones = Rooms.data;
    for (var i = 0; i < arrayhote.length; i++) {
        const item = arrayhote[i];
        var ResvHotFiltro = Habitaciones.filter(resva => resva.hotelID == item.idd);
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
            text: 'Hoteles con más habitaciones'
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
            data: arrayhote
        }]
    });

}
function GraficaPastel3(PartnerID) {
    $("#c3").empty();
    $("#c3").append(`<div class="card-body" id="conten3">
                         <div id="container3"></div>
                    </div > `);
    $("#c3").append(`
                          <center>
                        <div class="col-md-6 mb-3">
                            <button class="btn btn-light" onclick="printDiv('#c3 .card-body')">
                                <span class="material-symbols-outlined">
                                    Imprimir
                                </span>
                            </button>
                        </div>
                    </center>
                    `);
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
    var ResvHotList = ReservacionH.data.filter(resva => resva.partnerID == parseInt(PartnerID));

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
function GraficaPastel4(PartnerID) {
    $("#c4").empty();
    $("#c4").append(`<div class="card-body" id="conten4">
                         <div id="container4"></div>
                    </div > `);
    $("#c4").append(`
                          <center>
                        <div class="col-md-6 mb-3">
                            <button class="btn btn-light" onclick="printDiv('#c4 .card-body')">
                                <span class="material-symbols-outlined">
                                    Imprimir
                                </span>
                            </button>
                        </div>
                    </center>
                    `);
    var HotelsList = Hoteles.data;
    var arrayhote = [];
    var HoteFiltro = HotelsList.filter(resva => resva.iD_Partner == parseInt(PartnerID));
    for (var i = 0; i < HoteFiltro.length; i++) {
        const item = HoteFiltro[i];
        var objeto = {
            name: item.hotel,
            y: 0,
            idd: item.id
        }
        arrayhote.push(objeto);
    }
    var ResvHotList = ReservacionH.data;

    for (var i = 0; i < arrayhote.length; i++) {
        const item = arrayhote[i];
        var ResvHotFiltro = ResvHotList.filter(resva => resva.hotelID == item.idd);
        var precio = 0;
        for (var i = 0; i < ResvHotFiltro.length; i++) {
            const item = ResvHotFiltro[i];
            precio += parseInt(item.precio_Habitacion);
        }
        item.y = precio;
    }
    //Construccion del grafico
    Highcharts.chart('container4', {
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
            text: 'Ganancias Totales por Hotel'
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
function GraficaPastel5(PartnerID) {
    $("#c5").empty();
    $("#c5").append(`<div class="card-body" id="conten5">
                         <div id="container5"></div>
                    </div > `);
    $("#c5").append(`
                          <center>
                        <div class="col-md-6 mb-3">
                            <button class="btn btn-light" onclick="printDiv('#c5 .card-body')">
                                <span class="material-symbols-outlined">
                                    Imprimir
                                </span>
                            </button>
                        </div>
                    </center>
                    `);
    var HotelsList = Hoteles.data;
    var arrayhote2 = [];
    var arrayhote3 = [];
    var HoteFiltro = HotelsList.filter(resva => resva.iD_Partner == parseInt(PartnerID));
    for (var i = 0; i < HoteFiltro.length; i++) {
        const item = HoteFiltro[i];
        var objeto = {
            name: item.hotel,
            y: 0,
            idd: item.id
        }
        arrayhote2.push(objeto);
        arrayhote3.push(item.hotel);
    }


    var Reservaciones = Reservacione.data.filter(resva => resva.partnerID == parseInt(PartnerID));

    var arrayhote = [];
    for (var i = 0; i < Reservaciones.length; i++) {
        const item = Reservaciones[i];
        var objeto = {
            name: item.sexo,
            data: [],
        }
        arrayhote.push(objeto);
    }

    let transpoMap = arrayhote.map(item => {
        return [item.name, item]
    });
    var transpoMapArr = new Map(transpoMap); // Pares de clave y valor

    let arraytransp2 = [...transpoMapArr.values()];

    for (var i = 0; i < arrayhote2.length; i++) {
        const item = arrayhote2[i];
        var ResvHotFiltro = Reservaciones.filter(resva2 => resva2.hotel_ID == item.idd);
        for (var j = 0; j < arraytransp2.length; j++) {
            const item2 = arraytransp2[j];
            var ResvHotFiltro2 = ResvHotFiltro.filter(resva => resva.sexo == item2.name);
            item2.data.push(ResvHotFiltro2.length);
        }
    }
    //Construccion del grafico
    Highcharts.chart('container5', {
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
            text: 'Sexo de Clientes por Hotel'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: arrayhote3,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
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
        series: arraytransp2
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
