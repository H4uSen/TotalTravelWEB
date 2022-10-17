$('.ui.dropdown').dropdown();

function createreservationactividadesextra() {


    if ($('#Resv_ID').val() == 0) {
        $("#labelvalidatorReserva").html("Seleccione una reserva.");
    }
    else {
        $("#labelvalidatorNombre").html(" ");
    }
    if ($('#AcEx_ID').val() == 0) {
        $("#labelvalidatorAcEx_ID").html("Seleccione una actividad extra.");
    }
    else {
        $("#labelvalidatorAcEx_ID").html(" ");
    }
    if ($('#ReAE_Cantidad').val() == 0) {
        $("#labelvalidatorReAE_Cantidad").html("Ingrese una cantidad.");
    }
    else {
        $("#labelvalidatorReAE_Cantidad").html(" ");
    }
    if ($('#ReAE_FechaReservacion').val() == 0) {
        $("#labelvalidatorReAE_FechaReservacion").html("Ingrese una fehca.");
    }
    else {
        $("#labelvalidatorReAE_FechaReservacion").html(" ");
    }
    if ($('#ReAE_HoraReservacion').val() == 0) {
        $("#labelvalidatorReAE_HoraReservacion").html("Ingrese una hora.");
    } else {
        $("#labelvalidatorReAE_HoraReservacion").html(" ");
    }




    if ($('#Resv_ID').val() != 0 && $('#AcEx_ID').val() != 0 && $('#ReAE_Cantidad').val() != 0 && $('#ReAE_FechaReservacion').val() != 0 && $('#ReAE_HoraReservacion').val() != 0) {

        /*var images = [];*/
        var data = new FormData();
        data.append("Resv_ID", parseInt($("#Resv_ID").val())); 
        data.append("AcEx_ID", parseInt($("#AcEx_ID").val()));
        data.append("ReAE_Cantidad", $("#ReAE_Cantidad").val());
        data.append("ReAE_FechaReservacion", $("#ReAE_FechaReservacion").val());
        data.append("ReAE_HoraReservacion", $("#ReAE_HoraReservacion").val());
        data.append("ReAE_UsuarioCreacion", parseInt(Client_User_ID));


        data.append("file", $("#File").prop("files")[0]);
        var response = uploadFile("https://totaltravel.somee.com/API/Reservation/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Reservation?success=true';


        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }

    }


}