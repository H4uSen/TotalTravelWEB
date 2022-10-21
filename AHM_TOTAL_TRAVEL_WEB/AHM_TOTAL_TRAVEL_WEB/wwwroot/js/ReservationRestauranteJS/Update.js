/*/*RESERVACION RESTAURANTE*/
$(".ui.dropdown").dropdown();


const params = new URLSearchParams(window.location.search);
const izziSuccess = params.get("success");

if (izziSuccess == "true") {
    iziToastAlert(title = "Proceso completado", message = "La acción se ha completado exitosamente.", type = "success");
}



function updateReservacionRestaurant() {

 
        const ValidateArray = [
            { validateMessage: "Seleccione una reservacion", Jqueryinput: $("#Resv_ID") },
            { validateMessage: "Seleccione un restaurante", Jqueryinput: $("#Rest_ID") },
            { validateMessage: "Ingrese una Fecha", Jqueryinput: $("#ReRe_FechaReservacion") },
            { validateMessage: "Ingrese la Hora", Jqueryinput: $("#ReRe_HoraReservacion") },

        ];
        const userValidate = ValidateForm(ValidateArray);
    if (userValidate)
    {
            $("#FrmReservationRestaurante").submit();
        }
    
    var response = ajaxRequest("ReservationRestaurant/Update?id=" + id, null, "PUT");
        if (response.data.codeStatus > 0) {
            window.location.href = '/ReservationRestaurant?success=true';
        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }
}