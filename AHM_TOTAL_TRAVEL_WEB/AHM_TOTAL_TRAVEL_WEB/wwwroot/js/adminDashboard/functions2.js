const reservationList = ajaxRequest(urlAPI + "/API/Reservation/List");
const Users = ajaxRequest(urlAPI + "/API/Users/List");

$("document").ready(function () {
    GraficaPastelSexo();
    GraficaPastelEstadoCivil();
    GraficaBarras(0);

})



$("#dbbFiltro").change(function () {
    GraficaBarras($("#dbbFiltro").val());
});

function GraficaBarras(id) {
    $("#c1").empty();
    $("#c1").append(`<div class="card-body id="content1">
                         <div id="container" ></div>
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
    var arrayReservSexo = [];
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

            var arrayReservEstadoCivil = [
                { name: "Soltero(a)", y: 0 },
                { name: "Casado(a)", y: 0 },
                { name: "Viudo(a)", y: 0 },
                { name: "Divorciado(a)", y: 0 },
                { name: "Unión Libre", y: 0 }
            ];

            var ResvaListEstadoCivil = reservationList.data;

            for (var i = 0; i < arrayReservEstadoCivil.length; i++) {
                const item = arrayReservEstadoCivil[i];
                var ResCant = 0;
                var EstadoCivil = item.name;
                for (var j = 0; j < ResvaListEstadoCivil.length; j++) {
                    const item2 = ResvaListEstadoCivil[j];
                    var EstaCivil = item2.estadoCivil;
                    if (EstadoCivil == EstaCivil) {
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
                    type: 'pie',
                    plotBorderColor: "#ffffff",
                    plotBorderWidth: 0
                },
                title: {
                    text: 'Reservaciónes realizadas en el año 2022 según el estado civil.'
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
                    data: arrayReservEstadoCivil
                }]
            });

            break;
        default:
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
            //for (var i = 0; i < reservationListData.length; i++) {
            //    const item = reservationListData[i];
            //    var objeto;
            //    switch (item.fecha_Entrada.substring(5, 7)) {
            //        case "01":
            //            objeto = {
            //                name: "Enero",
            //                mes: "01",
            //                y: 0,
            //            }
            //            break;
            //        case "02":
            //            objeto = {
            //                name: "Febrero",
            //                mes: "02",
            //                y: 0,
            //            }
            //            break;
            //        case "03":
            //            objeto = {
            //                name: "Marzo",
            //                mes: "03",
            //                y: 0,
            //            }
            //            break;
            //        case "04":
            //            objeto = {
            //                name: "Abril",
            //                mes: "04",
            //                y: 0,
            //            }
            //            break;
            //        case "05":
            //            objeto = {
            //                name: "Mayo",
            //                mes: "05",
            //                y: 0,
            //            }
            //            break;
            //        case "06":
            //            objeto = {
            //                name: "Junio",
            //                mes: "06",
            //                y: 0,
            //            }
            //            break;
            //        case "07":
            //            objeto = {
            //                name: "Julio",
            //                mes: "07",
            //                y: 0,
            //            }
            //            break;
            //        case "08":
            //            objeto = {
            //                name: "Agosto",
            //                mes: "08",
            //                y: 0,
            //            }
            //            break;
            //        case "09":
            //            objeto = {
            //                name: "Septiembre",
            //                mes: "09",
            //                y: 0,
            //            }
            //            break;
            //        case "10":
            //            objeto = {
            //                name: "Octubre",
            //                mes: "10",
            //                y: 0,
            //            }
            //            break;
            //        case "11":
            //            objeto = {
            //                name: "Noviembre",
            //                mes: "11",
            //                y: 0,
            //            }
            //            break;
            //        case "12":
            //            objeto = {
            //                name: "Diciembre",
            //                mes: "12",
            //                y: 0,
            //            }
            //            break;
            //        default:
            //            objeto = null;
            //    }

            //    arrayReserv.push(objeto);
            //}

            // let resvMap = arrayReserv.map(item => {
            //    return [item.mes, item]
            //});
            // var resvMapArr = new Map(resvMap); // Pares de clave y valor

            //let arrayResv2 = [...resvMapArr.values()];

            //for (var i = 0; i < arrayResv2.length; i++) {
            //    const item = arrayResv2[i];
            //    var ResvFiltro = reservationListData.filter(x => x.fecha_Entrada.substring(5, 7) == item.mes);
            //    item.y = ResvFiltro.length;
            //}

            var ResvaList = reservationList.data;

            for (var i = 0; i < arrayReserv.length; i++) {
                const item = arrayReserv[i];
                var ResCant = 0;
                var Fecha = item.x;
                for (var j = 0; j < ResvaList.length; j++) {
                    const item2 = ResvaList[j];
                    var FechaResv = item2.fecha_Entrada.toString().split('-')[1];
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
                    type: 'pie',
                    plotBorderColor: "#ffffff",
                    plotBorderWidth: 0
                },
                title: {
                    text: 'Reservaciónes realizadas en 2022'
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
