
//-------------------------------------------------- ROUTE DATA----------------------------------------------------------

//lista de filtros por cada reporte, formato JSON
const filterSource = {
    "transport": [
        { filter: "artista", source: "getArtist" },
       
    ],
};

/* 
   formato JSON de datos de iframe, 
   se usa para almacenar/setear todos los datos requeridos del filtro y 
   enviarlos a controlador al dar click en btnFiltro
*/
var iframeData = {
    action: "", //nombre de el metodo en el controlador
    routeValue: "", //ID del parametro de filtro
    filterType: "" //entidad en la cual sera filtrada el informe
};

// -------------------------------------------------- INITIALIZE--------------------------------------------------------------------

$(document).ready(() => {
    //inicializa la pantalla con el reporte de conciertos como default
    $("#cbbRouteValue").prop("disabled", true);
    GetReport('transportReport', 'transport');
});

$("#cbbRouteValue").change(function () {
    //setea el valor de el parametro de filtro (ID)
    iframeData.routeValue = $("#cbbRouteValue").val();
});

$("#btnFiltro").click(function () {
    //valida si los parametros son validos antes de enviar a controllador
    if (iframeData.filterType == "") {
        iziToastAlert("selecione un filtro valido", "", "error");
    }
    else if (iframeData.routeValue == "") {
        iziToastAlert(`selecione un ${iframeData.filterType} valido`, "", "error");
    } else {
        /* 
           En base a los datos recopilados en iframeData crea url por metodo get
           que sera asignado a la etiqueta iframe y dara como resultado el informe filtrado
        */
        const url = `/Report/${iframeData.action}?routeValue=${iframeData.routeValue}&filterType=${iframeData.filterType}`;
        //setea url de iframe
        $("#ifrReport").prop("src", url);
    }
});

//----------------------------------------------- REPORT FUNCTIONS  ---------------------------------------------------------

function GetReport(action = "transportReport", report = "transport") {

    //devuelve al valor default del filtro cada vez que se cambia de informe
    $("#lblfiltro").html("TODOS");
    $("#cbbRouteValue").empty();
    $("#cbbRouteValue").append("<option selected>Selecione un filtro</option>");
    $("#cbbRouteValue").prop("disabled", true);
    iframeData.filterType = "";
    iframeData.routeValue = "";

    //setea accion (nombre de metodo de informe)
    iframeData.action = action;
    //asigna el nuevo informe al iframe
    $("#ifrReport").prop("src", `/API/Report/${action}`);
    $("#lblReport").html(report.toUpperCase());

    //busca dentro de JSON de restricciones el informe solicitado
    const filters = filterSource[report];
    if (filters.length > 0) {
        $("#btnFiltro").removeClass("disabled");
        $("#cbbFiltro button").removeClass("disabled");
        //setea valor default de combobox
        $("#cbbFiltro #cbbFiltro-body").empty();
        var filterbody = "";
        filterbody +=
            `<li>
               <a id="${report}" class="dropdown-item" href="javascript: GetReport('${action}','${report}')"> TODOS </a>
            </li>`;

        //por cada restriccion crea un cuerpo de items de dropdown 
        for (var i = 0; i < filters.length; i++) {
            const filter = filters[i];

            filterbody +=
                `<li>
                    <a id="lblFilter${filter.filter}" class="dropdown-item" href="javascript: filterReport('${filter.filter}',${filter.source})">${filter.filter.toUpperCase()}</a>
                </li>`;
        }
        $("#cbbFiltro #cbbFiltro-body").html(filterbody);
    } else {
        $("#cbbRouteValue").empty();
        $("#cbbRouteValue").append("<option selected>No hay filtros disponibles</option>");
        $("#btnFiltro").addClass("disabled");
        $("#cbbFiltro button").addClass("disabled");
        $("#cbbFiltro #cbbFiltro-body").empty();
    }

}

function filterReport(filterType, filterSource) {
    $("#cbbFiltro-body a").removeClass("active");
    $("#lblFilter" + filterType).addClass("active");

    //setea valor de filterType (entidad que se usara para filtrar informe)
    iframeData.filterType = filterType;
    //rellena select de filtros deacuerdo al filtro/funcion indicado por cbbFiltro
    filterSource();

    $("#lblfiltro").html(filterType);
    $("#cbbRouteValue").prop("disabled", false);
    $("#cbbRouteValue").focus();
}


//----------------------------------------------- GENERAL FUNCTIONS  ---------------------------------------------------------


function getArtist() {

    $.ajax({
        url: 'https://totaltravel.somee.com/API/Transports/list',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        type: "GET",
        dataType: "json",
        async: true,
        success: function (result) {
            const data = result.data;
            $("#cbbRouteValue").empty();
            $("#cbbRouteValue").append("<option value='0' disabled selected> Seleccione un artista </option>");

            for (var i = 0; i < data.length; i++) {
                const element = data[i];

                const option = `<option value="${element.id}">${element.nombres} ${element.apellidos} / ${element.alias}</option>`;
                $("#cbbRouteValue").append(option);
            }
        },
        error: function () {
            console.log("error");
        }
    });
}
