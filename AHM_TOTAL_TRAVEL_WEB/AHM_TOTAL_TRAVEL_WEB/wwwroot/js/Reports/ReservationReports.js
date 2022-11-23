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

//lista de filtros por cada reporte, formato JSON

const filterSource = {
    "ReservacionesReportPDF": [
        { filter: "todos", source: getAll, text: "Todos" },
        //{ filter: "tipo_Parnert", source: getTipoParnet, text: "Socio" },
        { filter: "Hotel", source: getHotels, text: "Hotel" },
        { filter: "Paquete", source: getpaquetes, text: "Paquete" },
        { filter: "fecha", source: getDate, text: "Fecha" },
    ],
};

$(".ui.dropdown").dropdown();

iframeData.action = action;

getFilter();
$("#txtValor").parents(".field").hide();

function getFilter() {

    const dropdownData = {
        dropdown: $("#cbbFiltro"),
        items: {
            list: filterSource[action],
            valueData: "filter",
            textData: "text"
        },
        placeholder: {
            empty: "No se encontraron filtros disponibles",
            default: "Seleccione un filtro",
        },
        semantic: true
    }

    FillDropDown(dropdownData);
    $("#cbbFiltro").dropdown();

    const dropdownData1 = {
        dropdown: $("#cbbValor"),
        items: {
            list: [],
            valueData: "",
            textData: ""
        },
        placeholder: {
            empty: "Seleccione un filtro",
            default: "Seleccione un filtro",
        },
        semantic: true
    }

    FillDropDown(dropdownData1);
    $("#cbbValor").dropdown();

    $("#cbbFiltro").change(() => {

        var filtertype = $("#cbbFiltro").val();
        iframeData.filterType = filtertype;

        const filtros = filterSource[iframeData.action];
        const filter = jQuery.grep(filtros, function (item, i) {
            return item.filter == filtertype;

        });
        filter[0].source();

    });

}

function getAll() {
    getFilter();
    const url = `/Report/${iframeData.action}`;
    $("#ifrReport").prop("src", url);
}

//rellena el segundo dronwdon
//function getTipoParnet() {
//    $("#cbbValor").parents(".field").show();
//    $("#txtValor").parents(".field").hide();
//    var response = ajaxRequest(urlAPI+"/API/Partners/List");

//    //response = jQuery.grep(response.data, function (item, i) {
//    //    return item.tipoPartner_Id == 2;

//    //});

//    if (response.code == 200) {

//        const dropdownData = {
//            dropdown: $("#cbbValor"),
//            items: {
//                list: response.data,
//                valueData: "id",
//                textData: "nombre"
//            },
//            placeholder: {
//                empty: "No se encontraron socios disponibles",
//                default: "Seleccione un socio",
//            },
//            semantic: true
//        }
//        console.log("prueba")

//        FillDropDown(dropdownData);
//        $("#cbbValor").dropdown();

//        $("#cbbValor").change(function () {
//            //setea el valor de el parametro de filtro (ID)
//            iframeData.routeValue = $("#cbbValor").val();
//            const url = `/Report/${iframeData.action}?filtervalue=${iframeData.routeValue}&filtertype=${iframeData.filterType}`;
//            $("#ifrReport").prop("src", url);
//        });
//    }
//}

function getHotels() {
    $("#cbbValor").parents(".field").show();
    $("#txtValor").parents(".field").hide();
    const response = ajaxRequest(urlAPI+"/API/Hotels/List");

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "hotel"
            },
            placeholder: {
                empty: "No se encontraron hoteles disponibles",
                default: "Seleccione un hotel",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#cbbValor").dropdown();

        $("#cbbValor").change(function () {
            iframeData.routeValue = $("#cbbValor").val();
            const url = `/Report/${iframeData.action}?filtervalue=${iframeData.routeValue}&filtertype=${iframeData.filterType}`;
            $("#ifrReport").prop("src", url);
        });
    }
}

function getpaquetes() {
    $("#cbbValor").parents(".field").show();
    $("#txtValor").parents(".field").hide();
    const response = ajaxRequest(urlAPI+"/API/DefaultPackages/List");

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "descripcion_Paquete"
            },
            placeholder: {
                empty: "No se encontraron paquetes disponibles",
                default: "Seleccione un paquete",
            },
            semantic: true
        }

        FillDropDown(dropdownData);
        $("#cbbValor").dropdown();

        $("#cbbValor").change(function () {
            iframeData.routeValue = $("#cbbValor").val();
            const url = `/Report/${iframeData.action}?filtervalue=${iframeData.routeValue}&filtertype=${iframeData.filterType}`;
            $("#ifrReport").prop("src", url);
        });
    }
}

function getDate() {
    $("txtValor").val("");
    $("#cbbValor").parents(".field").hide();
    $("#txtValor").parents(".field").show();
    $('#standard_calendar').calendar({ type: 'date' });
    $("#filtrar").click(function () {
        iframeData.routeValue = getCalendarDate($("#txtValor").val());
        const url = `/Report/${iframeData.action}?filtervalue=${iframeData.routeValue}&filtertype=${iframeData.filterType}`;
        $("#ifrReport").prop("src", url);
    });
}





