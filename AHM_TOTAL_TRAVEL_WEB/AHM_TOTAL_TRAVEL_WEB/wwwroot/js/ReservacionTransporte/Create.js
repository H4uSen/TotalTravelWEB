/*/*Reservacion transporte*/

$('.ui.dropdown').dropdown();


$("#btnCreateReservationTransporte").click(() => {
    createreservationtransporte();
})


function createreservationtransporte() {


    const userValidateArray = [
        { validateMessage: "Required field: 'Seleccione una Reservacion'", Jqueryinput: $("#Resv_ID") },
        { validateMessage: "Required field: 'Seleccione un Restaurante' ", Jqueryinput: $("#Detr_ID") },
        { validateMessage: "Required field: 'Ingrese la cantidad' ", Jqueryinput: $("#ReTr_CantidadAsientos") },
        { validateMessage: "Required field: 'ingrese si cancelo' ", Jqueryinput: $("#ReTr_Cancelado") },
        { validateMessage: "Required field: 'ingrese la fecha' ", Jqueryinput: $("#ReTr_FechaCancelado") },

    ];

    const ReservacionActividadValidate = ValidateForm(userValidateArray);



    if (ReservacionActividadValidate) {

        $("#ReTr_Cancelado").val(false);

        if ($("#ReTr_Cancelado").prop('checked')){

            $("#ReTr_Cancelado").val(true);
        }
        $('#CreateReservationTransporte').submit()


    }


}