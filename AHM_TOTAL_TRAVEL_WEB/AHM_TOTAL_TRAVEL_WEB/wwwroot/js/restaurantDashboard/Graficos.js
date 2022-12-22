const reservationList = ajaxRequest(urlAPI + "/API/ReservationRestaurant/List");
const RestaurantList = ajaxRequest(urlAPI + "/API/Restaurants/List");
const MenuTypesList = ajaxRequest(urlAPI + "/API/MenuTypes/List");
const MenusList = ajaxRequest(urlAPI + "/API/Menus/List");

$("document").ready(function () {
    GraficaPastel2();
    GraficaPastel3();
})

var Restaurante = RestaurantList.data.filter(resva => resva.iD_Partner == parseInt(Client_Partner_ID))[0];
var RestautanteID = parseInt(Restaurante.id);

function GraficaPastel2() {
    var MenusTypes = MenuTypesList.data;
    var array2hote = [];
    for (var i = 0; i < MenusTypes.length; i++) {
        const item = MenusTypes[i];
        var objeto = {
            name: item.descripcion,
            y: 0,
            idd: item.id
        }
        array2hote.push(objeto);
    }
    var Menus = MenusList.data.filter(resva => resva.iD_Restaurante == RestautanteID);

    for (var i = 0; i < array2hote.length; i++) {
        const item = array2hote[i];
        var ResvHotFiltro = Menus.filter(resva => resva.iD_TipoMenu == item.idd);
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
            type: 'column'
        },
        title: {
            text: 'Tipos de Menus con más variedad'
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
            data: array2hote,
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
const x = function (value, index) {
    return value.substring(0, index) + "," + value.substring(index);
}
function GraficaPastel3() {
    var arrayhote = [
        { name: "01", y: 0 }, { name: "02", y: 0 }, { name: "03", y: 0 },
        { name: "04", y: 0 }, { name: "05", y: 0 }, { name: "06", y: 0 },
        { name: "07", y: 0 }, { name: "08", y: 0 }, { name: "09", y: 0 },
        { name: "10", y: 0 }, { name: "11", y: 0 }, { name: "12", y: 0 },
        { name: "13", y: 0 }, { name: "14", y: 0 }, { name: "15", y: 0 },
        { name: "16", y: 0 }, { name: "17", y: 0 }, { name: "18", y: 0 },
        { name: "19", y: 0 }, { name: "20", y: 0 }, { name: "21", y: 0 },
        { name: "22", y: 0 }, { name: "23", y: 0 }, { name: "24", y: 0 },
    ];
    var ResvHotList = reservationList.data.filter(resva => resva.iD_Parter == parseInt(Client_Partner_ID));

    for (var i = 0; i < arrayhote.length; i++) {
        const item = arrayhote[i];
        var ResCant = 0;
        var Hora = item.name;
        for (var j = 0; j < ResvHotList.length; j++) {
            const item2 = ResvHotList[j];
            try {
                var FechaResv2 = parseInt(item2.fecha_Reservacion);
                var FechaResv3 = x(FechaResv2.toString(), 2);
                var FechaResv = FechaResv3.toString().split(',')[0];
            }
            catch
            {
                var FechaResv = item2.fecha_Reservacion.toString().split('-')[1];
            }
            if (Hora == FechaResv) {
                ResCant += 1;
            }
        }
        item.y = ResCant;
    }
    const arrayhote2 = arrayhote.filter((item) => item.y !== 0)
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
                categoryHeader: "Hora"
            }
        },
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Horas mas concurridas'
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
            data: arrayhote2,
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
