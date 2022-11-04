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
    "TransportReportPDF": [
        { filter: "tipo_transporte", source: getTipoTransporte, text: "Tipo de transporte" },
        { filter: "tipo_Parnert", source: getTipoParnet, text: "Socio" },
        { filter: "Ciudad", source: getCiudad, text: "Ciudad" },
    ],
    "ClientReportPDF": [
        { filter: "sexo", source: getSexo, text: "Sexo" },
        { filter: "colonia", source: getColonias, text: "Colonia" },
        { filter: "partner", source: getPartners, text: "Socio" }
    ],
    "DefaultPackagesReportPDF": [
        { filter: "id_hotel", source: gethotel, text: "Hotel" },

    ],
    "DefaultPackagesReportPDF": [
        { filter: "id_restaurante", source: getrestaurant, text: "restaurante" },

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
            empty: "No se encontraron filtros disponibles",
            default: "Seleccione un filtro",
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
                empty: "No se encontraron socios disponibles",
                default: "Seleccione un socio",
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

function getTipoTransporte() {
    const response = ajaxRequest("https://totaltravel.somee.com/API/TypesTransport/List");

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "trasporte"
            },
            placeholder: {
                empty: "No se encontraron transportes disponibles",
                default: "Seleccione un transporte",
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

function getSexo() {
    var response = [
        {
            id: "Femenino",
            text: "Femenino"
        },
        {
            id: "Masculino",
            text: "Masculino"
        }
    ];



    const dropdownData = {
        dropdown: $("#cbbValor"),
        items: {
            list: response,
            valueData: "id",
            textData: "text"
        },
        placeholder: {
            empty: "No se encontraron resultados disponibles",
            default: "Seleccione un sexo",
        },
        semantic: true
    }

    FillDropDown(dropdownData);
    $("#cbbValor").dropdown();

    $("#cbbValor").change(function () {
        //setea el valor de el parametro de filtro (ID)
        iframeData.routeValue = $("#cbbValor").val();
        const url = `/Report/${iframeData.action}?filtervalue=${iframeData.routeValue}&filtertype=${iframeData.filterType}`;
        $("#ifrReport").prop("src", url);
    });
}

function getColonias() {
    const response = ajaxRequest("https://totaltravel.somee.com/API/Suburbs/List");

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "colonia"
            },
            placeholder: {
                empty: "No se encontraron colonias disponibles",
                default: "Seleccione una colonia",
            },
            semantic: true
        }

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

function getPartners() {
    const response = ajaxRequest("https://totaltravel.somee.com/API/Partners/List");

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
                valueData: "id",
                textData: "nombre"
            },
            placeholder: {
                empty: "No se encontraron socios disponibles",
                default: "Seleccione un socio",
            },
            semantic: true
        }

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
//rellena el segundo dronwdon funcion de registro de pagos 
function getClient() {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Users/List");



    if (response.code == 200) {

        response = jQuery.grep(response.data, function (item, i) {
            return item.role_ID == 2;

        });


        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response,
                valueData: "id",
                textData: "nombrecompleto"
            },
            placeholder: {
                empty: "No se encontraron clientes disponibles",
                default: "Seleccione un cliente",
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


//rellena el segundo dronwdon funcion de registro paquetes predeterminados 
function getHotel() {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Hotels/List");



    if (response.code == 200) {

        response = jQuery.grep(response.data, function (item, i) {
            return item.ID_Hotel == 2;

        });


        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response,
                valueData: "id",
                textData: "hotel"
            },
            placeholder: {
                empty: "No se encontraron hotelesdisponibles",
                default: "Seleccione un hotel",
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

//rellena el segundo dronwdon funcion de registro paquetes restaurante
function getrestaurant() {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Restaurants/List");



    if (response.code == 200) {

        response = jQuery.grep(response.data, function (item, i) {
            return item.ID_restaurante == 2;

        });


        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response,
                valueData: "id",
                textData: "restaurante"
            },
            placeholder: {
                empty: "No se encontraron restaurantes disponibles",
                default: "Seleccione un restaurante",
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



