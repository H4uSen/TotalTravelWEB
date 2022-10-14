$("#errorDiv").hide();

$('.ui.dropdown').dropdown();

$("#createDestinationsTransportations").click(() => {
    $("#modalCreate").modal('show');
});

$("#closeActivity").click(() => {
    $("#modalCreate").modal('hide');
});

$("#sendActivity").click(() => {
    validar();
})

function validar() {
    if ($("#Actividad").val() == 0) {
        $("#labelvalidatorActividad").html("Ingrese una Descripcion");
    }
    else {
        $("#labelvalidatorActividad").html(" ");
    }
    if ($("#tipoActividad").val() == 0) {
        $("#labelvalidatorTipoActividad").html("Seleccione el tipo de la Actividad");
    }
    else {
        $("#labelvalidatorTipoActividad").html(" ");
    }
    if ($("#Actividad").val() != 0 && $("#tipoActividad").val() != 0) {
        $("#createDestinationsTransportationsForm").submit();
    }

}