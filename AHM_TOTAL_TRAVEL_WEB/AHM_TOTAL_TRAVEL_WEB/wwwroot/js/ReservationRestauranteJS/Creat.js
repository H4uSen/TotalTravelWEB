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

        var data = new FormData();
        data.append("Resv_ID", parseInt($("#Resv_ID").val()));
        data.append("Rest_ID", parseInt($("#Rest_ID").val()));
        data.append("ReRe_FechaReservacion", $("#ReRe_FechaReservacion").val());
        data.append("ReRe_HoraReservacion", $("#ReRe_HoraReservacion").val());
        data.append("ReRe_UsuarioCreacion", parseInt(Client_User_ID));


        data.append("file", $("#File").prop("files")[0]);
        var response = uploadFile("https://totaltravel.somee.com/API/ReservationRestauran/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/ReservationRestauran?success=true';


        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }

    }


}