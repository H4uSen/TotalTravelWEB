var Reservacion = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationHotels/List");
var Hoteles = ajaxRequest("https://totaltravel.somee.com/API/Hotels/List");
GraficaPastel();

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
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Hoteles más reservados'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
            name: 'Brands',
            colorByPoint: true,
            data: arrayhote
        }]
    });

}