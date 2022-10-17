$('.ui.dropdown').dropdown();

function createreservationactividadesextra() {


    if ($('#Resv_ID').val() == 0) {
        $("#labelvalidatorNombre").html("Ingrese un Nombre.");
    }
    else {
        $("#labelvalidatorNombre").html(" ");
    }
    if ($('#AcEx_ID').val() == 0) {
        $("#labelvalidatorEmail").html("Ingrese un Email.");
    }
    else {
        $("#labelvalidatorEmail").html(" ");
    }
    if ($('#ReAE_FechaReservacion').val() == 0) {
        $("#labelvalidatorTelefono").html("Ingrese un Telefono.");
    }
    else {
        $("#labelvalidatorTelefono").html(" ");
    }
    if ($('#ReAE_HoraReservacion').val() == 0) {
        $("#labelvalidatorTiPar").html("Seleccione un Tipo de Socio.");
    } else {
        $("#labelvalidatorTiPar").html(" ");
    }




    if ($('#Nombre').val() != 0 && $('#Email').val() != 0 && $('#Telefono').val() != 0 && $('#TiPart_Id').val() != 0) {

        /*var images = [];*/
        var data = new FormData();
        data.append("part_Nombre", $("#Nombre").val());
        data.append("part_Email", $("#Email").val());
        data.append("part_Telefono", $("#Telefono").val());
        data.append("tiPart_Id", parseInt($("#TiPart_Id").val()));
        data.append("part_UsuarioCreacion", parseInt(Client_User_ID));

        //for (let i = 0; i < $('#File').prop('files').length; i++) {
        //    const file = $('#File').prop('files')[i];
        //    images.push(file); //IFORMFILE
        //}

        data.append("file", $("#File").prop("files")[0]);
        var response = uploadFile("https://totaltravel.somee.com/API/Partners/Insert", data, "POST");

        if (response.data.codeStatus > 0) {
            window.location.href = '/Partners?success=true';


        } else {

            $("#labelvalidatorError").html("Ha ocurrido un error, intentelo de nuevo.");
        }

    }


}