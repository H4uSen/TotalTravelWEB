$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createDestinationsTransportations").click(() => {
    $("#modalCreate").modal('show');
});

$("#close").click(() => {
    $("#modalCreate").modal('hide');
});

$("#send").click(() => {
    validar();
})

function validar() {
    if ($("#CiudadSalida").val() == 0) {
        $("#labelvalidatorCiudadSalida").html("Seleccione una Ciudad de Salida");
    }
    else {
        $("#labelvalidatorCiudadSalida").html(" ");
    }
    if ($("#CiudadDestino").val() == 0) {
        $("#labelvalidatorCiudadDestino").html("Seleccione una Ciudad de Destino");
    }
    else {
        $("#labelvalidatorCiudadDestino").html(" ");
    }
    if ($("#CiudadSalida").val() != 0 && $("#CiudadDestino").val() != 0) {
        $("#createDestinationsTransportationsForm").submit();
    }

}