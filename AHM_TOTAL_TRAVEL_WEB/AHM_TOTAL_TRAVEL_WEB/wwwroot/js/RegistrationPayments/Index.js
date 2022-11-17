
// ----------------------------------- TABLE INIZIALIZE ------------------------------------
const CitiesList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Cities/List");
const SuburbsList = ajaxRequest("https://totaltravelapi.azurewebsites.net/API/Suburbs/List");
TableSearchInput($("#txtSearch"), $("#grdPaymentRecord"), elemPerPage = 10);
TableDetailsConstructor($("#grdPaymentRecord"));

$("#grdPaymentRecord").paginationTdA({
    elemPerPage: 5
});


$(document).ready(function () {

    var table = $("#grdPaymentRegist").DataTable({
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
                    columns: [0, 1, 2, 3, 4, 5, 6]
                }
            },
            {
                extend: 'excelHtml5',
                text: '<i class="file excel icon"></i> Exportar a excel',
                className: "btn-primary ui small btn-grey text-purple icon ui button mb-2",
                exportOptions: {
                    columns: [0, 1, 2, 3, 4, 5, 6]
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


function Delete(id) {
    const capsula1 = () => {
        ajaxRequest("/RecordPayment/Delete?Id=" + id, null, "POST")
        location.reload();
    };

    sweetAlertconfirm("Estas Seguro de Eliminar el Registro Seleccionado?", "Este registro se borrara permanentemente", "warning", capsula1);
};