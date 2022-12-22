const reservationList = ajaxRequest(urlAPI + "/API/Reservation/List");
const Users = ajaxRequest(urlAPI + "/API/Users/List");

$("document").ready(function () {
    GraficaPastelSexo();
    GraficaBarras(0);
    GraficaPastelEstadoCivil();
})

/*
contructMonthSalesChart();
fillHotelTop();
fillActivitiesTop();

function fillHotelTop() {

    const colors = ["#D4AF37", "#C0C0C0", "#CD7F32"];
    if (modelo.hotel_Top_3.length > 0) {
        for (var i = 0; i < modelo.hotel_Top_3.length; i++) {
            const item = modelo.hotel_Top_3[i];
            const card =
            `<div class="item">
                <h2 class="align-middle" style="padding: 0 1em; color: ${colors[i]}; font-weight: bold;"><br>${i + 1}</h2>
                <div class="image">
                    <img src="https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/2659/posts/32230/image/intro_trip-planner-logo-maker-with-airplane-clipart-2504i.jpg">
                </div>
                <div class="content">
                    <h3><b>${item.hotel}</b></h3>
                    <h5 class="blue_text">
                        <i class="map marker alternate blue icon"></i>
                        <b>${item.ciudad}</b>
                    </h5>
                    <div class="extra d-flex">
                        <b>Rating:</b>
                        <div class="ui huge star rating disabled" data-rating="5"><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i></div>
                    </div>
                </div>
            </div>`;

            $("#container_hotels_3").append(card);
        }
    }
    else {
        const item =
            `<div class="item">
                 <div class="content">
                    <h1>NO DATA AVALIABLE</h1>
                 </div>
            </div>`;

        $("#container_hotels_3").append(item);
    }
}

function fillActivitiesTop() {

    if (modelo.activities_top_5.length > 0) {

        for (var i = 0; i < modelo.activities_top_5.length; i++) {

            const item = modelo.activities_top_5[i];

            if (item != null) {
                const card =
                    `<div class="item">
                        <div class="content">

                            <h3><b>${item.descripcion}</b></h3>
                            <div class="extra d-flex">
                                <b>Rating:</b>
                                <div class="ui huge star rating disabled" data-rating="5">
                                    <i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i><i class="star icon active"></i>
                                </div>
                            </div>

                        </div>
                    </div>`;

                $("#container_activities_top_5").append(card);
            }
        }
    }
    else {
        const item =
            `<div class="item">
                 <div class="content">
                    <h1>NO DATA AVALIABLE</h1>
                 </div>
            </div>`;

        $("#container_activities_top_5").append(item);
    }
}

function contructMonthSalesChart() {//fecha_Entrada

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (reservationList.code == 200) {
        $.each(reservationList.data, function (i, reservation) {

            if (reservation.fecha_Entrada != null) {
                const date = GetDateFormat({
                    string_date: reservation.fecha_Entrada,
                    hour_format: 12,
                    date_format: "default"
                });
                const actual_month = parseInt(date.datetime_data.month - 1);
                const actual_count = data[actual_month];

                data[actual_month] = actual_count + 1;
            }
        });
    }

    const ctxAdmin = document.getElementById('monthSales').getContext('2d');
    const months = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
    ]
    const myChart = new Chart(ctxAdmin, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: `Total de Reservaciones 2022 (${reservationList.data.length} en total)`,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    max: 50,
                    min: 0,
                    ticks: {
                        stepSize: 0.5
                    }
                }
            }
        }
    });
}*/




/*
function contructUsersSalesChart() {//fecha_Entrada

    const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if (reservationList.code == 200) {
        $.each(reservationList.data, function (i, reservation) {

            if (reservation.fecha_Entrada != null) {
                const date = GetDateFormat({
                    string_date: reservation.fecha_Entrada,
                    hour_format: 12,
                    date_format: "default"
                });
                const actual_month = parseInt(date.datetime_data.month);
                const actual_count = data[actual_month];

                data[actual_month - 1] = actual_count + 1;
            }
        });
    }

    const ctxAdmin = document.getElementById('monthSales').getContext('2d');
    const months = [
        "enero", "febrero", "marzo", "abril",
        "mayo", "junio", "julio", "agosto",
        "septiembre", "octubre", "noviembre", "diciembre"
    ]
    const myChart = new Chart(ctxAdmin, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [{
                label: `Total de Reservaciones 2022 (${reservationList.data.length} en total)`,
                data: data,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
*/

$("#dbbFiltro").change(function () {
    GraficaBarras($("#dbbFiltro").val());
});

