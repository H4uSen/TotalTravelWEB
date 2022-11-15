const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

//if (izziSuccess == "true") {
//    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
//}

// ----------------------------------- EVENTS ------------------------------------
$(document).ready(function () {

    var table = $("#grdReservationExtraActivities").DataTable({
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
                    columns: [0, 1, 2, 3, 4, 5]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5]
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



function DeleteReservacionActividadesextras(id) {
    const capsula1 = () => {
        var response = ajaxRequest("ReservationExtraActivities/Delete?id=" + id, null, "POST");

        window.location.href = '/ReservationExtraActivities?success=true';

    };

    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};