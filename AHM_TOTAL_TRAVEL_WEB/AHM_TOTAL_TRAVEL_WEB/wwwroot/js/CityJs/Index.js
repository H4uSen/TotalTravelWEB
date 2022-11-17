
const ColoniasList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
TableDetailsConstructor($("#grdCity"));

TableSearchInput($("#txtSearch"), $("#grdCity"), 10);

$("#grdCity").paginationTdA({
    elemPerPage: 10
});

//-------------------------------EVENTOS-----------------------------

function format(detailData, rowId) {
    // `d` is the original data object for the row
    detailData = detailData.filter(x => x.ciudadID == rowId);

    if (detailData.length <= 0) {
        return (
            `<div>
              <h2>No hay registros para mostrar</h2>
            </div>`);

    }
    else {
        var structure = `<div class="ui fluid vertical menu">`;
        for (var i = 0; i < detailData.length; i++) {

            const colonia = detailData[i];
            const fechaCreacion = GetDateFormat({
                string_date: colonia.fecha_Creacion, hour_format: 12, date_format: "default"
            });

            structure +=
                `<a class="item">
                        <h1 class="ui medium header">Colonia: ${colonia.colonia}</h1>
                        <p>Creado el: ${fechaCreacion.datetime}</p>
                    </a>`;
        }
        return structure;
    }

}

$(document).ready(function () {
    // Add event listener for opening and closing details
    $("#grdCities").on('click', 'tbody td.dt-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        var id = $(tr).attr('data-value');
        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            $(tr).removeClass("dt-hasChild");
        } else {
            // Open this row
            row.child(format(ColoniasList.data, id)).show();
            $(tr).addClass("dt-hasChild");
        }
    });
    //Sirve para rellenar la subtabla de la tabla maestra
    $("#grdCities").on('requestChild.dt', function (e, row) {
        row.child(format(ColoniasList.data, id)).show();
    });
    var table = $("#grdCities").DataTable({
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
                    columns: [0, 1, 2]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2]
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





function SuburbsListDetails(id_ciudad) {
    var colonias = ColoniasList.data;

    if (ColoniasList.code == 200 && colonias.length > 0) {

        colonias = jQuery.grep(colonias, function (colonia, i) {
            return colonia.ciudadID == id_ciudad;
        });

        if (colonias.length > 0) {

            var Detail =
                `<h4>Lista de colonias<h4>
                <div class="ui fluid vertical menu" data-show="5" id="grd_colonias_id_ciudad_${id_ciudad}">`;

            for (var i = 0; i < 5; i++) {

                const colonia = colonias[i];

                const fechaCreacion = GetDateFormat({
                    string_date: colonia.fecha_Creacion, hour_format: 12, date_format: "default"
                });

                Detail +=
                    `<a class="item">
                        <h1 class="ui medium header">Colonia: ${colonia.colonia}</h1>
                        <p>Creado el: ${fechaCreacion.datetime}</p>
                    </a>`;
            }

            Detail += "</div>";
            Detail +=
                `<div class="ui fluid vertical menu">
                    <a class="item" id="btnSuburbs_ShowMore">Ver Mas...</a>
                    <a class="item" id="btnSuburbs_ShowLess">Ver Menos...</a>
                </div>`;
        } else {
            var Detail = "<h5 class='ui large red header text-center'>NO HAY COLONIAS DISPONIBLES</h5>";
        }

        return Detail;
    } else {
        return "<h5 class='ui large red header text-center'>NO HAY COLONIAS DISPONIBLES</h5>";
    }

}

function show(ListQuerySelector, indexToShow = 5) {
    for (var i = 0; i < ListQuerySelector.length; i++) {
        $(ListQuerySelector[i]).hide();
    }

    for (var i = 0; i < indexToShow; i++) {
        $(ListQuerySelector[i]).show();
    }
}