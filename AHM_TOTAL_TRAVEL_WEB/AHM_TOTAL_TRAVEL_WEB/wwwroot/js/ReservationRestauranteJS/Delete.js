const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

//if (izziSuccess == "true") {
//    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
//}

// ----------------------------------- EVENTS ------------------------------------
$("#txtSearch").keyup(function () {
    _this = this;
    $.each($("#grdReservationRestaurants tbody tr"), function () {
        if ($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1) {
            $(this).hide();
        }
        else {
            $(this).show();
        }
    });

    $("#grdReservationRestaurants").paginationTdA({
        elemPerPage: 10
    });
});

$("#grdReservationRestaurants").paginationTdA({
    elemPerPage: 10
});


function DeleteReservacionRestaurante(id) {
    const capsula1 = () => {
        var response = ajaxRequest("ReservationRestaurant/Delete?id=" + id, null, "POST");
        
            window.location.href = '/ReservationRestaurant?success=true';
        
    };

    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};