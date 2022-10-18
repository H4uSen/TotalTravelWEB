/*/*Reservacion restauratne*/

$('.ui.dropdown').dropdown();


$("#btnCreateReservationrestaurante").click(() => {
    createreservationactividadesextra();
})


function createreservationactividadesextra() {


    const userValidateArray = [
        { validateMessage: "Required field: 'Seleccione una Reservacion'", Jqueryinput: $("#Resv_ID") },
        { validateMessage: "Required field: 'Seleccione un Restaurante' ", Jqueryinput: $("#Rest_ID") },
        { validateMessage: "Required field: 'ingrese la fecha' ", Jqueryinput: $("#ReRe_FechaReservacion") },
        { validateMessage: "Required field: 'ingrese la hora' ", Jqueryinput: $("#ReRe_HoraReservacion") },

    ];

    const ReservacionActividadValidate = ValidateForm(userValidateArray);



    if (ReservacionActividadValidate) {

        $('#CreateReservationRestaurant').submit()
        

    }


}