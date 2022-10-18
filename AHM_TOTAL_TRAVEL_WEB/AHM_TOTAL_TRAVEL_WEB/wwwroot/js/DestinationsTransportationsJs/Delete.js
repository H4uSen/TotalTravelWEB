const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}

// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#tabla tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#tabla").paginationTdA({
        elemPerPage: 10
    });
});

$("#tabla").paginationTdA({
    elemPerPage: 10
});

function DeleteDsTr(id) {
    const capsula1 = () => {
        var response = ajaxRequest("DestinationsTransportations/Delete?id=" + id, null, "POST");
        if (response > 0) {
            window.location.href = '/DestinationsTransportations?success=true';
        }
    };

    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrará permanentemente.", "warning", capsula1);
};