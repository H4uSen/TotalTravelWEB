const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

//if (izziSuccess == "true") {
//    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
//}

// ----------------------------------- EVENTS ------------------------------------



function DeleteReservacionActividadesextras(id) {
    const capsula1 = () => {
        var response = ajaxRequest("ReservationExtraActivities/Delete?id=" + id, null, "POST");

        window.location.href = '/ReservationExtraActivities?success=true';

    };

    sweetAlertconfirm("¿Seguro de eliminar este registro?", "Este registro se borrara permanentemente.", "warning", capsula1);

};