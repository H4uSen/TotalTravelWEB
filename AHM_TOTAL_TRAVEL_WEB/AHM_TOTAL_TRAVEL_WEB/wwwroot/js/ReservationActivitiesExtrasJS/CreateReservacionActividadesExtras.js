$('.ui.dropdown').dropdown();


$("#btnCreateReservationActivityExtra").click(() => {
    createreservationactividadesextra();
})


function createreservationactividadesextra() {


    const userValidateArray = [
        { validateMessage: "Required field: 'Seleccione una reservacion'", Jqueryinput: $("#Resv_ID") },
        { validateMessage: "Required field: 'Ingrese una cantidad' ", Jqueryinput: $("#ReAE_Cantidad") },
        { validateMessage: "Required field: 'Seleccione una actividad' ", Jqueryinput: $("#AcEx_ID") },
        { validateMessage: "Required field: 'ingrese la fecha' ", Jqueryinput: $("#ReAE_FechaReservacion") },
        { validateMessage: "Required field: 'ingrese la hora' ", Jqueryinput: $("#ReAE_HoraReservacion") },

    ];

    const ReservacionActividadValidate = ValidateForm(userValidateArray);



    if (ReservacionActividadValidate) {

        $('#CreateReservationActividadExtra').submit()

    }


}