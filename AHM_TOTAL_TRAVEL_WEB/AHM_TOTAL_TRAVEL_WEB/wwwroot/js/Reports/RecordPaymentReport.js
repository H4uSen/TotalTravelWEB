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
    "RecordPaymentReportPDF": [
        { filter: "Id_cliente", source: getTipoParnet, text: "DNI" },



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
            empty: "No se encontraron clientes disponibles",
            default: "Seleccione un DNI",
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

//rellena el segundo dronwdon funcion de registro de pagos 
function getClient() {
    var response = ajaxRequest("https://totaltravel.somee.com/API/Users/List");

    response = jQuery.grep(response.data, function (item, i) {
        return item.role_ID == 2;

    });

    if (response.code == 200) {

        const dropdownData = {
            dropdown: $("#cbbValor"),
            items: {
                list: response.data,
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

