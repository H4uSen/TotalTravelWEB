var TransportesList = ajaxRequest(urlAPI +"/API/Transports/List");
var ReservacionTransp = ajaxRequest(urlAPI +"/API/ReservationTransportation/List");

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
        var ResvHotFiltro = ResvHotList.filter(resva => resva.tipo_Transporte == item.precio);
        for (ResvHotFiltro.le) {
            const item2 = arraytransp2[i];

        }
        item.y = ResvHotFiltro.length;
    }
    //Construccion del grafico
    [
       0 name: comayagua y: 0,
       1 name: tegucigalpa y: 0,

    ]
    Highcharts.chart('container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Tipo de Transportes más usados'
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
            data: arraytransp2
        }]
    });

}