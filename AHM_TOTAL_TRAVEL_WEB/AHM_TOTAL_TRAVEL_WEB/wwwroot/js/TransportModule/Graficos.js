var TransportesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Transports/List");
var ReservacionTransp = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/ReservationTransportation/List");

GraficaPastel();

function GraficaPastel() {
    var TipoTransp = TransportesList.data;
    var arraytransp = [];
    var TranspFiltro = TipoTransp.filter(resva => resva.partnerID == parseInt(Client_Partner_ID));
    for (var i = 0; i < TranspFiltro.length; i++) {
        const item = TranspFiltro[i];
        var objeto = {
            name: item.tipoTransporte,
            y: 0,
            idd: item.id
        }
        arraytransp.push(objeto);
    }
    var ResvHotList = ReservacionTransp.data;

    for (var i = 0; i < arraytransp.length; i++) {
        const item = arraytransp[i];
        var ResvHotFiltro = ResvHotList.filter(resva => resva.tipo_Transporte == item.name);
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
            data: arraytransp
        }]
    });

}