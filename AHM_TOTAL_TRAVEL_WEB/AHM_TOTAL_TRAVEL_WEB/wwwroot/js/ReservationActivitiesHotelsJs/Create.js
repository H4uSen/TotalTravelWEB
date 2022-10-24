$('.ui.dropdown').dropdown();


$("#enviar").click(() => {
    CreatesReservationActivitiesHotels();
})


function CreatesReservationActivitiesHotels() {


    validateArrayForm = [
        { validateMessage: "Required field: 'Seleccione una reservacion'", Jqueryinput: $("#Resv_ID") },
        { validateMessage: "Required field: 'Ingrese una cantidad' ", Jqueryinput: $("#ReAH_Cantidad") },
        { validateMessage: "Required field: 'Seleccione una actividad' ", Jqueryinput: $("#AcEx_ID") },
        { validateMessage: "Required field: 'Ingrese la fecha' ", Jqueryinput: $("#ReAH_FechaReservacion") },
        { validateMessage: "Required field: 'Ingrese la hora' ", Jqueryinput: $("#ReAH_HoraReservacion") }

    ];

    const ValidateFormStatus = ValidateForm(validateArrayForm);

    if (ValidateFormStatus) {
        $('#CreateReservationActivitiesHotels').submit();
    }


}