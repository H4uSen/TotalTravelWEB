﻿
// ----------------------------------- INIZIALIZE ------------------------------------

TableSearchInput($("#txtSearch"), $("#grdUsuarios"), elemPerPage = 10);

TableDetailsConstructor($("#grdUsuarios"));

$("#grdUsuarios").paginationTdA({
    elemPerPage: 10
});


$(document).ready(function () {

    var table = $("#grdUsers").DataTable({
        stateSave: true,
        language: {
            "url": "https://cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
        },
        //Aqui se ingresa el numero de columnas que tiene la tabla
        columns: [
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

// ----------------------------------- EVENTS ------------------------------------

// ----------------------------------- FUNCTIONS ------------------------------------

function DeleteUser(User_Id) {
    const callback = () => {

        const response = ajaxRequest(`Users/Delete?User_Id=${User_Id}`, null, "POST");
        if (response > 0) {
            window.location.href = '/Users?success=true';
        }
    };

    sweetAlertconfirm(
        "Estas Seguro de Eliminar el Registro Seleccionado?",
        "Este registro se borrara permanentemente", "warning",
        callback
    );

};