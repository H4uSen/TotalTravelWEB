$("#errorDiv").hide();

function updateTransport(id) {

    if ($('#Colonia').val() == 0) {
        $("#labelvalidatorCol").html("Ingrese una colonia.");
    }
    else {
        $("#labelvalidatorCol").html(" ");
    }
    if ($('#Calle').val() == 0) {
        $("#labelvalidatorCalle").html("Ingrese una calle.");
    }
    else {
        $("#labelvalidatorCalle").html(" ");
    }
    if ($('#Avenida').val() == 0) {
        $("#labelvalidatorAve").html("Ingrese una avenida.");
    }
    else {
        $("#labelvalidatorAve").html(" ");
    }
    if ($('#Count_ID').val() == 0) {
        $("#labelvalidatorPais").html("Seleccione un país.");
    } else {
        $("#labelvalidatorPais").html(" ");
    }
    if ($('#City_ID').val() == 0) {
        $("#labelvalidatorCiudad").html("Seleccione una ciudad.");
    } else {
        $("#labelvalidatorCiudad").html(" ");
    }
    if ($('#Part_ID').val() == 0) {
        $("#labelvalidatorPartner").html("Seleccione un socio.");
    } else {
        $("#labelvalidatorPartner").html(" ");
    }
    if ($('#TiTr_ID').val() == 0) {
        $("#labelvalidatorTipoTransporte").html("Seleccione un tipo de transporte.");
    } else {
        $("#labelvalidatorTipoTransporte").html(" ");
    }
    if ($('#Colonia').val() != 0 && $('#Calle').val() != 0 && $('#Avenida').val() != 0 && $('#Count_ID').val() != 0
        && $('#City_ID').val() != 0 && $('#TiTr_ID').val() != 0 && $('#Part_ID').val() != 0) {

        var direStatus = false;
        var fullAddress = `Colonia. ${$('#Colonia').val()}, Calle. ${$('#Calle').val()}, Avenida. ${$('#Avenida').val()}`;
        var dire = AdressViewModel;

        dire.Dire_Descripcion = fullAddress;
        dire.Ciud_ID = parseInt($("#City_ID").val());
        var responseAddress = ajaxRequest("https://totaltravel.somee.com/API/Address/Insert", dire, "POST");
        var DireID;
        if (responseAddress.code == 200) {

            DireID = responseAddress.data.codeStatus;
            direStatus = true;
        } else {
            console.log(responseAddress)
        }

        if (direStatus) {

            var data = TransportViewModel;
            data.dire_ID = parseInt(DireID);
            data.tiTr_ID = parseInt($("#TiTr_ID").val());
            data.part_ID = parseInt($("#Part_ID").val());

            var response = ajaxRequest("https://totaltravel.somee.com/API/Transports/Update?id="+id, data, "POST");

            if (response.code == 200) {
                if (response.data.codeStatus > 0) {
                    window.location.href = '/Transport';
                } else {
                    $("#errorDiv").show();
                    $("#errorDiv p").html(response.data.messageStatus);
                }
            }
        } else {
            $("#labelvalidatorError").html("Se han enviado parámetros incorrectos en los campos de dirección.");
        }
    }
}