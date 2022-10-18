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

        var data = new FormData();
        data.append("Resv_ID", parseInt($("#Resv_ID").val())); 
        data.append("AcEx_ID", parseInt($("#AcEx_ID").val()));
        data.append("ReAE_Cantidad", $("#ReAE_Cantidad").val());
        data.append("ReAE_FechaReservacion", $("#ReAE_FechaReservacion").val());
        data.append("ReAE_HoraReservacion", $("#ReAE_HoraReservacion").val());
        data.append("ReAE_UsuarioCreacion", parseInt(Client_User_ID));


        data.append("file", $("#File").prop("files")[0]);
        var response = uploadFile("https://totaltravel.somee.com/API/ReservationActivitiesExtra/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/ReservationActivitiesExtra?success=true';


        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }

    }


}