function GraficaBarras(id) {
    $("#c1").empty();
    $("#c1").append(`<div class="card-body" id="content1">
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
    var reservationListData = reservationList.data;
    var arrayReserv = [], arrayReservSexo = [], arrayReservEstadoCivil = [];
    switch (id) {
        case "1":

            for (var i = 0; i < reservationListData.length; i++) {
                const item = reservationListData[i];
                var objeto = {
                    name: item.sexo,
                    y: 0,
                }
                arrayReservSexo.push(objeto);
            }

            let resvMapsexo = arrayReservSexo.map(item => {
                return [item.name, item]
            });
            var resvMapSexoArr = new Map(resvMapsexo); // Pares de clave y valor

            let arrayResvSexo = [...resvMapSexoArr.values()];


            for (var i = 0; i < arrayResvSexo.length; i++) {
                const item = arrayResvSexo[i];
                var ResvFiltro = reservationListData.filter(x => x.sexo == item.name);
                item.y = ResvFiltro.length;
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
                    type: 'column'
                },
                title: {
                    text: 'Reservaciónes realizadas en el año 2022 según el sexo.'
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
                    data: arrayResvSexo,
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

            break;
        case "2":
            for (var i = 0; i < reservationListData.length; i++) {
                const item = reservationListData[i];
                var objeto = {
                    name: item.estadoCivil,
                    y: 0,
                }
                arrayReservEstadoCivil.push(objeto);
            }

            let resvMapEstadoCivil = arrayReservEstadoCivil.map(item => {
                return [item.name, item]
            });
            var resvMapEstadoCivilArr = new Map(resvMapEstadoCivil); // Pares de clave y valor

            let arrayResvEstadoCivil = [...resvMapEstadoCivilArr.values()];


            for (var i = 0; i < arrayReservEstadoCivil.length; i++) {
                const item = arrayReservEstadoCivil[i];
                var ResvFiltro = reservationListData.filter(x => x.estadoCivil == item.name);
                item.y = ResvFiltro.length;
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
                    type: 'column'
                },
                title: {
                    text: 'Reservaciónes realizadas en el año 2022 según el estado civil.'
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
                    data: arrayResvEstadoCivil,
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

            break;
        default:
            
            for (var i = 0; i < reservationListData.length; i++) {
                const item = reservationListData[i];
                var objeto;
                switch (item.fecha_Entrada.substring(5, 7)) {
                    case "01":
                        objeto = {
                            name: "Enero",
                            mes: "01",
                            y: 0,
                        }
                        break;
                    case "02":
                        objeto = {
                            name: "Febrero",
                            mes: "02",
                            y: 0,
                        }
                        break;
                    case "03":
                        objeto = {
                            name: "Marzo",
                            mes: "03",
                            y: 0,
                        }
                        break;
                    case "04":
                        objeto = {
                            name: "Abril",
                            mes: "04",
                            y: 0,
                        }
                        break;
                    case "05":
                        objeto = {
                            name: "Mayo",
                            mes: "05",
                            y: 0,
                        }
                        break;
                    case "06":
                        objeto = {
                            name: "Junio",
                            mes: "06",
                            y: 0,
                        }
                        break;
                    case "07":
                        objeto = {
                            name: "Julio",
                            mes: "07",
                            y: 0,
                        }
                        break;
                    case "08":
                        objeto = {
                            name: "Agosto",
                            mes: "08",
                            y: 0,
                        }
                        break;
                    case "09":
                        objeto = {
                            name: "Septiembre",
                            mes: "09",
                            y: 0,
                        }
                        break;
                    case "10":
                        objeto = {
                            name: "Octubre",
                            mes: "10",
                            y: 0,
                        }
                        break;
                    case "11":
                        objeto = {
                            name: "Noviembre",
                            mes: "11",
                            y: 0,
                        }
                        break;
                    case "12":
                        objeto = {
                            name: "Diciembre",
                            mes: "12",
                            y: 0,
                        }
                        break;
                    default:
                        objeto = null;
                }

                arrayReserv.push(objeto);
            }

             let resvMap = arrayReserv.map(item => {
                return [item.mes, item]
            });
             var resvMapArr = new Map(resvMap); // Pares de clave y valor

            let arrayResv2 = [...resvMapArr.values()];

            for (var i = 0; i < arrayResv2.length; i++) {
                const item = arrayResv2[i];
                var ResvFiltro = reservationListData.filter(x => x.fecha_Entrada.substring(5, 7) == item.mes);
                item.y = ResvFiltro.length;
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
            type: 'column'
        },
        title: {
            text: 'Reservaciónes realizadas en el año 2022'
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
            data: arrayResv2,
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
}







function GraficaPastelSexo() {

    var UsersList = Users.data;
    var arrayUser = [];
    for (var i = 0; i < UsersList.length; i++) {
        const item = UsersList[i];
        var objeto = {
            name: item.sexo,
            y: 0,
        }
        arrayUser.push(objeto);
    }


    let userMap = arrayUser.map(item => {
        return [item.name, item]
    });
    var userMapArr = new Map(userMap); // Pares de clave y valor

    let arrayUser2 = [...userMapArr.values()];


    for (var i = 0; i < arrayUser2.length; i++) {
        const item = arrayUser2[i];
        var UserFiltro = UsersList.filter(x => x.sexo == item.name && x.role_ID == 2);
        item.y = UserFiltro.length;
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
            text: 'Clientes por sexo'
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
            data: arrayUser2
        }]
    });

}







function GraficaPastelEstadoCivil() {

    var UsersList = Users.data;
    var arrayUser = [];
    for (var i = 0; i < UsersList.length; i++) {
        const item = UsersList[i];
        var objeto = {
            name: item.estadoCivil,
            y: 0,
        }
        arrayUser.push(objeto);
    }


    let userMap = arrayUser.map(item => {
        return [item.name, item]
    });
    var userMapArr = new Map(userMap); // Pares de clave y valor

    let arrayUser2 = [...userMapArr.values()];


    for (var i = 0; i < arrayUser2.length; i++) {
        const item = arrayUser2[i];
        var UserFiltro = UsersList.filter(x => x.estadoCivil == item.name && x.role_ID == 2);
        item.y = UserFiltro.length;
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
            plotBackgroundColor: null,
            plotBorderWidth: 10,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: 'Clientes por Estado Civil'
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
            data: arrayUser2
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
