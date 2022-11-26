const params = new URLSearchParams(window.location.search);
const SuccessDelete = params.get("success-d");

if (SuccessDelete == "true") {
    iziToastAlert(title = "Proceso completado", message = "El menú se ha eliminado exitosamente.", type = "success");
}

const SuccessCreate = params.get("success-c");

if (SuccessCreate == "true") {
    iziToastAlert(title = "Proceso completado", message = "El menú se ha creado exitosamente.", type = "success");
}

const SuccessUpdate = params.get("success-u");

if (SuccessUpdate == "true") {
    iziToastAlert(title = "Proceso completado", message = "El menú se ha actualizado exitosamente.", type = "success");
}


// ----------------------------------- EVENTS ------------------------------------

$(document).ready(function () {

    var table = $("#grdMenus").DataTable({
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
                    columns: [0, 1, 2, 3 ,4 ,5]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2, 3 ,4 ,5]
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





function DeleteMenus(id) {
    const capsula1 = () => {
        var response = ajaxRequest("Menus/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/Menus?success-d=true';
        }
    };
    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};