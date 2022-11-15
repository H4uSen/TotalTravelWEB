﻿
//const izziSuccess = FindGetValue("success");

//const City_ID = FindGetValue("City_ID");
//if (City_ID != null) {
//    fillSuburbs(City_ID);
//}

//if (izziSuccess == "true") {
//    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
//}

// ----------------------------------- EVENTS ------------------------------------

$(document).ready(function () {

    var table = $("#tabla").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        //Aqui se ingresa el numero de columnas que tiene la tabla
        columns: [
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


// ----------------------------------- FUNCTIONS ------------------------------------

function DeleteColo(id) {
    const capsula1 = () => {
        var response = ajaxRequest("Suburbs/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Suburbs?success=true';
        }
    };

    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrará permanentemente.", "warning", capsula1);
};

function fillSuburbs(City_ID) {
    const suburbsArray = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
    var suburbs = suburbsArray.data;

    if (suburbsArray.code == 200 && suburbs.length > 0) {

        suburbs = jQuery.grep(suburbs, function (suburb, i) {
            return suburb.ciudadID == City_ID;
        });

        $("#tabla tbody").empty();
        for (var i = 0; i < suburbs.length; i++) {
            const suburb = suburbs[i];
            const newRow =
                `<tr>
                    <td>${suburb.colonia}</td>
                    <td>${suburb.ciudad}</td>

                    <td>
                        <button class="ui large icon btn-edit button" id="UpdateBottomColo" onclick="editar(${suburb.id})">
                            <i class="pencil alternate icon icon-crud"></i>
                        </button>
                        <button class="ui large icon btn-delete button" onclick="DeleteColo(${suburb.id})">
                            <i class="trash alternate icon icon-crud"></i>
                        </button>
                        <a class="ui large icon button" href="Suburbs/Details/${suburb.id}">
                            <i class="bi bi-info-circle fa-lg icon-crud"></i>
                        </a>
                    </td>
                </tr>`;

            $("#tabla tbody").append(newRow);

        }
    }
}