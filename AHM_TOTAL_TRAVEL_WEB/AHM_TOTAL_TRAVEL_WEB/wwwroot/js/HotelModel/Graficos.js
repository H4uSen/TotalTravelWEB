var Reservacion = ajaxRequest(urlAPI+"/API/ReservationHotels/List");
var Hoteles = ajaxRequest(urlAPI + "/API/Hotels/List");
var Rooms = ajaxRequest(urlAPI + "/API/Rooms/List");
var CategoryRooms = ajaxRequest(urlAPI + "/API/CategoriesRooms/List");
var ReservacionH = ajaxRequest(urlAPI + "/API/ReservationDetails/List");
GraficaPastel();
GraficaPastel2();
GraficaPastel3();

function GraficaPastel() {
    var HotelsList = Hoteles.data;
    var arrayhote = [];
    var HoteFiltro = HotelsList.filter(resva => resva.iD_Partner == parseInt(Client_Partner_ID));
    for (var i = 0; i < HoteFiltro.length; i++) {
        const item = HoteFiltro[i];
        var objeto = {
            name: item.hotel,
            y: 0,
            idd:item.id
        }       
        arrayhote.push(objeto);
    }
    var ResvHotList = Reservacion.data;   
    
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
            downloadCSV: "Descargar CSV",
            downloadXLS: "Descargar XLS",
            viewData: "Ver tabla",
            hideData: "Esconder tabla",
            exitFullscreen: "Salir de pantalla completa",
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

function GraficaPastel2() {
    var HotelsList = Hoteles.data;
    var arrayhote = [];
    var HoteFiltro = HotelsList.filter(resva => resva.iD_Partner == parseInt(Client_Partner_ID));
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
            downloadCSV: "Descargar CSV",
            downloadXLS: "Descargar XLS",
            viewData: "Ver tabla",
            hideData: "Esconder tabla",
            exitFullscreen: "Salir de pantalla completa",
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
function GraficaPastel3() {
    var CategoryRoomsList = CategoryRooms.data;
    var arrayhote = [];
    for (var i = 0; i < CategoryRoomsList.length; i++) {
        const item = CategoryRoomsList[i];
        var objeto = {
            name: item.descripcion,
            y: 0,
            idd: item.id
        }
        arrayhote.push(objeto);
    }
    var ResvHotList = ReservacionH.data;

    for (var i = 0; i < arrayhote.length; i++) {
        const item = arrayhote[i];
        var ResvHotFiltro = ResvHotList.filter(resva => resva.categoriaID == item.idd);
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
            downloadCSV: "Descargar CSV",
            downloadXLS: "Descargar XLS",
            viewData: "Ver tabla",
            hideData: "Esconder tabla",
            exitFullscreen: "Salir de pantalla completa",
        },
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 10,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Habitaciones más reservados'
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
