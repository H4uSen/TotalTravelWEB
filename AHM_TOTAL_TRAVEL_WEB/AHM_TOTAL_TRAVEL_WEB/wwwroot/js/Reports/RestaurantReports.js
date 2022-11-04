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
    "RestauranteReportPDF": [
        { filter: "tipo_transporte", source: getRestaurante, text: "tipo de transporte" },
        { filter: "tipo_Parnert", source: getTipoParnet, text: "partners" },
        { filter: "Ciudad", source: getCiudad, text: "Ciudad" },


    ],
};

$(".ui.dropdown").dropdown();

iframeData.action = action;

getFilter();

function getFilter() {

    console.log()
    const dropdownData = {
        dropdown: $("#cbbFiltro"),
        items: {
            list: filterSource[action],
            valueData: "filter",
            textData: "text"
        },
        placeholder: {
            empty: "No se encontraron transporte disponibles",
            default: "Seleccione un transporte",
        },
        semantic: true
    }

    FillDropDown(dropdownData);
    $("#cbbFiltro").dropdown();

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

//rellena el segundo dronwdon
function getTipoParnet() {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Partners/List");

    //response = jQuery.grep(response.data, function (item, i) {
    //    return item.tipoPartner_Id == 2;

    //});

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "nombre"
            },
            placeholder: {
                empty: "No se encontraron Partner disponibles",
                default: "Seleccione un Partner",
            },
            semantic: true
        }
        console.log("prueba")

        FillDropDown(dropdownData);
        $("#cbbValor").dropdown();

        $("#cbbValor").change(function () {
            //setea el valor de el parametro de filtro (ID)
            iframeData.routeValue = $("#cbbValor").val();
            const url = `/Report/${iframeData.action}?filtervalue=${iframeData.routeValue}&filtertype=${iframeData.filterType}`;
            $("#ifrReport").prop("src", url);
        });
    }
}

function getRestaurante() {
    const response = ajaxRequest("https://totaltravel.somee.com/API/Restaurants/List");

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "restaurante"
            },
            placeholder: {
                empty: "No se encontraron restaurantes disponibles",
                default: "Seleccione un restaurante",
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


function getCiudad() {
    const response = ajaxRequest("https://totaltravel.somee.com/API/Cities/List");

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "ciudad"
            },
            placeholder: {
                empty: "No se encontraron ciudades disponibles",
                default: "Seleccione una ciudad",
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





