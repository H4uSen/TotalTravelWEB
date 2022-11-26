// ----------------------------------- TABLE INIZIALIZE ------------------------------------
const CitiesList = ajaxRequest(urlAPI+"/API/Cities/List");
const SuburbsList = ajaxRequest(urlAPI+"/API/Suburbs/List");
TableSearchInput($("#txtSearch"), $("#grdPaises"), elemPerPage = 10);
TableDetailsConstructor($("#grdPaises"));

$("#grdPaises").paginationTdA({
    elemPerPage: 5
});

// ----------------------------------- EVENTS ------------------------------------
//<--- Configuraciones de las Datatables---->
//Contenido que va dentro de la tabla
function format(detailData, rowId) {
    // `d` is the original data object for the row
    detailData = detailData.filter(x => x.paisID == rowId);

    if (detailData.length <= 0) {
        return (
            `<div>
              <h2>No hay registros para mostrar</h2>
            </div>`);

    }
    else {
        var structure = `<div class="ui fluid vertical menu">`;
        for (var i = 0; i < detailData.length; i++) {

            const city = detailData[i];
            const fechaCreacion = GetDateFormat({
                string_date: city.fechaCrea, hour_format: 12, date_format: "default"
            });

            structure +=
                `<tr data-value="${city.id}">
                        <td class="ui fluid vertical menu" style="margin:unset">
                            <a class="item">
                                <h1 class="ui medium header">Ciudad: ${city.ciudad}</h1>
                                <p>Creado el: ${fechaCreacion.datetime}</p>
                            </a>
                        </td>
                    </tr>`;
        }
        return structure;
    }

}

$(document).ready(function () {
    // Add event listener for opening and closing details
    $("#grdCountry").on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var id = $(tr).attr('data-value');
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            $(tr).removeClass("dt-hasChild");
        } else {
            // Open this row
            row.child(format(CitiesList.data, id)).show();
            $(tr).addClass("dt-hasChild");
        }
    });
    //Sirve para rellenar la subtabla de la tabla maestra
    $("#grdCountry").on('requestChild.dt', function (e, row) {
        row.child(format(CitiesList.data, id)).show();
    });
    var table = $("#grdCountry").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        //Aqui se ingresa el numero de columnas que tiene la tabla
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            {},
            {},
            {},
            {},
            {}
        ],
        order: [[1, 'asc']],
        dom: 'Bfrtip',

        //Son los botones de acciones para exportar
        buttons: [
            {
                extend: 'pdfHtml5',
                text: '<i class= "file pdf icon"></i> Exportar como PDF',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4]
                }
            },
            {
                extend: 'csvHtml5',
                text: '<i class="file csv icon"></i> Exportar como CSV',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2"
            },
        ]
    });
});


// ----------------------------------- FUNCTIONS ------------------------------------

function citiesListDetails(id_pais) {
    var state = false;
    var cities = CitiesList.data;

    if (CitiesList.code == 200) {

        var Detail =
            `
            <h5 class="ui large header">Lista de ciudades</h5>
            <table class="ui compact selectable celled table" id="grdCiudades_id_pais_${id_pais}">
                <thead style="visibility:collapse">
                    <tr>
                        <th>Ciudad</th>
                    </tr>
                </thead>
                <tbody>`;

        cities = jQuery.grep(cities, function (city, i) {
            return city.paisID == id_pais;
        });

        if (cities.length > 0) {
            for (var i = 0; i < cities.length; i++) {

                const city = cities[i];
                const fechaCreacion = GetDateFormat({
                    string_date: city.fechaCrea, hour_format: 12, date_format: "default"
                });

                Detail +=
                    `<tr data-value="${city.id}">
                        <td class="ui fluid vertical menu" style="margin:unset">
                            <a class="item">
                                <h1 class="ui medium header">Ciudad: ${city.ciudad}</h1>
                                <p>Creado el: ${fechaCreacion.datetime}</p>
                            </a>
                        </td>
                    </tr>`;
            }

            Detail += "</tbody>";

            state = true;
        } else {
            Detail =`<h5 class='ui large red header text-center'>NO SE ENCOTRARON CIUDADES</h5>`;
        }

        return { content: Detail, state: state};
    }
}

//function suburbsListDetails(id_ciudad) {
//    var state = false;
//    var Suburbs = SuburbsList.data;

//    if (SuburbsList.code == 200) {
//        var Detail =
//            `<h4>Lista de colonias<h4>
//            <div class="ui fluid vertical menu" data-show="5" id="grd_colonias_id_ciudad_${id_ciudad}">`;

//        Suburbs = jQuery.grep(Suburbs, function (Suburb, i) {
//            return Suburb.ciudadID == id_ciudad;
//        });

//        if (Suburbs.length > 0) {
//            for (var i = 0; i < Suburbs.length; i++) {

//                const Suburb = Suburbs[i];
//                const fechaCreacion = GetDateFormat({
//                    string_date: Suburb.fecha_Creacion, hour_format: 12, date_format: "default"
//                });
//                Detail +=
//                    `<a class="item">
//                        <h1 class="ui medium header">Colonia: ${Suburb.colonia}</h1>
//                        <p>Creado el: ${fechaCreacion.datetime}</p>
//                    </a>`;
//            }
//            Detail += "</div>";
//            Detail +=
//                `<div class="ui fluid vertical menu">
//                    <a class="item" id="btnSuburbs_ShowMore">Ver Mas...</a>
//                    <a class="item" id="btnSuburbs_ShowLess">Ver Menos...</a>
//                </div>`;

//            state = true;
//        } else {
//            Detail = `<h5 class='ui large red header text-center'>NO SE ENCOTRARON COLONIAS</h5>`;
//        }

//        return { content: Detail, state: state };
//    }
//}

//function show(ListQuerySelector, indexToShow = 5) {
//    for (var i = 0; i < ListQuerySelector.length; i++) {
//        $(ListQuerySelector[i]).hide();
//    }

//    for (var i = 0; i < indexToShow; i++) {
//        $(ListQuerySelector[i]).show();
//    }
//}

function Delete(id) {
    const capsula1 = () => {
        ajaxRequest("/Countries/Delete?id=" + id, null, "POST")
        location.reload();
    };

    sweetAlertconfirm("¿Desea eliminar este registro?", "Este registro se borrara permanentemente", "warning", capsula1);
};