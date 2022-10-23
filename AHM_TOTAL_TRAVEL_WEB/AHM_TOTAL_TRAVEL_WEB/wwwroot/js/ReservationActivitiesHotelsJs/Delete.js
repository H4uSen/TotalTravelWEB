const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

//if (izziSuccess == "true") {
//    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
//}

// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdReservationExtraActivities tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdReservationExtraActivities").paginationTdA({
        elemPerPage: 10
    });
});

$("#grdReservationExtraActivities").paginationTdA({
    elemPerPage: 10
});



function DeleteReservacionActividadesextras(id) {
    const capsula1 = () => {
        var response = ajaxRequest("ReservationExtraActivities/Delete?id=" + id, null, "POST");

        window.location.href = '/ReservationExtraActivities?success=true';

    };

    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};